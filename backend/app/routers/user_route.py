from fastapi import APIRouter, HTTPException, status, Depends
from passlib.context import CryptContext
from ..schemas import User_Registration, SuccessResponse, User_login, MessageResponse
from ..models import user
from sqlalchemy.orm import Session
from ..database.connection import get_db

router = APIRouter(prefix="/users", )

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

# REGISTERING USER
@router.post("/register/", description="This is used to create new user or user registration", response_model=SuccessResponse, status_code=status.HTTP_201_CREATED)
def create_user(form_data: User_Registration, db: Session = Depends(get_db)):
    """Create a new user."""
    # Hashing the password
    print(form_data)
    hashed_password = pwd_context.hash(form_data.password)
    print("########################################",hashed_password)
    try:
        # Check if the user already exists by email
        existing_user = db.query(user.User).filter(user.User.email_address == form_data.email_address).first()
        if existing_user:
            raise HTTPException(status_code=status.HTTP_409_CONFLICT, detail="User already exists")

        # Create a new user in the database
        new_user = user.User(
            first_name=form_data.first_name,
            last_name=form_data.last_name,
            mobile_number=form_data.mobile_number,
            email_address=form_data.email_address,
            password=hashed_password, 
        ) 

        # Add the user to the session and commit
        db.add(new_user)
        db.commit()
        db.refresh(new_user)

        # Return a success response with user info
        return SuccessResponse(
            message="Registration Success",
            data=new_user.info()
        )

    except Exception as e:
        print(e)
        raise HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, detail=f"{e}")


# LOGIN USER
@router.post("/login/", description="login", summary="login")
def login_user(user_data: User_login, db: Session = Depends(get_db)):
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
            "email_address": data.email_address
        }
        return SuccessResponse(message="Logged In Successfully", data=data_dict)
    
    except HTTPException as http_exc:
        # Log the error and re-raise the HTTP exception
        print(f"HTTPException: {http_exc.detail}")
        raise http_exc
    
    except Exception as e:
        # Catch all other exceptions
        print("Unexpected error:", e)
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="An unexpected error occurred. Please try again later."
        )
