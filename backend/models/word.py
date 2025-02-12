from backend import db
from sqlalchemy.dialects.postgresql import JSONB

class WordAnalysis(db.Model):
    __tablename__ = 'word_analyses'

    id = db.Column(db.Integer, primary_key=True)
    word = db.Column(db.String(255), nullable=False)
    part_of_speech = db.Column(db.String(50), nullable=False)
    language = db.Column(db.String(50), default='german')
    
    # Add JSON column to store complex word analysis data
    data = db.Column(JSONB, nullable=True)

    def __repr__(self):
        return f'<WordAnalysis {self.word} ({self.part_of_speech})>'

    def to_dict(self):
        """Convert model to dictionary for easier JSON serialization."""
        return {
            'id': self.id,
            'word': self.word,
            'part_of_speech': self.part_of_speech,
            'language': self.language,
            'data': self.data
        }
