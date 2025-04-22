from sqlalchemy import Column, Integer, String, Text, Numeric, ARRAY, TIMESTAMP
from sqlalchemy.sql import func
from ..database.connection import Base
class Product(Base):
    __tablename__ = "products"

    id = Column(Integer, primary_key=True, index=True)
    title = Column(String(255), nullable=False)
    description = Column(Text, nullable=False)
    category = Column(String(255), nullable=False)
    price = Column(Numeric, nullable=False)
    images = Column(ARRAY(Text), nullable=False)
    thumbnail = Column(String(255), nullable=False)
    discountpercentage = Column(Numeric)
    rating = Column(Numeric)
    stock = Column(Integer, default=0)
    brand = Column(String(255))
    sku = Column(String(255))
    warrantyinformation = Column(Text)
    shippinginformation = Column(Text)
    availabilitystatus = Column(String(255))
    returnpolicy = Column(Text)
    created_at = Column(TIMESTAMP, server_default=func.now())
    updated_at = Column(TIMESTAMP, server_default=func.now(), onupdate=func.now())
    status = Column(String(255), nullable=False, server_default='1')

    def info(self):
        return {
            "id": self.id,
            "title": self.title,
            "description": self.description,
            "category": self.category,
            "price": str(self.price), 
            "images": self.images,
            "thumbnail": self.thumbnail,
            "discountpercentage": str(self.discountpercentage) if self.discountpercentage else None,
            "rating": str(self.rating) if self.rating else None,
            "stock": self.stock,
            "brand": self.brand,
            "sku": self.sku,
            "warrantyinformation": self.warrantyinformation,
            "shippinginformation": self.shippinginformation,
            "availabilitystatus": self.availabilitystatus,
            "returnpolicy": self.returnpolicy,
            "created_at": self.created_at.isoformat() if self.created_at else None,
            "updated_at": self.updated_at.isoformat() if self.updated_at else None,
            "status": self.status,
        }