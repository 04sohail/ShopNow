import os
from dotenv import load_dotenv

load_dotenv()

db_url = os.environ.get("SQLALCHEMY_DATABASE_URL", None)
SMTP_SERVER = os.getenv("SMTP_SERVER")
SMTP_PORT_TLS = os.getenv("SMTP_PORT_TLS")
SMTP_PORT_SSL = os.getenv("SMTP_PORT_SSL")
EMAIL = os.getenv("EMAIL")
PASSWORD = os.getenv("PASSWORD")