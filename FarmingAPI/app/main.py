from fastapi import FastAPI, HTTPException
import httpx
import math
import os
import uuid
from dotenv import load_dotenv
import models
import json
import openai # NEW: Ensure you pip install openai
from database import SessionLocal, Crops
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()
load_dotenv()
# Replace with your actual key or use an environment variable (recommended)
# os.getenv("OPENAI_API_KEY")
client = openai.OpenAI(api_key=os.getenv("OPENAI_API_KEY"))

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# --- Helper: AI Agronomist ---

async def get_ai_agronomist_advice(stats: dict, alerts: list, crop_name: str):
    """Generates deep biological insights based on greenhouse telemetry."""
    # Build a context-rich prompt for the AI
    alert_messages = ". ".join([a['message'] for a in alerts])
    
    prompt = f"""
    You are a professional Indoor Farming Agronomist. 
    Current Telemetry: Temp {stats['temperature']}°C, Humidity {stats['humidity']}%, VPD {stats['vpd']} kPa.
    Active Alerts: {alert_messages}
    Target Crop: {crop_name}
    
    In 2 short sentences:
    1. Explain the biological impact of these conditions on this crop.
    2. Recommend one specific mechanical adjustment (fan, heater, mister, or LED) to stabilize the system.
    Be technical but concise.
    """

    try:
        # Using a newer model for high-quality horticultural advice
        response = client.chat.completions.create(
            model="gpt-4o-mini", 
            messages=[
                {"role": "system", "content": "You are a CEA (Controlled Environment Agriculture) expert assistant."},
                {"role": "user", "content": prompt}
            ],
            max_tokens=150
        )
        return response.choices[0].message.content
    except Exception as e:
        print(f"AI Error: {e}")
        return "AI Advisor offline. Please consult standard operating procedures for current alerts."

# --- Logic Helpers ---

def calculate_vpd(temp: float, humidity: float) -> float:
    svp = 0.61078 * math.exp((17.27 * temp) / (temp + 237.3))
    avp = svp * (humidity / 100)
    return round(svp - avp, 2)

def generate_indoor_alerts(stats: dict, crops: list):
    alerts = []
    vpd = calculate_vpd(stats['temperature'], stats['humidity'])
    
    for crop in crops:
        if vpd < 0.5:
            alerts.append({
                "crop": crop.name, "type": "STAGNATION_RISK", "level": "WARNING", "priority": 7,
                "message": f"Low VPD ({vpd} kPa). Air is too stagnant. Risk of mold/mildew."
            })
        elif vpd > 1.5:
            alerts.append({
                "crop": crop.name, "type": "TRANSPIRATION_STRESS", "level": "CRITICAL", "priority": 9,
                "message": f"High VPD ({vpd} kPa). Air is too dry. Stomata closing."
            })

        if stats['temperature'] > crop.optHigh:
            diff = round(stats['temperature'] - crop.optHigh, 1)
            alerts.append({
                "crop": crop.name, "type": "HVAC_FAILURE", "level": "WARNING", "priority": 6,
                "message": f"Temp is {diff}°C above set-point. Cooling efficiency low."
            })

    if stats['precipitation'] > 0:
        alerts.append({
            "crop": "All Zones", "type": "LIGHT_COMPENSATION", "level": "INFO", "priority": 4,
            "message": "Low natural light detected. Increase LED Supplemental Lighting."
        })

    return sorted(alerts, key=lambda x: x['priority'], reverse=True)

def simulate_failure(scenario: str):
    scenarios = {
        "hvac_fail": {"temperature": 38.5, "humidity": 40.0, "precipitation": 0.0},
        "humidity_spike": {"temperature": 22.0, "humidity": 95.0, "precipitation": 0.0},
        "cloudy_day": {"temperature": 18.0, "humidity": 60.0, "precipitation": 2.5},
        "ideal": {"temperature": 24.0, "humidity": 55.0, "precipitation": 0.0}
    }
    return scenarios.get(scenario, scenarios["ideal"])

# --- Updated Dashboard Endpoint ---

@app.get("/farmer-dashboard")
async def get_dashboard(lat: float, lon: float, crop_id: str = None, sim: str = None):
    if sim:
        stats = simulate_failure(sim)
        location = {"lat": lat, "lon": lon, "mode": "SIMULATION"}
    else:
        weather_data = await get_weather(lat, lon) 
        stats = weather_data["stats"]
        location = weather_data["location"]
    
    vpd = calculate_vpd(stats['temperature'], stats['humidity'])
    stats_with_vpd = {**stats, "vpd": vpd}
    
    with SessionLocal() as db:
        if crop_id:
            crops = db.query(Crops).filter(Crops.id == crop_id).all()
        else:
            crops = db.query(Crops).all()
            
        active_alerts = generate_indoor_alerts(stats, crops)
    
    # AI Logic: Only trigger if we have a specific crop selected and alerts are present
    # This keeps your API costs low during development.
    ai_analysis = "All systems nominal. No bio-feedback required."
    if active_alerts:
        primary_crop = crops[0].name if crops else "General Crops"
        ai_analysis = await get_ai_agronomist_advice(stats_with_vpd, active_alerts, primary_crop)

    penalty = sum(a['priority'] for a in active_alerts)
    health_score = max(0, 100 - (penalty * 4))

    return {
        "location": location,
        "farm_health_score": f"{health_score}%",
        "current_conditions": {**stats_with_vpd, "vpd_unit": "kPa"},
        "alerts": active_alerts,
        "ai_analysis": ai_analysis, # This maps to the frontend section we built
        "system_status": "CRITICAL_FAILURE" if health_score < 60 else "OPTIMAL"
    }

# (Keep your other endpoints: get_weather, get_all_crops, etc.)

@app.get("/weather", tags=["external"])
async def get_weather(lat: float, lon: float):
    url = "https://api.open-meteo.com/v1/forecast"
    params = {
        "latitude": lat, "longitude": lon,
        "current": "temperature_2m,relative_humidity_2m,precipitation,wind_speed_10m,soil_temperature_0cm",
        "timezone": "auto"
    }
    async with httpx.AsyncClient() as client:
        try:
            response = await client.get(url, params=params)
            response.raise_for_status()
            data = response.json()
            current = data.get("current")
            return {
                "location": {"lat": lat, "lon": lon},
                "stats": {
                    "temperature": current.get("temperature_2m"),
                    "humidity": current.get("relative_humidity_2m"),
                    "precipitation": current.get("precipitation"),
                    "wind_speed": current.get("wind_speed_10m"),
                    "soil_temp": current.get("soil_temperature_0cm")
                }
            }
        except Exception as e:
            raise HTTPException(status_code=500, detail=str(e))


@app.get("/recommendations", tags=["CRS Engine"])
async def get_recommendations(lat: float, lon: float):
    # 1. Fetch live weather
    weather_response = await get_weather(lat, lon)
    current_temp = weather_response["stats"]["temperature"]
    
    with SessionLocal() as db:
        # 2. Get the absolute minimum temp any crop in your DB can handle
        # This helps us give a specific reason if nothing is found
        absolute_min = db.query(Crops.minTemp).order_by(Crops.minTemp.asc()).first()
        min_allowed = absolute_min[0] if absolute_min else 0

        # 3. Filter crops based on temperature survival
        viable_crops = db.query(Crops).filter(
            Crops.minTemp <= current_temp,
            Crops.maxTemp >= current_temp
        ).all()
        
        recommendations = []
        for crop in viable_crops:
            is_optimal = crop.optLow <= current_temp <= crop.optHigh
            
            recommendations.append({
                "id": str(crop.id),
                "crop_name": crop.name,
                "suitability": "OPTIMAL" if is_optimal else "VIABLE",
                "advice": f"Ideal range: {crop.optLow}°C - {crop.optHigh}°C",
                "humidity_target": f"{crop.idealHumidity}%"
            })
            
        result = {
            "metadata": {
                "lat": lat,
                "lon": lon,
                "current_temp": f"{current_temp}°C",
                "weather_condition": "Fetched via Open-Meteo"
            },
            "count": len(recommendations),
            "suggestions": recommendations
        }

        # 4. Smart Error Messaging
        if not recommendations:
            if current_temp < min_allowed:
                result["message"] = f"No suitable crops found. It is too cold ({current_temp}°C) for your current database of crops."
            elif current_temp > 45: # General heat threshold
                result["message"] = f"No suitable crops found. Extreme heat ({current_temp}°C) detected."
            else:
                result["message"] = "No suitable crops found for this specific climate profile."
            
        return result
    

@app.get("/crops", tags=["Data"])
def get_all_crops():
    """Returns a list of all crops for the UI toggle."""
    with SessionLocal() as db:
        crops = db.query(Crops).all()
        # We only return the ID and Name for the toggle buttons
        return [{"id": str(c.id), "name": c.name} for c in crops]

async def generate_crop_specs(crop_name: str):
    """Uses AI to research crop requirements and return them as JSON."""
    prompt = f"""
    Act as a horticultural database. Provide the environmental requirements for '{crop_name}'.
    Return ONLY a JSON object with these keys:
    "minTemp": float (absolute survival min),
    "maxTemp": float (absolute survival max),
    "optLow": float (start of healthy growth),
    "optHigh": float (end of healthy growth),
    "idealHumidity": float (target percentage)
    
    Ensure the values are scientifically accurate for indoor farming.
    """

    try:
        response = client.chat.completions.create(
            model="gpt-4o-mini",
            messages=[{"role": "user", "content": prompt}],
            response_format={ "type": "json_object" } # Forces JSON output
        )
        return json.loads(response.choices[0].message.content)
    except Exception as e:
        print(f"Generation Error: {e}")
        return None

@app.post("/add-crop-ai/{crop_name}")
async def add_crop_via_ai(crop_name: str):
    specs = await generate_crop_specs(crop_name)
    if not specs:
        raise HTTPException(status_code=500, detail="AI error")

    with SessionLocal() as db:
        new_crop = Crops(
            id=str(uuid.uuid4()), # Manually generate the UUID here
            name=crop_name.capitalize(),
            **specs # Unpacks minTemp, maxTemp, etc. from the AI JSON
        )
        db.add(new_crop)
        db.commit()
    return {"status": "success"}

@app.get("/weather-forecast")
async def get_weather_forecast(lat: float, lon: float):
    try:
        url = "https://api.open-meteo.com/v1/forecast"
        params = {
            "latitude": lat, "longitude": lon,
            "daily": "temperature_2m_max,temperature_2m_min,uv_index_max,precipitation_sum",
            "timezone": "auto",
            "forecast_days": 3
        }
        async with httpx.AsyncClient() as client:
            response = await client.get(url, params=params)
            data = response.json()
            
            # Check if 'daily' exists in the response
            if "daily" not in data:
                return [] # Return empty list so .map() doesn't crash
                
            daily = data["daily"]
            forecast = []
            for i in range(len(daily.get("time", []))):
                forecast.append({
                    "date": daily["time"][i],
                    "max_temp": daily["temperature_2m_max"][i],
                    "min_temp": daily["temperature_2m_min"][i],
                    "uv": daily["uv_index_max"][i],
                    "rain": daily["precipitation_sum"][i]
                })
            return forecast
    except Exception as e:
        print(f"Forecast Error: {e}")
        return [] # Always return a list, even on failure
    
@app.get("/crop-analysis/{crop_id}")
async def get_single_crop_status(crop_id: str, temp: float, humidity: float):
    """
    Calculates biological status for one specific crop based on 
    provided environmental metrics.
    """
    with SessionLocal() as db:
        crop = db.query(Crops).filter(Crops.id == crop_id).first()
        
        if not crop:
            raise HTTPException(status_code=404, detail="Crop not found in database")

        # 1. Calculate Health Metrics
        vpd = calculate_vpd(temp, humidity)
        
        # 2. Check "Comfort Zones"
        temp_status = "OPTIMAL" if crop.optLow <= temp <= crop.optHigh else "STRESS"
        if temp < crop.minTemp or temp > crop.maxTemp:
            temp_status = "CRITICAL"

        # 3. Generate Crop-Specific AI Insight
        # We pass only this crop to the AI for a specialized medical-style report
        stats = {"temperature": temp, "humidity": humidity, "vpd": vpd}
        
        # We simulate a single alert for the AI to react to if status isn't optimal
        mock_alerts = []
        if temp_status != "OPTIMAL":
            mock_alerts.append({"message": f"Temperature of {temp}°C is outside the {crop.name} ideal range."})

        ai_report = await get_ai_agronomist_advice(stats, mock_alerts, crop.name)

        return {
            "crop_name": crop.name,
            "biological_targets": {
                "ideal_temp": f"{crop.optLow}°C - {crop.optHigh}°C",
                "ideal_humidity": f"{crop.idealHumidity}%",
                "ideal_vpd": "0.8 - 1.2 kPa"
            },
            "current_performance": {
                "temp_status": temp_status,
                "vpd_value": vpd,
                "is_viable": crop.minTemp <= temp <= crop.maxTemp
            },
            "agronomist_report": ai_report
        }
    
@app.get("/crop-analysis/local-check/{crop_name}")
async def check_crop_at_location(crop_name: str, lat: float, lon: float):
    """
    Checks if a specific crop can survive the current real-world 
    weather at the provided coordinates.
    """
    # 1. Fetch real-time weather for the location
    weather_data = await get_weather(lat, lon)
    stats = weather_data["stats"]
    temp = stats["temperature"]
    humidity = stats["humidity"]

    with SessionLocal() as db:
        # 2. Fuzzy search for the crop
        crop = db.query(Crops).filter(Crops.name.ilike(f"%{crop_name}%")).first()
        
        if not crop:
            raise HTTPException(status_code=404, detail=f"Crop '{crop_name}' not found.")

        # 3. Run the Biological Logic
        vpd = calculate_vpd(temp, humidity)
        
        status = "OPTIMAL"
        if temp < crop.optLow or temp > crop.optHigh:
            status = "STRESS"
        if temp < crop.minTemp or temp > crop.maxTemp:
            status = "CRITICAL"

        # 4. Get AI Insight based on REAL weather
        ai_context = {**stats, "vpd": vpd}
        mock_alerts = [{"message": f"Real-world check: {temp}°C at lat {lat}."}]
        ai_report = await get_ai_agronomist_advice(ai_context, mock_alerts, crop.name)

        return {
            "location": {"lat": lat, "lon": lon},
            "weather_at_site": stats,
            "crop_match": crop.name,
            "analysis": {
                "status": status,
                "vpd": f"{vpd} kPa",
                "ai_insight": ai_report
            }
        }