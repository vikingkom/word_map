from flask import Blueprint, request, jsonify, current_app
from backend import db
from backend.models.word import WordAnalysis as Word
from backend.services import get_word_analysis
import openai
import os
import traceback
import logging

# Configure logging
logging.basicConfig(level=logging.DEBUG)
logger = logging.getLogger(__name__)

api_bp = Blueprint('api', __name__, url_prefix='/api')

@api_bp.route('/analyze', methods=['POST'])
def analyze_word():
    try:
        logger.debug("Received analyze request")
        data = request.get_json()
        logger.debug(f"Request data: {data}")
        
        if not data:
            return jsonify({'error': 'No JSON data provided'}), 400
            
        word = data.get('word')
        if not word:
            return jsonify({'error': 'No word provided'}), 400

        logger.debug(f"Looking up word: {word}")
        # Check if word exists in database
        try:
            existing_word = Word.query.filter_by(word=word).first()
            logger.debug(f"Database query result: {existing_word}")
        except Exception as e:
            logger.error(f"Database error: {str(e)}")
            logger.error(traceback.format_exc())
            return jsonify({'error': f'Database error: {str(e)}'}), 500
        
        if existing_word:
            logger.debug("Found existing word")
            existing_word.search_count += 1
            db.session.commit()
            return jsonify(existing_word.to_dict())

        try:
            # Get analysis from ChatGPT
            logger.debug("Getting word analysis from ChatGPT")
            word_data = get_word_analysis(word)
            
            # Save to database
            new_word = Word(word=word, data=word_data)
            db.session.add(new_word)
            db.session.commit()
            
            return jsonify(new_word.to_dict())
        
        except Exception as e:
            logger.error(f"Error in word analysis: {str(e)}")
            logger.error(traceback.format_exc())
            return jsonify({'error': f'Error getting word analysis: {str(e)}'}), 500
            
    except Exception as e:
        logger.error(f"Error in analyze_word endpoint: {str(e)}")
        logger.error(traceback.format_exc())
        return jsonify({'error': 'Internal server error'}), 500

@api_bp.route('/history', methods=['GET'])
def get_history():
    try:
        words = Word.query.order_by(Word.updated_at.desc()).limit(50).all()
        return jsonify([word.to_dict() for word in words])
    except Exception as e:
        logger.error(f"Error in get_history endpoint: {str(e)}")
        logger.error(traceback.format_exc())
        return jsonify({'error': 'Internal server error'}), 500

@api_bp.route('/progress', methods=['POST'])
def update_progress():
    try:
        data = request.get_json()
        if not data:
            return jsonify({'error': 'No JSON data provided'}), 400
            
        word_id = data.get('word_id')
        status = data.get('status')
        
        if not word_id or not status:
            return jsonify({'error': 'Missing required fields'}), 400
        
        # For now, just return success without storing progress
        return jsonify({'status': 'success'})
    except Exception as e:
        logger.error(f"Error in update_progress endpoint: {str(e)}")
        logger.error(traceback.format_exc())
        return jsonify({'error': 'Internal server error'}), 500
