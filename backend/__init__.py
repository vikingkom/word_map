from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate
from flask_cors import CORS
from dotenv import load_dotenv
import os

# Load environment variables
load_dotenv()

# Initialize Flask extensions
db = SQLAlchemy()

def create_app():
    app = Flask(__name__, 
                template_folder=os.path.join(os.path.dirname(__file__), 'templates'),
                static_folder=os.path.join(os.path.dirname(__file__), 'static'))
    
    # Configure the Flask application
    app.config['SQLALCHEMY_DATABASE_URI'] = os.getenv('DATABASE_URL')
    app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
    app.config['SECRET_KEY'] = os.getenv('SECRET_KEY', os.urandom(24))
    app.config['DEBUG'] = True
    app.config['TEMPLATES_AUTO_RELOAD'] = True

    # Initialize CORS
    CORS(app)
    
    # Initialize extensions
    db.init_app(app)
    migrate = Migrate(app, db)

    # Logging
    import logging
    logging.basicConfig(level=logging.DEBUG)

    # Register blueprints
    from .routes.admin_routes import admin_bp
    from .routes.api_routes import api_bp
    print("Registering blueprints...")  # Debug print
    app.register_blueprint(api_bp)
    app.register_blueprint(admin_bp)
    print("Blueprints registered!")  # Debug print

    # Print all registered routes
    print("Registered routes:")
    for rule in app.url_map.iter_rules():
        print(f"{rule.endpoint}: {rule.rule}")

    return app
