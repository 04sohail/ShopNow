from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker
from app.config import db_url
import psycopg2
from psycopg2.extras import RealDictCursor
import time

engine = create_engine(db_url)

SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

Base = declarative_base()

from app.models.user import User
from app.models.admin import Admin
from app.models.inventory import Inventory
from app.models.images import Image


def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

def get_psycopg2_connection():
    while 1:
        try:
            conn = psycopg2.connect(
                host="localhost",
                database="e-commerce-mini",
                user="postgres",
                password="root",
                cursor_factory=RealDictCursor
            )
            print("Connected to the database")
            break
        except Exception as e:
            time.sleep(1)
            print("Error connecting to the database:", e)
