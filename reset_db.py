from backend import create_app, db
from sqlalchemy import text

app = create_app()

with app.app_context():
    # Drop all tables
    db.session.execute(text('DROP SCHEMA public CASCADE'))
    db.session.execute(text('CREATE SCHEMA public'))
    db.session.commit()
    print("Database schema reset successfully!")
