from flask import Blueprint, request, jsonify
from backend import db
from backend.models.models import Word, UserProgress
from backend.services import get_word_analysis
import openai
import os
import traceback

api_bp = Blueprint('api', __name__)

@api_bp.route('/api/analyze', methods=['POST'])
def analyze_word():
    try:
        data = request.get_json()
        if not data:
            return jsonify({'error': 'No JSON data provided'}), 400
            
        word = data.get('word')
        if not word:
            return jsonify({'error': 'No word provided'}), 400

        # Check if word exists in database
        existing_word = Word.query.filter_by(word=word).first()
        
        if existing_word:
            existing_word.search_count += 1
            db.session.commit()
            return jsonify(existing_word.to_dict())

        try:
            # Get analysis from ChatGPT
            word_data = get_word_analysis(word)
            
            # Save to database
            new_word = Word(word=word, data=word_data)
            db.session.add(new_word)
            db.session.commit()
            
            return jsonify(new_word.to_dict())
        
        except Exception as e:
            print(f"Error in word analysis: {str(e)}")
            print(traceback.format_exc())
            return jsonify({'error': str(e)}), 500
            
    except Exception as e:
        print(f"Error in analyze_word endpoint: {str(e)}")
        print(traceback.format_exc())
        return jsonify({'error': 'Internal server error'}), 500

@api_bp.route('/api/history', methods=['GET'])
def get_history():
    try:
        words = Word.query.order_by(Word.updated_at.desc()).limit(50).all()
        return jsonify([word.to_dict() for word in words])
    except Exception as e:
        print(f"Error in get_history endpoint: {str(e)}")
        print(traceback.format_exc())
        return jsonify({'error': 'Internal server error'}), 500

@api_bp.route('/api/progress', methods=['POST'])
def update_progress():
    try:
        data = request.get_json()
        if not data:
            return jsonify({'error': 'No JSON data provided'}), 400
            
        word_id = data.get('word_id')
        status = data.get('status')
        
        if not word_id or not status:
            return jsonify({'error': 'Missing required fields'}), 400
        
        progress = UserProgress.query.filter_by(word_id=word_id).first()
        if not progress:
            progress = UserProgress(word_id=word_id)
            db.session.add(progress)
        
        progress.status = status
        db.session.commit()
        
        return jsonify({'status': 'success'})
    except Exception as e:
        print(f"Error in update_progress endpoint: {str(e)}")
        print(traceback.format_exc())
        return jsonify({'error': 'Internal server error'}), 500
