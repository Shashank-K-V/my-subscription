# init_db.py
"""
This script initializes the SQLite database for your Flask app.
Run it once after editing models or setting up a new environment.
"""

from app import app, db

with app.app_context():
    print("🧱 Creating database tables...")
    db.create_all()
    print("✅ Database initialized successfully at:", app.config["SQLALCHEMY_DATABASE_URI"])
