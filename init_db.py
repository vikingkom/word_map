from backend import create_app, db
from backend.models import Word, UserProgress

app = create_app()

with app.app_context():
    # Create all tables
    db.create_all()
    print("Database tables created successfully!")
