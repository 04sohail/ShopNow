from sqlalchemy import Column, BigInteger, Integer, String, TIMESTAMP, Boolean, ForeignKey
from sqlalchemy.orm import relationship
from ..database.connection import Base

class Image(Base):
    __tablename__ = 'images'

    id = Column(BigInteger, primary_key=True)
    products_id = Column(Integer, ForeignKey('inventory.id'), nullable=False)
    image_path = Column(String, nullable=False)
    alt_text = Column(String)
    created_at = Column(TIMESTAMP, nullable=False)
    updated_at = Column(TIMESTAMP, nullable=False)
    status = Column(Boolean, default=True)

    inventory = relationship('Inventory', back_populates='images')
