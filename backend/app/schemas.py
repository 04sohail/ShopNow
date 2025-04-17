from pydantic import BaseModel, EmailStr, field_validator, StrictStr
from typing import List, Any, Optional



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
