import smtplib
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
from config.environment_variables import EMAIL, PASSWORD, SMTP_SERVER, SMTP_PORT_TLS

def send_otp_email (recipient_email:str, otp:str):
    """Sending OTP To Email For Verification
    """
    subject = "Your OTP For Login"
    body = f"Dear User,\n\nYour OTP for login is: {otp}\nThis OTP is valid for 5 minutes."
    message = MIMEMultipart()
    message["From"] = EMAIL
    message["To"] = recipient_email
    message["Subject"] = subject
    message.attach(MIMEText(body, "plain"))
    try:
        with smtplib.SMTP(SMTP_SERVER, SMTP_PORT_TLS) as server:
            server.starttls()
            server.login(EMAIL, PASSWORD)
            server.sendmail(EMAIL, recipient_email, message.as_string())
        print(f"OTP Sent To {recipient_email}")
    except Exception as e:
        print(f"Failed To Send Email :{e}")
