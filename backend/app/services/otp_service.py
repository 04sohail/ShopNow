import random
from datetime import datetime, timedelta, timezone

def generate_otp():
    """Generate a 4-digit OTP."""
    otp = str(random.randint(1000, 9999))
    otp_expires_at = datetime.now(timezone.utc) + timedelta(minutes=5)
    return otp, otp_expires_at
