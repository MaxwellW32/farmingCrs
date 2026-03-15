import os
from dotenv import load_dotenv
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from sqlalchemy.ext.automap import automap_base

# Load variables from .env file
load_dotenv()

# Get the URL from .env. 
# Keep the second part as a fallback ONLY if you are running locally.
DATABASE_URL = os.getenv("DATABASE_URL")

if not DATABASE_URL:
    raise ValueError("DATABASE_URL not found in environment variables. Check your .env file.")

# 1. Create Engine
engine = create_engine(DATABASE_URL, future=True)

# 2. Reflect the Database automatically
Base = automap_base()

try:
    Base.prepare(autoload_with=engine)
    
    # Check if the tables exist before assigning them
    if "users" in Base.classes:
        Users = Base.classes.users
    else:
        print("⚠️ Warning: 'users' table not found during reflection.")
        
    if "crops" in Base.classes:
        Crops = Base.classes.crops
    else:
        print("⚠️ Warning: 'crops' table not found during reflection.")

except Exception as e:
    print(f"❌ Database Reflection Error: {e}")

# 3. Create Session
SessionLocal = sessionmaker(bind=engine, autoflush=False, autocommit=False)