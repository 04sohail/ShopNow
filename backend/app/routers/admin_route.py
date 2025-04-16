from fastapi import APIRouter, HTTPException, status, Depends
from ..schemas import SuccessResponse
from ..models import user, inventory
from sqlalchemy.orm import Session
from ..database.connection import get_db
from ..schemas import Admin_User_Registration, Admin_edit_user
from passlib.context import CryptContext

router = APIRouter(prefix="/admin", )

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

# GETTING ALL USERS COUNT
@router.get("/users/count", description="This is used to get all users", response_model=SuccessResponse, status_code=status.HTTP_200_OK)
def get_all_users(db: Session = Depends(get_db)):
    """
    This is used to get all users.  
    """
    try:
        # Fetch all users from the database
        users = db.query(user.User).all()
        if not users:
            raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="No users found")

        # Return a success response with user info
        return SuccessResponse(
            message="Users fetched successfully",
            data={
                "user_count" : len(users)}
        )

    except Exception as e:
        print(e)
        raise HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, detail=f"{e}")

# GETTING ALL PRODUCTS COUNT
@router.get("/products/count", description="This is used to get all products", response_model=SuccessResponse, status_code=status.HTTP_200_OK)
def get_all_products(db: Session = Depends(get_db)):
    """
    This is used to get all products.  
    """
    try:
        # Fetch all products from the database
        products = db.query(inventory.Inventory).all()
        if not products:
            raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="No products found")

        # Return a success response with product info
        return SuccessResponse(
            message="Products fetched successfully",
            data={
                "product_count" : len(products)}
        )

    except Exception as e:
        print(e)
        raise HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, detail=f"{e}")
    
# GETTING ALL ACTIVE USERS COUNT
@router.get("/active-users", description="This is used to get all active users", response_model=SuccessResponse, status_code=status.HTTP_200_OK)
def get_active_users(db: Session = Depends(get_db)):
    """
    This is used to get all active users.  
    """
    try:
        # Fetch all active users from the database
        active_users = db.query(user.User).filter(user.User.status == '1').all()
        if not active_users:
            raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="No active users found")

        # Return a success response with user info
        return SuccessResponse(
            message="Active users fetched successfully",
            data={
                "active_user_count" : len(active_users)}
        )

    except Exception as e:
        print(e)
        raise HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, detail=f"{e}")

# GETTING ALL INACTIVE USERS COUNT
@router.get("/inactive-users", description="This is used to get all active users", response_model=SuccessResponse, status_code=status.HTTP_200_OK)
def get_active_users(db: Session = Depends(get_db)):
    """
    This is used to get all active users.  
    """
    try:
        # Fetch all active users from the database
        inactive_users = db.query(user.User).filter(user.User.status == '0').all()
        if not inactive_users:
            raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="No active users found")

        # Return a success response with user info
        return SuccessResponse(
            message="Active users fetched successfully",
            data={
                "in_active_user_count" : len(inactive_users)}
        )

    except Exception as e:
        print(e)
        raise HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, detail=f"{e}")

# GETTING ALL ACTIVE PRODUCTS COUNT
@router.get("/active-products/", description="This is used to get all active products", response_model=SuccessResponse, status_code=status.HTTP_200_OK)
def get_active_products(db: Session = Depends(get_db)):
    """
    This is used to get all active products.  
    """
    try:
        # Fetch all active products from the database
        active_products = db.query(inventory.Inventory).filter(inventory.Inventory.status == '1').all()
        if not active_products:
            raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="No active products found")

        # Return a success response with user info
        return SuccessResponse(
            message="Active products fetched successfully",
            data={
                "active_product_count" : len(active_products)}
        )
    

    except Exception as e:
        print(e)
        raise HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, detail=f"{e}")

# GETTING ALL INACTIVE PRODUCTS COUNT
@router.get("/inactive-products/", description="This is used to get all inactive products", response_model=SuccessResponse, status_code=status.HTTP_200_OK)
def get_inactive_products(db: Session = Depends(get_db)):
    """
    This is used to get all inactive products.  
    """
    try:
        # Fetch all inactive products from the database
        inactive_products = db.query(inventory.Inventory).filter(inventory.Inventory.status == '0').all()
        if not inactive_products:
            raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="No inactive products found")

        # Return a success response with user info
        return SuccessResponse(
            message="Inactive products fetched successfully",
            data={
                "inactive_product_count" : len(inactive_products)}
        )
    except Exception as e:
        print(e)
        raise HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, detail=f"{e}")

# GETTING ALL USERS
@router.get("/users/all", description="This is used to get all users", response_model=SuccessResponse, status_code=status.HTTP_200_OK)
def get_all_users(db: Session = Depends(get_db)):
    """
    This is used to get all users.  
    """
    try:
        # Fetch all users from the database
        users = db.query(user.User).all()

        if not users:
            raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="No users found")


        # Return a success response with user info
        return SuccessResponse(
            message="Users fetched successfully",
            data={
                "users": [user_data.info() for user_data in users] 
            }
        )

    except Exception as e:
        print(e)
        raise HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, detail=f"{e}")

# DELETING USER BY ID
@router.delete("/user/{user_id}", description="This is used to delete user by id", response_model=SuccessResponse, status_code=status.HTTP_200_OK)
def delete_user(user_id: int, db: Session = Depends(get_db)):
    """
    This is used to delete user by id.  
    """
    try:
        # Fetch the user from the database
        user_data = db.query(user.User).filter(user.User.id == user_id).first()

        if not user_data:
            raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="User not found")

        # Delete the user from the database
        db.delete(user_data)
        db.commit()

        # Return a success response with user info
        return SuccessResponse(
            message="User deleted successfully",
        )

    except Exception as e:
        print(e)
        raise HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, detail=f"{e}")

# ADDING NEW USER 
@router.post("/user/register/", description="This is used to create new user or user registration", response_model=SuccessResponse, status_code=status.HTTP_201_CREATED)
def create_user(form_data: Admin_User_Registration, db: Session = Depends(get_db)):
    """Create a new user."""
    # Hashing the password
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
            user_type=form_data.user_type,
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
    except HTTPException as http_exc:
        # Reraise HTTP exceptions directly
        raise http_exc

    except Exception as e:
        print(e)
        raise HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, detail=f"{e}")

# UPDATING USER 
# GETTING USER BY ID
@router.get("/user/{user_id}", description="This is used to get user by id", response_model=SuccessResponse, status_code=status.HTTP_200_OK)
def get_user_by_id(user_id: int, db: Session = Depends(get_db)):
    """
    This is used to get user by id.  
    """
    try:
        # Fetch the user from the database
        user_data = db.query(user.User).filter(user.User.id == user_id).first()
        if not user_data:
            raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="User not found")

        # Return a success response with user info
        return SuccessResponse(
            message="User fetched successfully",
            data=user_data.info()
        )

    except Exception as e:
        print(e)
        raise HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, detail=f"{e}")
# UPDATING USER BY ID
@router.put("/user/{user_id}", description="This is used to update user by id", response_model=SuccessResponse, status_code=status.HTTP_200_OK)
def update_user(user_id: int, form_data: Admin_edit_user, db: Session = Depends(get_db)):
    """
    This is used to update user by id.  
    """
    try:
        # Fetch the user from the database
        user_data = db.query(user.User).filter(user.User.id == user_id).first()
        if not user_data:
            raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="User not found")

        # Update the user data
        user_data.first_name = form_data.first_name
        user_data.last_name = form_data.last_name
        user_data.mobile_number = form_data.mobile_number
        user_data.email_address = form_data.email_address
        user_data.user_type = form_data.user_type

        # Commit the changes to the database
        db.commit()

        # Return a success response with updated user info
        return SuccessResponse(
            message="User updated successfully",
            data=user_data.info()
        )

    except Exception as e:
        print(e)
        raise HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, detail=f"{e}")