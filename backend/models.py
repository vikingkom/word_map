from . import db
from datetime import datetime
from sqlalchemy.dialects.postgresql import JSONB

class Word(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    word = db.Column(db.String(100), nullable=False, index=True)
    data = db.Column(JSONB, nullable=False)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    updated_at = db.Column(db.DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)
    search_count = db.Column(db.Integer, default=1)

    def to_dict(self):
        return {
            'id': self.id,
            'word': self.word,
            'data': self.data,
            'created_at': self.created_at.isoformat(),
            'updated_at': self.updated_at.isoformat(),
            'search_count': self.search_count
        }

class UserProgress(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    word_id = db.Column(db.Integer, db.ForeignKey('word.id'), nullable=False)
    status = db.Column(db.String(20), default='learning')  # learning, mastered
    last_reviewed = db.Column(db.DateTime, default=datetime.utcnow)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    
    word = db.relationship('Word', backref=db.backref('progress', lazy=True))
