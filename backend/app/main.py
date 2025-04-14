from fastapi import FastAPI
from .database.connection import get_psycopg2_connection
from app.routers import user_route, admin_route
from .database.connection import engine, get_db
from fastapi.middleware.cors import CORSMiddleware


app = FastAPI()

origins = ["http://localhost:5173"]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


# Connecting To Database
get_psycopg2_connection()

# User Route
app.include_router(user_route.router, tags=["User"])
app.include_router(admin_route.router, tags=["Admin"])
