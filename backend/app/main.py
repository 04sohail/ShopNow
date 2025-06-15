from fastapi import FastAPI, Depends, HTTPException
from .database.connection import get_psycopg2_connection
from app.routers import user_route, admin_route
from .database.connection import engine, get_db
from fastapi.middleware.cors import CORSMiddleware
from fastapi.security import OAuth2PasswordBearer, OAuth2PasswordRequestForm
from .services.token_service import generate_token
from starlette.middleware.base import BaseHTTPMiddleware
from starlette.requests import Request
from starlette.responses import JSONResponse
from jose import jwt, JWTError, ExpiredSignatureError
import os
from dotenv import load_dotenv


# LOADING ENVIRONMENT VARIABLES
load_dotenv()

OAuth2Scheme = OAuth2PasswordBearer(tokenUrl="token")

# APP CONFIGURATION
app = FastAPI()
origins = ["http://localhost:5173"]

# MIDDLEWARES
# app.add_middleware(TokenValidationMiddleware)
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)




SECRET_KEY = os.getenv("SECRET_KEY")
JWT_ALGORITHM = os.getenv("JWT_ALGORITHM")


# Connecting To Database
get_psycopg2_connection()

# ROUTES
app.include_router(user_route.router, tags=["User"])
app.include_router(admin_route.router, tags=["Admin"])

from typing import Annotated
@app.get("/")
def read_root(token:Annotated[str, Depends(OAuth2Scheme)]):
    return {"token": token}


@app.post("/token")
async def login(form_data: OAuth2PasswordRequestForm = Depends()):
    # Authenticate user (you can replace this with your authentication logic)
    print(form_data.username, form_data.password)
    if form_data.username != "USERNAME" or form_data.password != "PASSWORD":
        raise HTTPException(status_code=400, detail="Incorrect username or password")
    
    # Generate the token
    access_token = generate_token(
        data={"sub": form_data.username}
    )
    return {"access_token": access_token, "token_type": "bearer"}