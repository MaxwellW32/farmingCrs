from fastapi import FastAPI, HTTPException
from sqlalchemy import text
import httpx
from database import SessionLocal, Crops
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

# --- Middleware ---
origins = [
    "http://localhost",
    "http://localhost:3000",
    "http://localhost:5173",
    "http://127.0.0.1:3000",
    "http://127.0.0.1:5173",
    "https://squaremaxtech.com",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# --- Logic & Helper Functions ---

def generate_farming_alerts(stats: dict, crops: list):
    alerts = []
    
    for crop in crops:
        # --- 1. Temperature Stress & Priority Scoring ---
        # Calculate how far current temp is from the "Sweet Spot"
        temp_diff = 0
        if stats['temperature'] > crop.optHigh:
            temp_diff = stats['temperature'] - crop.optHigh
        elif stats['temperature'] < crop.optLow:
            temp_diff = crop.optLow - stats['temperature']

        # Determine Priority based on deviation
        if temp_diff > 10:
            priority = 10  # Critical
            level = "CRITICAL"
        elif temp_diff > 5:
            priority = 7   # High
            level = "WARNING"
        else:
            priority = 3   # Low
            level = "INFO"

        if temp_diff > 0:
            alerts.append({
                "crop": crop.name,
                "type": "THERMAL_STRESS",
                "level": level,
                "priority": priority,
                "message": f"{crop.name} is experiencing thermal stress. Temp is {temp_diff}°C away from optimal."
            })

    # --- 2. Operational Alerts (General) ---
    if stats['wind_speed'] > 15:
        alerts.append({
            "crop": "All",
            "type": "OPERATIONAL_DANGER",
            "level": "CRITICAL",
            "priority": 9,
            "message": "High wind speeds: Spraying pesticide/fertilizer is dangerous due to drift."
        })

    # --- 3. Disease Risk (Dynamic) ---
    if stats['humidity'] > 85:
        alerts.append({
            "crop": "Fungal-Sensitive",
            "type": "DISEASE_RISK",
            "level": "HIGH",
            "priority": 8,
            "message": "Extreme humidity detected. High risk for blight and powdery mildew."
        })

    # Sort alerts so the most important (Priority 10) are at the top
    return sorted(alerts, key=lambda x: x['priority'], reverse=True)



def analyze_crop_suitability(db, current_temp, current_humidity):
    """Uses DB data to check if conditions are right for specific crops."""
    report = {}
    crops = db.query(Crops).all()
    
    for crop in crops:
        # Check temperature survival range
        temp_viable = crop.minTemp <= current_temp <= crop.maxTemp
        # Check optimal 'Sweet Spot'
        temp_optimal = crop.optLow <= current_temp <= crop.optHigh
        
        # Humidity Logic: Using a 15% buffer around your 'idealHumidity' column
        hum_min = crop.idealHumidity - 15
        hum_max = crop.idealHumidity + 15
        hum_optimal = hum_min <= current_humidity <= hum_max

        if not temp_viable:
            status = "CRITICAL: Temperature outside survival range."
        elif temp_optimal and hum_optimal:
            status = "OPTIMAL: Perfect temperature and humidity."
        elif temp_optimal and not hum_optimal:
            status = "STRESSED: Temperature is good, but humidity is off-target."
        else:
            status = "VIABLE: Conditions are acceptable but not ideal."
            
        report[crop.name] = status
        
    return report

def check_disease_risk(temp, humidity):
    risk_level = "Low"
    potential_disease = "None"
    if humidity > 90 and 15 < temp < 25:
        risk_level = "High"
        potential_disease = "Late Blight / Fungal Outbreak"
    elif humidity > 80 and temp > 28:
        risk_level = "Medium"
        potential_disease = "Root Rot / Bacterial Wilt"
    return {"risk": risk_level, "target": potential_disease}

# --- Endpoints ---

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

@app.get("/crs-analysis", tags=["CRS Engine"])
async def get_crs_analysis(lat: float, lon: float):
    weather = await get_weather(lat, lon)
    stats = weather["stats"]
    
    with SessionLocal() as db:
        # 1. Perform the core analysis
        suitability = analyze_crop_suitability(db, stats['temperature'], stats['humidity'])
        disease_risk = check_disease_risk(stats['temperature'], stats['humidity'])
        
        # 2. Get DB bounds to check for extreme conditions
        # We check the absolute minimum temperature any crop in your DB can survive
        min_crop_temp = db.query(Crops.minTemp).order_by(Crops.minTemp.asc()).first()
        min_threshold = min_crop_temp[0] if min_crop_temp else 0

    # 3. Determine Smart Advice
    if stats['temperature'] < min_threshold:
        advice = f"Extreme Cold Alert: Temp is {stats['temperature']}°C. Unsuitable for all registered crops."
    elif stats['temperature'] > 45:
        advice = "Extreme Heat Alert: High risk of crop failure due to thermal stress."
    elif stats['precipitation'] == 0:
        advice = "No rain detected; irrigation recommended based on soil requirements."
    else:
        advice = "Rainfall detected; suspend manual irrigation to prevent waterlogging."

    return {
        "current_weather": stats,
        "crop_suitability": suitability,
        "disease_outlook": disease_risk,
        "advice": advice
    }

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
    
@app.get("/can-i-spray")
async def check_spraying_safety(lat: float, lon: float):
    weather = await get_weather(lat, lon)
    alerts = generate_farming_alerts(weather["stats"])
    
    # Filter only for operational alerts
    spray_alerts = [a for a in alerts if a["type"] == "OPERATIONAL_DANGER"]
    
    if spray_alerts:
        return {"can_spray": False, "reason": spray_alerts[0]["message"]}
    return {"can_spray": True, "message": "Conditions are ideal for spraying."}

@app.get("/farmer-dashboard", tags=["Logic"])
async def get_dashboard(lat: float, lon: float):
    weather_data = await get_weather(lat, lon)
    stats = weather_data["stats"]
    
    with SessionLocal() as db:
        # Fetch all crops to check their sensitivities
        all_crops = db.query(Crops).all()
        
        # Generate the dynamic alerts
        active_alerts = generate_farming_alerts(stats, all_crops)
    
    # Calculate a "Farm Health Score" (100 - total priority of top 3 alerts)
    # This is a great metric for a portfolio UI!
    total_stress = sum(a['priority'] for a in active_alerts[:3])
    health_score = max(0, 100 - (total_stress * 3))

    return {
        "location": weather_data["location"],
        "farm_health_score": f"{health_score}%",
        "current_conditions": stats,
        "alerts": active_alerts,
        "alert_count": len(active_alerts)
    }