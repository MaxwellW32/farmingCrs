from pydantic import BaseModel


class CropBase(BaseModel):
    name: str
    type: str | None = None
    quantity: int | None = None


class CropCreate(CropBase):
    pass


class CropRead(CropBase):
    id: int

    class Config:
        orm_mode = True
