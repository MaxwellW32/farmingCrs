import os
from dotenv import load_dotenv
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from sqlalchemy.ext.automap import automap_base

load_dotenv()

DATABASE_URL = os.getenv(
    "DATABASE_URL",
    "postgresql://postgres:Squaremaxtech%4012345@145.223.74.94:5432/farmingCRS",
)

# 1. Create Engine
engine = create_engine(DATABASE_URL, future=True)

# 2. Reflect the Database automatically
Base = automap_base()
Base.prepare(autoload_with=engine)
Users = Base.classes.users
SessionLocal = sessionmaker(bind=engine, autoflush=False, autocommit=False)
#Crops = Base.classes.crops
# 3. Expose the tables as classes
# This is the "magic" part. If your friend has a table named 'crops', 
# it's now accessible as Base.classes.crops
try:
    all_tables = Base.classes.keys()
    print(f"Successfully reflected tables: {all_tables}")
except Exception as e:
    print(f"Error reflecting tables: {e}")


    