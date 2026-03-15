import uuid
from sqlalchemy import Column, String, Float
from database import Base # Assuming Base is defined in your database.py

class Crops(Base):
    __tablename__ = "crops"
    __table_args__ = {'extend_existing': True}

    # Auto-generates a UUID string if one isn't provided
    id = Column(String, primary_key=True, default=lambda: str(uuid.uuid4()))
    name = Column(String, nullable=False)
    minTemp = Column(Float)
    maxTemp = Column(Float)
    optLow = Column(Float)
    optHigh = Column(Float)
    idealHumidity = Column(Float)