from pydantic import BaseModel, EmailStr, field_validator, StrictStr, Field
from typing import List, Any, Optional
from datetime import datetime
import re

class User_Registration(BaseModel):
    first_name:StrictStr 
    last_name:StrictStr
    mobile_number:StrictStr
    email_address:EmailStr
    password:StrictStr
    # FIRST_NAME VALIDATION
    @field_validator("first_name")
    def validate_first_name(cls, value):
        if not value.replace(" ", "").isalpha():
            raise ValueError("First name must only contain alphabetic characters and spaces.")
        if "  " in value:
            raise ValueError("First name must not contain consecutive spaces.")
        return value.strip() 

    # LAST_NAME VALIDATION
    @field_validator("last_name")
    def validate_last_name(cls, value):
        if not value.replace(" ", "").isalpha():
            raise ValueError("Last name must only contain alphabetic characters and spaces.")
        if "  " in value:
            raise ValueError("Last name must not contain consecutive spaces.")
        return value.strip() 

    # PHONE VALIDATION 
    @field_validator("mobile_number")
    def validate_phone(cls, value: str) -> str:
        # Remove optional spaces, dashes, or the country code prefix for validation
        cleaned_value = value.replace(" ", "").replace("-", "")

        # Check for country code
        if cleaned_value.startswith("+91"):
            cleaned_value = cleaned_value[3:]
        elif cleaned_value.startswith("91") and len(cleaned_value) > 10:
            cleaned_value = cleaned_value[2:]

        # Ensure the number is exactly 10 digits
        if len(cleaned_value) != 10:
            raise ValueError("Phone number must be exactly 10 digits long.")

        # Ensure it starts with 6, 7, 8, or 9
        if cleaned_value[0] not in "6789":
            raise ValueError("Phone number must start with 6, 7, 8, or 9.")
        
        # Ensure the phone number is numeric
        if not cleaned_value.isdigit():
            raise ValueError("Phone number must contain only digits.")

        return value.strip()
    # EMAIL VALIDATION
    @field_validator("email_address")
    def validate_email(cls, value):
        allowed_domains = ["example.com", "test.com", "gmail.com", 'talent.com', "gmail.in", "talentelgia.com"]
        domain = value.split("@")[1]
        if domain not in allowed_domains:
            raise ValueError(f"Email must be from one of the following domains: {', '.join(allowed_domains)}")
        return value

    # PASSWORD VALIDATION
    @field_validator("password")
    def validate_password(cls, value):
        if len(value) < 8:
            raise ValueError("Password must be at least 8 characters long")
        if not any(char.isdigit() for char in value):
            raise ValueError("Password must contain at least one digit")
        if not any(char.isupper() for char in value):
            raise ValueError("Password must contain at least one uppercase letter")
        if not any(char.islower() for char in value):
            raise ValueError("Password must contain at least one lowercase letter")
        if not any(char in "!@#$%^&*()-_=+[]{};:'\",.<>?/\\|`~" for char in value):
            raise ValueError("Password must contain at least one special character")
        return value
    class Config:
        from_attributes = True
        validate_by_name = True



####
class User_login(BaseModel):
    email_address:EmailStr
    password:StrictStr

    # EMAIL VALIDATION
    @field_validator("email_address")
    def validate_email(cls, value):
        allowed_domains = ["example.com", "test.com", "gmail.com", 'talent.com', "talentelgia.com"]
        domain = value.split("@")[1]
        if domain not in allowed_domains:
            raise ValueError(f"Email must be from one of the following domains: {', '.join(allowed_domains)}")
        return value

    # PASSWORD VALIDATION
    @field_validator("password")
    def validate_password(cls, value):
        if len(value) < 8:
            raise ValueError("Password must be at least 8 characters long")
        if not any(char.isdigit() for char in value):
            raise ValueError("Password must contain at least one digit")
        if not any(char.isupper() for char in value):
            raise ValueError("Password must contain at least one uppercase letter")
        if not any(char.islower() for char in value):
            raise ValueError("Password must contain at least one lowercase letter")
        if not any(char in "!@#$%^&*()-_=+[]{};:'\",.<>?/\\|`~" for char in value):
            raise ValueError("Password must contain at least one special character")
        return value

    class Config:
        from_attributes = True
        validate_by_name = True



# ADMIN USER REGISTRATION
class Admin_User_Registration(BaseModel):
    first_name:StrictStr 
    last_name:StrictStr
    mobile_number:StrictStr
    email_address:EmailStr
    password:StrictStr
    user_type:StrictStr
    # FIRST_NAME VALIDATION
    @field_validator("first_name")
    def validate_first_name(cls, value):
        if not value.replace(" ", "").isalpha():
            raise ValueError("First name must only contain alphabetic characters and spaces.")
        if "  " in value:
            raise ValueError("First name must not contain consecutive spaces.")
        return value.strip() 

    # LAST_NAME VALIDATION
    @field_validator("last_name")
    def validate_last_name(cls, value):
        if not value.replace(" ", "").isalpha():
            raise ValueError("Last name must only contain alphabetic characters and spaces.")
        if "  " in value:
            raise ValueError("Last name must not contain consecutive spaces.")
        return value.strip() 

    # PHONE VALIDATION 
    @field_validator("mobile_number")
    def validate_phone(cls, value: str) -> str:
        # Remove optional spaces, dashes, or the country code prefix for validation
        cleaned_value = value.replace(" ", "").replace("-", "")

        # Check for country code
        if cleaned_value.startswith("+91"):
            cleaned_value = cleaned_value[3:]
        elif cleaned_value.startswith("91") and len(cleaned_value) > 10:
            cleaned_value = cleaned_value[2:]

        # Ensure the number is exactly 10 digits
        if len(cleaned_value) != 10:
            raise ValueError("Phone number must be exactly 10 digits long.")

        # Ensure it starts with 6, 7, 8, or 9
        if cleaned_value[0] not in "6789":
            raise ValueError("Phone number must start with 6, 7, 8, or 9.")
        
        # Ensure the phone number is numeric
        if not cleaned_value.isdigit():
            raise ValueError("Phone number must contain only digits.")

        return value.strip()
    # EMAIL VALIDATION
    @field_validator("email_address")
    def validate_email(cls, value):
        allowed_domains = ["example.com", "test.com", "gmail.com", 'talent.com', "gmail.in"]
        domain = value.split("@")[1]
        if domain not in allowed_domains:
            raise ValueError(f"Email must be from one of the following domains: {', '.join(allowed_domains)}")
        return value

    # PASSWORD VALIDATION
    @field_validator("password")
    def validate_password(cls, value):
        if len(value) < 8:
            raise ValueError("Password must be at least 8 characters long")
        if not any(char.isdigit() for char in value):
            raise ValueError("Password must contain at least one digit")
        if not any(char.isupper() for char in value):
            raise ValueError("Password must contain at least one uppercase letter")
        if not any(char.islower() for char in value):
            raise ValueError("Password must contain at least one lowercase letter")
        if not any(char in "!@#$%^&*()-_=+[]{};:'\",.<>?/\\|`~" for char in value):
            raise ValueError("Password must contain at least one special character")
        return value
    class Config:
        from_attributes = True
        validate_by_name = True

# ADMIN USER EDITING
class Admin_edit_user(BaseModel):
    first_name: Optional[StrictStr] = None
    last_name: Optional[StrictStr] = None
    mobile_number: Optional[StrictStr] = None
    email_address: Optional[EmailStr] = None
    user_type: Optional[StrictStr] = None

    # FIRST_NAME VALIDATION
    @field_validator("first_name")
    def validate_first_name(cls, value):
        if not value.replace(" ", "").isalpha():
            raise ValueError("First name must only contain alphabetic characters and spaces.")
        if "  " in value:
            raise ValueError("First name must not contain consecutive spaces.")
        return value.strip() 

    # LAST_NAME VALIDATION
    @field_validator("last_name")
    def validate_last_name(cls, value):
        if not value.replace(" ", "").isalpha():
            raise ValueError("Last name must only contain alphabetic characters and spaces.")
        if "  " in value:
            raise ValueError("Last name must not contain consecutive spaces.")
        return value.strip() 

    # PHONE VALIDATION 
    @field_validator("mobile_number")
    def validate_phone(cls, value: str) -> str:
        # Remove optional spaces, dashes, or the country code prefix for validation
        cleaned_value = value.replace(" ", "").replace("-", "")

        # Check for country code
        if cleaned_value.startswith("+91"):
            cleaned_value = cleaned_value[3:]
        elif cleaned_value.startswith("91") and len(cleaned_value) > 10:
            cleaned_value = cleaned_value[2:]

        # Ensure the number is exactly 10 digits
        if len(cleaned_value) != 10:
            raise ValueError("Phone number must be exactly 10 digits long.")

        # Ensure it starts with 6, 7, 8, or 9
        if cleaned_value[0] not in "6789":
            raise ValueError("Phone number must start with 6, 7, 8, or 9.")
        
        # Ensure the phone number is numeric
        if not cleaned_value.isdigit():
            raise ValueError("Phone number must contain only digits.")

        return value.strip()
    # EMAIL VALIDATION
    @field_validator("email_address")
    def validate_email(cls, value):
        allowed_domains = ["example.com", "test.com", "gmail.com", 'talent.com', "gmail.in"]
        domain = value.split("@")[1]
        if domain not in allowed_domains:
            raise ValueError(f"Email must be from one of the following domains: {', '.join(allowed_domains)}")
        return value
    class Config:
        from_attributes = True
        validate_by_name = True



class GetUserByEmailAddress(BaseModel):
    email_address:str
    class Config:
        from_attributes = True
        validate_by_name = True
    # EMAIL VALIDATION
    @field_validator('email_address')
    def validate_email(cls, value):
        allowed_domains = ['gmail.com', 'test.com', 'talentelgia.com']
        domain = value.split("@")[1]
        if domain not in allowed_domains:
            raise ValueError(f"Email must be from one of the following domains: {', '.join(allowed_domains)}")
        return value


class ResetPassword(BaseModel):
    email_address: EmailStr
    new_password: StrictStr
    confirm_password: StrictStr
    @field_validator('email_address')
    def validate_email(cls, value):
        allowed_domains = ['gmail.com', 'test.com', 'talentelgia.com']
        domain = value.split("@")[1]
        if domain not in allowed_domains:
            raise ValueError(f"Email must be from one of the following domains: {', '.join(allowed_domains)}")
        return value
    # PASSWORD VALIDATION
    @field_validator("new_password")
    def validate_password(cls, value):
        if len(value) < 8:
            raise ValueError("Password must be at least 8 characters long")
        if not any(char.isdigit() for char in value):
            raise ValueError("Password must contain at least one digit")
        if not any(char.isupper() for char in value):
            raise ValueError("Password must contain at least one uppercase letter")
        if not any(char.islower() for char in value):
            raise ValueError("Password must contain at least one lowercase letter")
        if not any(char in "!@#$%^&*()-_=+[]{};:'\",.<>?/\\|`~" for char in value):
            raise ValueError("Password must contain at least one special character")
        return value
    # PASSWORD VALIDATION
    @field_validator("confirm_password")
    def confirm_validate_password(cls, value):
        if len(value) < 8:
            raise ValueError("Password must be at least 8 characters long")
        if not any(char.isdigit() for char in value):
            raise ValueError("Password must contain at least one digit")
        if not any(char.isupper() for char in value):
            raise ValueError("Password must contain at least one uppercase letter")
        if not any(char.islower() for char in value):
            raise ValueError("Password must contain at least one lowercase letter")
        if not any(char in "!@#$%^&*()-_=+[]{};:'\",.<>?/\\|`~" for char in value):
            raise ValueError("Password must contain at least one special character")
        return value
    class Config:
        from_attributes = True
        validate_by_name = True


class ProductBase(BaseModel):
    title: str = Field(..., max_length=255)
    description: str
    category: str = Field(..., max_length=255)
    price: float = Field(..., gt=0)
    images: List[str] = Field(..., min_items=1)
    thumbnail: str = Field(..., max_length=255)
    discountpercentage: Optional[float] = Field(None, ge=0, le=100)
    rating: Optional[float] = Field(None, ge=0, le=5)
    stock: int = Field(0, ge=0)
    brand: Optional[str] = Field(None, max_length=255)
    warrantyinformation: Optional[str] = None
    shippinginformation: Optional[str] = None
    availabilitystatus: Optional[str] = Field(None, max_length=255)
    returnpolicy: Optional[str] = None

    class Config:
        from_attributes = True

    # Category validation
    @field_validator('category')
    def validate_category(cls, value):
        allowed_categories = ['beauty', 'fragrances', 'furniture', 'groceries']
        if value.lower() not in allowed_categories:
            raise ValueError(f"Category must be one of: {', '.join(allowed_categories)}")
        return value

    # Price validation
    @field_validator('price')
    def validate_price(cls, value):
        if value <= 0:
            raise ValueError("Price must be greater than 0")
        return value

    # Images validation
    @field_validator('images')
    def validate_images(cls, value):
        url_pattern = re.compile(r'^https?://[^\s/$.?#].[^\s]*$')
        for img in value:
            if not url_pattern.match(img):
                raise ValueError(f"Invalid image URL: {img}")
        return value

    # Thumbnail validation
    @field_validator('thumbnail')
    def validate_thumbnail(cls, value):
        url_pattern = re.compile(r'^https?://[^\s/$.?#].[^\s]*$')
        if not url_pattern.match(value):
            raise ValueError("Thumbnail must be a valid URL")
        return value

    # Discountpercentage validation
    @field_validator('discountpercentage')
    def validate_discount(cls, value):
        if value is not None and (value < 0 or value > 100):
            raise ValueError("Discount percentage must be between 0 and 100")
        return value

    # Rating validation
    @field_validator('rating')
    def validate_rating(cls, value):
        if value is not None and (value < 0 or value > 5):
            raise ValueError("Rating must be between 0 and 5")
        return value

class ProductCreate(ProductBase):
    pass

class ProductUpdate(ProductBase):
    title: Optional[str] = Field(None, max_length=255)
    description: Optional[str] = None
    category: Optional[str] = Field(None, max_length=255)
    price: Optional[float] = Field(None, gt=0)
    images: Optional[List[str]] = Field(None, min_items=1)
    thumbnail: Optional[str] = Field(None, max_length=255)
    discountpercentage: Optional[float] = Field(None, ge=0, le=100)
    rating: Optional[float] = Field(None, ge=0, le=5)
    stock: Optional[int] = Field(None, ge=0)
    brand: Optional[str] = Field(None, max_length=255)
    warrantyinformation: Optional[str] = None
    shippinginformation: Optional[str] = None
    availabilitystatus: Optional[str] = Field(None, max_length=255)
    returnpolicy: Optional[str] = None
    status: Optional[str] = None

class MessageResponse(BaseModel):
    message: str
    success: bool = True
    status_code: int = 200


class SuccessResponse(BaseModel):
    message: str
    success: bool = True
    status_code: int = 200
    data: Optional[Any] = None


class ValidationErrorSchema(BaseModel):
    detail: str


class OtpSchema(BaseModel):
    email_address: EmailStr
    otp: int

    class Config:
        from_attributes = True
        validate_by_name = True
