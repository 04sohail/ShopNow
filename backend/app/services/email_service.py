import smtplib
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
from app.config import EMAIL, PASSWORD, SMTP_SERVER, SMTP_PORT_TLS

def send_otp_email(recipient_email: str, otp: str):
    """
    Send OTP to the recipient's email for verification.
    
    Args:
        recipient_email (str): The email address of the recipient.
        otp (str): The One-Time Password to be sent.
    """
    subject = "Your OTP for Login"
    html_template = f"""
    <!DOCTYPE html>
    <html>
    <head>
        <style>
            body {{
                font-family: Arial, sans-serif;
                background-color: #f4f4f4;
                margin: 0;
                padding: 0;
            }}
            .email-container {{
                max-width: 600px;
                margin: 20px auto;
                background-color: #ffffff;
                border-radius: 8px;
                box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
                overflow: hidden;
            }}
            .header {{
                background-color: #4CAF50;
                color: #ffffff;
                text-align: center;
                padding: 20px;
            }}
            .header h1 {{
                margin: 0;
                font-size: 24px;
            }}
            .body {{
                padding: 20px;
                color: #333333;
            }}
            .body p {{
                margin: 10px 0;
                line-height: 1.6;
            }}
            .otp {{
                font-size: 24px;
                font-weight: bold;
                text-align: center;
                color: #4CAF50;
                margin: 20px 0;
            }}
            .footer {{
                text-align: center;
                font-size: 12px;
                color: #aaaaaa;
                padding: 10px;
                border-top: 1px solid #dddddd;
            }}
        </style>
    </head>
    <body>
        <div class="email-container">
            <div class="header">
                <h1>ShopNow</h1>
            </div>
            <div class="body">
                <p>Hello,</p>
                <p>Your One-Time Password (OTP) for accessing ShopNow is:</p>
                <div class="otp">{otp}</div>
                <p>This OTP is valid for the next <strong>5 minutes</strong>. Please do not share this OTP with anyone for security purposes.</p>
                <p>If you did not request this OTP, please ignore this email or contact our support team.</p>
            </div>
            <div class="footer">
                <p>Thank you for using ShopNow.</p>
            </div>
        </div>
    </body>
    </html>
    """

    # Create the email message
    message = MIMEMultipart()
    message["From"] = EMAIL
    message["To"] = recipient_email
    message["Subject"] = subject
    message.attach(MIMEText(html_template, "html"))

    try:
        # Connect to the SMTP server and send the email
        with smtplib.SMTP(SMTP_SERVER, SMTP_PORT_TLS) as server:
            server.starttls()  # Start TLS for security
            server.login(EMAIL, PASSWORD)  # Login to the email server
            server.sendmail(EMAIL, recipient_email, message.as_string())  # Send email
        print(f"OTP successfully sent to {recipient_email}")
    except smtplib.SMTPException as e:
        print(f"SMTP Error: {e}")
    except Exception as e:
        print(f"Failed to send OTP email: {e}")
