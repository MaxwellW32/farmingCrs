from database import SessionLocal, Crops

def seed_crops():
    # Note: Using camelCase keys to match your DB columns exactly
    crops_to_add = [{"name": "Yam", "minTemp": 18, "maxTemp": 35, "optLow": 25, "optHigh": 30, "idealHumidity": 80},
    {"name": "Cassava", "minTemp": 16, "maxTemp": 40, "optLow": 25, "optHigh": 29, "idealHumidity": 65},
    {"name": "Watermelon", "minTemp": 18, "maxTemp": 38, "optLow": 25, "optHigh": 33, "idealHumidity": 60},
    {"name": "Radish", "minTemp": 4, "maxTemp": 27, "optLow": 15, "optHigh": 21, "idealHumidity": 70},
    {"name": "Cauliflower", "minTemp": 7, "maxTemp": 25, "optLow": 15, "optHigh": 20, "idealHumidity": 75},
    {"name": "Pumpkin", "minTemp": 15, "maxTemp": 32, "optLow": 23, "optHigh": 29, "idealHumidity": 70},
    {"name": "Ginger", "minTemp": 18, "maxTemp": 35, "optLow": 25, "optHigh": 28, "idealHumidity": 85},
    {"name": "Garlic", "minTemp": 5, "maxTemp": 30, "optLow": 13, "optHigh": 24, "idealHumidity": 60},
    {"name": "Kale", "minTemp": -5, "maxTemp": 25, "optLow": 15, "optHigh": 20, "idealHumidity": 75},
    {"name": "Potato", "minTemp": 7, "maxTemp": 30, "optLow": 18, "optHigh": 22, "idealHumidity": 75},
    {"name": "Spinach", "minTemp": 2, "maxTemp": 24, "optLow": 15, "optHigh": 18, "idealHumidity": 80},
    {"name": "Eggplant", "minTemp": 18, "maxTemp": 35, "optLow": 24, "optHigh": 29, "idealHumidity": 65},
    {"name": "Cucumber", "minTemp": 15, "maxTemp": 35, "optLow": 22, "optHigh": 28, "idealHumidity": 85},
    {"name": "Broccoli", "minTemp": 4, "maxTemp": 26, "optLow": 16, "optHigh": 20, "idealHumidity": 70},
    {"name": "Strawberry", "minTemp": 10, "maxTemp": 28, "optLow": 18, "optHigh": 24, "idealHumidity": 65},
    {"name": "Okra", "minTemp": 20, "maxTemp": 40, "optLow": 27, "optHigh": 32, "idealHumidity": 60},
    {"name": "Cabbage", "minTemp": 4, "maxTemp": 25, "optLow": 15, "optHigh": 20, "idealHumidity": 75},
    {"name": "Soybean", "minTemp": 10, "maxTemp": 38, "optLow": 25, "optHigh": 32, "idealHumidity": 60},
    {"name": "Peas", "minTemp": 5, "maxTemp": 25, "optLow": 13, "optHigh": 18, "idealHumidity": 75},
    {"name": "Tomato", "minTemp": 10, "maxTemp": 35, "optLow": 21, "optHigh": 24, "idealHumidity": 65},
    {"name": "Maize", "minTemp": 10, "maxTemp": 35, "optLow": 25, "optHigh": 30, "idealHumidity": 60},
    {"name": "Lettuce", "minTemp": 7, "maxTemp": 24, "optLow": 15, "optHigh": 18, "idealHumidity": 75},
    {"name": "Bell Pepper", "minTemp": 15, "maxTemp": 32, "optLow": 20, "optHigh": 25, "idealHumidity": 70},
    {"name": "Carrot", "minTemp": 5, "maxTemp": 28, "optLow": 16, "optHigh": 21, "idealHumidity": 70}]

    with SessionLocal() as db:
        for crop_data in crops_to_add:
            # Check if it already exists by name so we don't double-seed
            exists = db.query(Crops).filter(Crops.name == crop_data["name"]).first()
            if not exists:
                new_crop = Crops(**crop_data)
                db.add(new_crop)
        
        db.commit()
        print("✅ Success! Database populated with farming facts.")

seed_crops()