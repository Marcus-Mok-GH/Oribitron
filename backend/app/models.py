from flask_sqlalchemy import SQLAlchemy
from flask_login import UserMixin
from werkzeug.security import generate_password_hash, check_password_hash
from . import db # We will define db in __init__.py

class User(UserMixin, db.Model):
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(80), unique=True, nullable=False)
    email = db.Column(db.String(120), unique=True, nullable=False)
    password_hash = db.Column(db.String(256), nullable=False) # Increased length for hash

    # For chat tier management (Phase 4)
    free_pixtral_messages_remaining = db.Column(db.Integer, default=25)
    free_gemini_messages_remaining = db.Column(db.Integer, default=25)

    # For Stripe subscriptions (Phase 3)
    stripe_customer_id = db.Column(db.String(120), nullable=True)
    subscription_tier = db.Column(db.String(50), default='free', nullable=True) # 'free', 'orbitron-sonar', 'obliterator-pro'
    subscription_status = db.Column(db.String(50), nullable=True) # e.g., 'active', 'canceled', 'past_due'


    def set_password(self, password):
        self.password_hash = generate_password_hash(password)

    def check_password(self, password):
        return check_password_hash(self.password_hash, password)

    def __repr__(self):
        return f'<User {self.username}>'
