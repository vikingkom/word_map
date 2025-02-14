from backend import db
from sqlalchemy.dialects.postgresql import JSONB
from datetime import datetime

class WordAnalysis(db.Model):
    __tablename__ = 'word_analyses'

    id = db.Column(db.Integer, primary_key=True)
    word = db.Column(db.String(255), nullable=False)
    part_of_speech = db.Column(db.String(50), nullable=True)  # Make nullable
    language = db.Column(db.String(50), default='german', nullable=True)  # Make nullable
    data = db.Column(JSONB, nullable=True)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    updated_at = db.Column(db.DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)
    search_count = db.Column(db.Integer, default=0)

    def __repr__(self):
        return f'<WordAnalysis {self.word}>'

    def to_dict(self):
        """Convert model to dictionary for easier JSON serialization."""
        return {
            'id': self.id,
            'word': self.word,
            'part_of_speech': self.part_of_speech,
            'language': self.language,
            'data': self.data,
            'created_at': self.created_at.isoformat() if self.created_at else None,
            'updated_at': self.updated_at.isoformat() if self.updated_at else None,
            'search_count': self.search_count
        }
