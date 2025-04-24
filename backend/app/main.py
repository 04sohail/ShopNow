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

load_dotenv()

OAuth2Scheme = OAuth2PasswordBearer(tokenUrl="token")

app = FastAPI()

origins = ["http://localhost:5173"]


PUBLIC_ROUTES = ["/users/login/", "/users/register", "/users/verify-otp", "/users/get-user-by-email", "/users/forgot-password", "/users/reset-password", "/users/products/all", "/docs"]

class TokenValidationMiddleware(BaseHTTPMiddleware):
    async def dispatch(self, request: Request, call_next):
        # Check if the requested route is public
        if request.url.path in PUBLIC_ROUTES:
            return await call_next(request)

        # Retrieve token from cookies
        token = request.cookies.get("access_token")
        if not token:
            return JSONResponse({"detail": "Missing token"}, status_code=401)

        # Validate the token
        try:
            payload = jwt.decode(token, os.getenv("SECRET_KEY"), algorithms=[os.getenv("JWT_ALGORITHM")])
            request.state.user = payload  # Attach user payload to request.state
            response = await call_next(request)
            return response
        except ExpiredSignatureError:
            return JSONResponse({"detail": "Token has expired"}, status_code=401)
        except JWTError:
            return JSONResponse({"detail": "Invalid token"}, status_code=401)

# Add middleware to the FastAPI app
app.add_middleware(TokenValidationMiddleware)

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

OAuth2Scheme = OAuth2PasswordBearer(tokenUrl="token")

from typing import Annotated
@app.get("/")
def read_root(token:Annotated[str, Depends(OAuth2Scheme)]):
    return {"token": token}



@app.post("/token")
async def login(form_data: OAuth2PasswordRequestForm = Depends()):
    # Authenticate user (you can replace this with your authentication logic)
    if form_data.username != "testuser" or form_data.password != "testpassword":
        raise HTTPException(status_code=400, detail="Incorrect username or password")
    
    # Generate the token
    access_token = generate_token(
        data={"sub": form_data.username}
    )
    return {"access_token": access_token, "token_type": "bearer"}