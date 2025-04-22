from sqlalchemy import Column, Integer, String, BigInteger, Boolean, SmallInteger, Numeric, ForeignKey, TIMESTAMP, text
from ..database.connection import Base

class User(Base):
    __tablename__ = 'users'

    id = Column(Integer, primary_key=True)
    user_type = Column(String, server_default=text('free-user'), nullable=False)
    first_name = Column(String, nullable=False)
    last_name = Column(String, nullable=False)
    email_address = Column(String, nullable=False, unique=True)
    mobile_number = Column(Integer, nullable=False, unique=True)
    password = Column(String, nullable=False)
    otp = Column(SmallInteger, nullable=True)
    otp_expires_at = Column(TIMESTAMP, nullable=True)
    created_at = Column(TIMESTAMP, nullable=False, server_default=text("now()"))
    updated_at = Column(TIMESTAMP, nullable=False, server_default=text("now()"))
    status = Column(String, nullable=False, server_default=text('1'))

    def info(self):
        return {
            "id": self.id,
            "first_name": self.first_name,
            "last_name": self.last_name,
            "email_address": self.email_address,
            "mobile_number": self.mobile_number,
            "user_type": self.user_type,
            "created_at": self.created_at,
        }