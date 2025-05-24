from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_login import LoginManager
import os

# Initialize extensions
db = SQLAlchemy()
login_manager = LoginManager()

def create_app():
    app = Flask(__name__)

    # Configuration
    base_dir = os.path.abspath(os.path.dirname(__file__))
    app.config['SECRET_KEY'] = os.environ.get('SECRET_KEY', 'your_fallback_secret_key_for_development')
    app.config['SQLALCHEMY_DATABASE_URI'] = os.environ.get('DATABASE_URL', 'sqlite:///' + os.path.join(base_dir, 'site.db'))
    app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

    # Initialize extensions with app
    db.init_app(app)
    login_manager.init_app(app)
    login_manager.login_view = 'main_bp.login' # Or whatever your login route will be named, adjust if needed
    login_manager.login_message_category = 'info'


    # User loader function for Flask-Login
    # Must be defined before it's used by login_manager
    # But User model needs db, so import User after db is initialized or use a closure.
    # Importing models here to avoid circular imports if models need 'db'
    from .models import User
    @login_manager.user_loader
    def load_user(user_id):
        return User.query.get(int(user_id))

    # Register blueprints
    from .routes import main_bp
    app.register_blueprint(main_bp, url_prefix='/api')

    # Create database tables
    with app.app_context():
        db.create_all() # Creates tables from SQLAlchemy models

    return app
