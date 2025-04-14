from sqlalchemy import Column, String
from ..database.connection import Base

class Admin(Base):
    __tablename__ = 'admin'

    email=Column(String, primary_key=True, nullable=False)
    password= Column(String, nullable=False)
