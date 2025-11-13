import os

class Config:
    SECRET_KEY = os.getenv("SECRET_KEY", "dev-secret-key")
    # Add future configs here (DB, API keys, etc.)
