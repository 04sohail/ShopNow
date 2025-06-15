import os
from dotenv import load_dotenv
from jose import JWTError, jwt, ExpiredSignatureError
from datetime import datetime, timedelta
from fastapi import HTTPException, status, Depends
from fastapi.security import OAuth2PasswordBearer

load_dotenv()

oauth2_scheme = OAuth2PasswordBearer(tokenUrl="token")

SECRET_KEY = os.getenv("SECRET_KEY")
ALGORITHM = os.getenv("JWT_ALGORITHM")
EXPIRATION = os.getenv("JWT_EXPIRATION")

# GETTING TOKEN
def generate_token(data:dict):
    print("DATA=>", data)
    try:
        to_encode = data.copy()
        expire = datetime.now() + timedelta(hours=int(EXPIRATION))
        to_encode.update({"exp":expire})
        encoded_jwt = jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)
        # print("JWT=>", encoded_jwt)
        print("EXPIRATION=>", expire)
        # print("-"*30)
        return encoded_jwt
    except Exception as e:
        print(e)


# VERIFYING TOKEN
def verify_token(token: str = Depends(oauth2_scheme)):
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        print("PAYLOAD=>", payload)
        return payload
    except ExpiredSignatureError:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Token has expired",
            headers={"WWW-Authenticate": "Bearer"},
        )
    except JWTError:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid token",
            headers={"WWW-Authenticate": "Bearer"},
        )
