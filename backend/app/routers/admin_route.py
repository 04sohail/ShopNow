from fastapi import APIRouter, HTTPException, status, Depends
from ..schemas import SuccessResponse, ProductCreate, ProductUpdate
from typing import List
from ..models import user, inventory
from ..models.product import Product
from sqlalchemy.orm import Session
from sqlalchemy import desc
from ..database.connection import get_db
from ..schemas import Admin_User_Registration, Admin_edit_user
from passlib.context import CryptContext
from sqlalchemy.exc import IntegrityError
import psycopg2

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
        products = db.query(Product).all()
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
        active_products = db.query(Product).filter(Product.status == '1').all()
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
        inactive_products = db.query(Product).filter(Product.status == '0').all()
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
        users = db.query(user.User).order_by(desc(user.User.id)).all()
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
@router.put(
    "/user/{user_id}",
    description="This is used to update user by id",
    response_model=SuccessResponse,
    status_code=status.HTTP_200_OK
)
def update_user(user_id: int, form_data: Admin_edit_user, db: Session = Depends(get_db)):
    """
    This is used to update user by id.
    """
    try:
        user_data = db.query(user.User).filter(user.User.id == user_id).first()
        if not user_data:
            raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="User not found")
        user_data.first_name = form_data.first_name
        user_data.last_name = form_data.last_name
        user_data.mobile_number = form_data.mobile_number
        user_data.email_address = form_data.email_address
        user_data.user_type = form_data.user_type
        db.commit()
        return SuccessResponse(
            message="User updated successfully",
            data=user_data.info()
        )

    except IntegrityError as e:
        db.rollback()

        if isinstance(e.orig, psycopg2.errors.UniqueViolation):
            error_message = str(e.orig)
            if "users_email_address_key" in error_message:
                detail = "Email already exists"
            elif "users_mobile_number_key" in error_message:
                detail = "Mobile number already exists"
            else:
                detail = "Unique constraint violated"

            raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail=detail)
        
        raise HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, detail="Database integrity error")

    except HTTPException as http_exc:
        raise http_exc
    except Exception as e:
        db.rollback()
        print(e)
        raise HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, detail="Something went wrong")


########## PRODUCTS API
@router.post("/products/create", response_model=SuccessResponse, status_code=status.HTTP_201_CREATED)
def create_product(product: ProductCreate, db: Session = Depends(get_db)):
    try:
        existing_product = db.query(Product).filter(Product.title == product.title).first()
        if existing_product:
            raise HTTPException(status_code=status.HTTP_409_CONFLICT, detail="Product already exists")
        last_product = db.query(Product).order_by(Product.id.desc()).first()
        next_id = (last_product.id + 1) if last_product else 1
        db_product = Product(**dict(product), sku=f"SKU{next_id}")
        db.add(db_product)
        db.commit()
        db.refresh(db_product)
        return SuccessResponse(
            message="Product created successfully",
            data=db_product.info()
        )
    except HTTPException as http_exc:
        raise http_exc
    except Exception as e:
        raise HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, detail=f"{e}")


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
    

@router.get("/products/{id}", response_model=SuccessResponse)
def read_product(id: int, db: Session = Depends(get_db)):
    product = db.query(Product).filter(Product.id == id).first()
    if product is None:
        raise HTTPException(status_code=404, detail="Product not found")
    return SuccessResponse(
        message="Product fetched successfully",
        data=product.info()
    )

@router.put("/products/{id}", response_model=SuccessResponse)
def update_product(id: int, product: ProductUpdate, db: Session = Depends(get_db)):
    db_product = db.query(Product).filter(Product.id == id).first()
    if db_product is None:
        raise HTTPException(status_code=404, detail="Product not found")
    db_product.title = product.title
    db_product.description = product.description
    db_product.category = product.category
    db_product.price = product.price
    db_product.images = product.images
    db_product.thumbnail = product.thumbnail
    db_product.discountpercentage = product.discountpercentage
    db_product.rating = product.rating
    db_product.stock = product.stock
    db_product.brand = product.brand
    db_product.warrantyinformation = product.warrantyinformation
    db_product.shippinginformation = product.shippinginformation
    db_product.availabilitystatus = product.availabilitystatus
    db_product.returnpolicy = product.returnpolicy
    db_product.status = product.status
    db.commit()
    db.refresh(db_product)
    return SuccessResponse(
        message="Product updated successfully",
        data=db_product.info()
    )


@router.delete("/products/{id}", response_model=SuccessResponse)
def delete_product(id: int, db: Session = Depends(get_db)):
    db_product = db.query(Product).filter(Product.id == id).first()
    if db_product is None:
        raise HTTPException(status_code=404, detail="Product not found")
    db.delete(db_product)
    db.commit()
    return SuccessResponse(
        message="Product deleted successfully",
    )
