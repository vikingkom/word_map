from backend import db

class WordAnalysis(db.Model):
    __tablename__ = 'word_analyses'

    id = db.Column(db.Integer, primary_key=True)
    word = db.Column(db.String(255), nullable=False)
    part_of_speech = db.Column(db.String(50), nullable=False)
    language = db.Column(db.String(50), default='german')

    def __repr__(self):
        return f'<WordAnalysis {self.word} ({self.part_of_speech})>'
