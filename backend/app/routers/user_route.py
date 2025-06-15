from fastapi import APIRouter, HTTPException, status, Depends, Response
import requests
from passlib.context import CryptContext
from ..schemas import User_Registration, SuccessResponse, User_login, OtpSchema, GetUserByEmailAddress, ResetPassword
from ..models import user
from ..models.product import Product
from sqlalchemy import desc
from sqlalchemy.orm import Session
from ..database.connection import get_db
from ..services.otp_service import generate_otp
from ..services.email_service import send_otp_email
from datetime import datetime, timezone, timedelta
from ..config.environment_variables import SMTP_SERVER, SMTP_PORT_TLS, SMTP_PORT_SSL, EMAIL, PASSWORD
from ..services.token_service import generate_token, verify_token
import os


router = APIRouter(prefix="/users")

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

# REGISTERING USER
@router.post("/register/", description="This is used to create new user or user registration", response_model=SuccessResponse, status_code=status.HTTP_201_CREATED)
async def create_user(form_data: User_Registration, db: Session = Depends(get_db)):
    """Create a new user."""
    # Hashing the password
    try:
        hashed_password = pwd_context.hash(form_data.password)

        # Check if the user already exists by email
        existing_user = db.query(user.User).filter(
            user.User.email_address == form_data.email_address).first()
        if existing_user:
            raise HTTPException(
                status_code=status.HTTP_409_CONFLICT, 
                detail="User already exists. Please use a different email address."
            )

        # Create a new user in the database
        new_user = user.User(
            first_name=form_data.first_name.strip(),
            last_name=form_data.last_name.strip(),
            mobile_number=form_data.mobile_number.strip(),
            email_address=form_data.email_address.strip(),
            password=hashed_password,
        )
        generated_otp, otp_expires_at = generate_otp()
        new_user.otp = generated_otp
        new_user.otp_expires_at = otp_expires_at
        # Send OTP to email
        print("Sending OTP to email...", form_data.email_address, generated_otp)
        send_otp_email(form_data.email_address, generated_otp)        
        
        # Add the user to the session and commit
        db.add(new_user)
        db.commit()
        db.refresh(new_user)

        # Return a success response with user info
        return SuccessResponse(message="OTP Sent Successfully To {}".format(form_data.email_address))

    except HTTPException as http_exc:
        # Reraise HTTP exceptions directly
        raise http_exc
    
    except Exception as e:
        # Log unexpected exceptions and raise a generic HTTP 500 error
        print(f"Unexpected error during registration: {e}")
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, 
            detail="An unexpected error occurred during registration. Please try again later."
        )



# LOGIN USER
@router.post("/login/", description="login", summary="login")
async def login_user(user_data: User_login, response:Response, db: Session = Depends(get_db), ):
    """
    Log in a user.
    """
    email = user_data.email_address
    password = user_data.password

    try:
        # Query the database for the user
        base_query = db.query(user.User).filter(user.User.email_address == email)
        data = base_query.first()

        # Check if the user exists
        if not data:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND, 
                detail="Invalid email address."
            )
            
        # Verify password
        if not pwd_context.verify(password, data.password):
            raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED, 
                detail="Invalid password."
            )
        
        # Prepare the response data
        data_dict = {
            "first_name": data.first_name,
            "last_name": data.last_name,
            "email_address": data.email_address,
            "user_type": data.user_type,
        }

        # Generating JWT Token
        token = generate_token(data={"email":data_dict["email_address"]})
        
        # Setting JWT Token To Cookie
        response.set_cookie(
        key="access_token",
        value=token,
        httponly=True,  
        secure=False,
        samesite="Lax",  
        max_age=2 * 60 * 60 
        )
        return SuccessResponse(message="Logged In Successfully", data=data_dict)
    
    except HTTPException as http_exc:
        print(f"HTTPException: {http_exc.detail}")
        raise http_exc
    except Exception as e:
        print("Unexpected error:", e)
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="An unexpected error occurred. Please try again later."
        )

# USER PROFILE
@router.post("/profile/", description="Get user profile", summary="Get user profile")
async def get_user_profile(db: Session = Depends(get_db)):
    """
    Get the profile of the logged-in user.
    """
    try:
        session = requests.session()
        response = session.get("http://localhost:8000/users/login/")
        print("RESPONSE => ", response)
        return response
        # token = request.cookies.get("access_token")
        # print("TOKEN => ",token)
    #     if not token:
    #         raise HTTPException(
    #             status_code=status.HTTP_401_UNAUTHORIZED,
    #             detail="Access token is missing or invalid."
    #         )
    #     email = token.get("email")
    #     print(token)
    #     base_query = db.query(user.User).filter(user.User.email_address == email)
    #     data = base_query.first()

    #     if not data:
    #         raise HTTPException(
    #             status_code=status.HTTP_404_NOT_FOUND, 
    #             detail="User not found."
    #         )

    #     data_dict = {
    #         "first_name": data.first_name,
    #         "last_name": data.last_name,
    #         "email_address": data.email_address,
    #         "user_type": data.user_type,
    #     }
        
    #     return SuccessResponse(message="User Profile Fetched Successfully", data=data_dict)

    except HTTPException as http_exc:
        print(f"HTTPException: {http_exc.detail}")
        raise http_exc
    except Exception as e:
        print("Unexpected error:", e)
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="An unexpected error occurred. Please try again later."
        )


@router.post("/verify-otp/", description="Verify OTP", summary="Verify OTP")
def verify_otp(otp_data: OtpSchema, db: Session = Depends(get_db)):
    """
    Verify OTP sent to the user's email.
    """
    print(otp_data)
    email = otp_data.email_address
    otp_input = otp_data.otp
    query = db.query(user.User).filter(user.User.email_address == email)
    data = query.first()
    if not data:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="User not found")
    print(data.otp, otp_input)
    if data.otp != otp_input:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Invalid OTP")
    if data.otp_expires_at < datetime.now():
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="OTP expired")
    data.otp = None
    data.otp_expires_at = None
    db.commit()
    db.refresh(data)
    # Prepare the response data
    data_dict = {
        "first_name": data.first_name,
        "last_name": data.last_name,
        "email_address": data.email_address,
        "user_type": data.user_type,
    }
    return SuccessResponse(message="OTP Verified Successfully", data=data_dict)        


# GETTING USER BY EMAIL 
@router.post("/get-user-by-email", description="Get user by email address", summary="Get user by email address")
async def get_user_by_email (form_data:GetUserByEmailAddress, db:Session=Depends(get_db)):
    """
    Function To Get User By Email
    """
    try:
        data = db.query(user.User).filter(user.User.email_address == form_data.email_address).first()
        if not data:
            raise HTTPException(status_code=status.HTTP_200_OK, detail="User not Found")
        generated_otp, otp_expires_at = generate_otp()
        data.otp = generated_otp
        data.otp_expires_at = otp_expires_at
        # Send OTP to email
        print("Sending OTP to email...", form_data.email_address, generated_otp)
        send_otp_email(form_data.email_address, generated_otp)  
        db.commit()
        db.refresh(data)
        print(data.otp, "OTP SENT SUCCESSFULLY")
        return SuccessResponse(message="User Found", data=data.info())
    except Exception as e:
        print(e)
        raise HTTPException(status_code=status.HTTP_422_UNPROCESSABLE_ENTITY, detail=f"{str(e).split(":")[1].strip()}")

# FORGOT PASSWORD
@router.post('/forgot-password', description="forgot Password", summary="forgot Password")
async def forgot_password(form_data: GetUserByEmailAddress, db: Session = Depends(get_db)):
    """
    Function To Reset Password
    """
    try:
        data = db.query(user.User).filter(user.User.email_address == form_data.email_address).first()
        if not data:
            raise HTTPException(status_code=status.HTTP_200_OK, detail="User not Found")
        generated_otp, otp_expires_at = generate_otp()
        data.otp = generated_otp
        data.otp_expires_at = otp_expires_at
        # Send OTP to email
        print("Sending OTP to email...", form_data.email_address, generated_otp)
        send_otp_email(form_data.email_address, generated_otp)  
        db.commit()
        db.refresh(data)
        print(data.otp, "OTP SENT SUCCESSFULLY")
        return SuccessResponse(message="User Found", data=data.info())
    except Exception as e:
        print(e)
        raise HTTPException(status_code=status.HTTP_422_UNPROCESSABLE_ENTITY, detail=f"{str(e).split(':')[1].strip()}")
    
# RESET PASSWORD
@router.post('/reset-password', description="Reset Password", summary="Reset Password")
async def reset_password(reset_form_data: ResetPassword, db: Session = Depends(get_db)):
    """
    Function To Reset Password
    """
    try:
        data = db.query(user.User).filter(user.User.email_address == reset_form_data.email_address).first()
        if not data:
            raise HTTPException(status_code=status.HTTP_200_OK, detail="User not Found")
        hashed_password = pwd_context.hash(reset_form_data.new_password)
        data.password = hashed_password
        data.updated_at = datetime.now() 
        db.commit()
        db.refresh(data)
        return SuccessResponse(message="Password Reset Successfully", data=data.info())
    except Exception as e:
        print(e)
        raise HTTPException(status_code=status.HTTP_422_UNPROCESSABLE_ENTITY, detail=f"{str(e).split(':')[1].strip()}")

# GETTING ALL PRODUCTS
@router.get("/products/all", response_model=SuccessResponse, status_code=status.HTTP_200_OK)
def read_products(db: Session = Depends(get_db)):
    try:
        products = db.query(Product).order_by(desc(Product.id)).all()
        return SuccessResponse(
            message="Products fetched successfully",
            data=[product.info() for product in products]
        )
    except Exception as e:
        print(e)
        raise HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, detail=f"{e}")
