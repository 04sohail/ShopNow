import random
from datetime import datetime, timedelta
from app.models.user import Users
from app.database.connection import SessionLocal 

def generate_otp():
    """Generate a 4-digit OTP."""
    return str(random.randint(1000, 9999))

def save_otp_to_db(user_id: int, otp: str):
    """Save OTP and its expiry to the database."""
    db = SessionLocal()
    expires_at = datetime.utcnow() + timedelta(minutes=5)  # OTP valid for 5 minutes

    # Store OTP and expiry in the database (Assuming you have an OTP table)
    otp_record = OTP(
        user_id=user_id,
        otp=otp,
        expires_at=expires_at
    )
    db.add(otp_record)
    db.commit()
    db.close()

def validate_otp(user_id: int, otp_input: str):
    """Validate OTP entered by the user."""
    db = SessionLocal()
    otp_record = db.query(OTP).filter(OTP.user_id == user_id).order_by(OTP.created_at.desc()).first()

    if not otp_record:
        return False

    if otp_record.otp == otp_input and otp_record.expires_at > datetime.utcnow():
        return True
    return False
