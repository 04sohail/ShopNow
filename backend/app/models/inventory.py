from sqlalchemy import Integer, Numeric, Column, String, DateTime, Boolean
from sqlalchemy.orm import relationship
from ..database.connection import Base


class Inventory(Base):
    __tablename__ = 'inventory'

    id = Column(Integer, primary_key=True)
    name = Column(String, nullable=False)
    info = Column(String, nullable=False)
    price = Column(Integer, nullable=False)
    discount_percent = Column(Numeric, nullable=True)
    quantity = Column(Integer, nullable=False)
    cost_price = Column(Integer, nullable=False)
    selling_price = Column(Integer, nullable=False)
    created_at = Column(DateTime, nullable=False)
    updated_at = Column(DateTime, nullable=False)
    status = Column(Boolean, nullable=False, default=True)

    images = relationship('Image', back_populates='inventory')
