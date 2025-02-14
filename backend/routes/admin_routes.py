from flask import Blueprint, render_template, request, redirect, url_for, flash, jsonify
from backend.models.word import WordAnalysis
from backend import db
import json

admin_bp = Blueprint('admin', __name__, url_prefix='/admin')

@admin_bp.route('/')
def admin_dashboard():
    """Admin dashboard showing list of word analyses."""
    words = WordAnalysis.query.all()
    return render_template('admin/dashboard.html', words=words)

@admin_bp.route('/create', methods=['GET', 'POST'])
def create_word():
    """Create a new word analysis."""
    if request.method == 'POST':
        word = request.form.get('word')
        part_of_speech = request.form.get('part_of_speech')
        language = request.form.get('language', 'german')
        
        # Get JSON data from form
        json_data_str = request.form.get('json_data', '{}')
        
        try:
            # Parse JSON data
            json_data = json.loads(json_data_str)
            
            # Create new word analysis
            new_word = WordAnalysis(
                word=word, 
                part_of_speech=part_of_speech, 
                language=language,
                data=json_data
            )
            
            db.session.add(new_word)
            db.session.commit()
            flash('Word analysis created successfully', 'success')
            return redirect(url_for('admin.admin_dashboard'))
        except json.JSONDecodeError:
            flash('Invalid JSON data', 'error')
        except Exception as e:
            db.session.rollback()
            flash(f'Error creating word analysis: {str(e)}', 'error')
    
    return render_template('admin/create_word.html')

@admin_bp.route('/edit/<int:word_id>', methods=['GET', 'POST'])
def edit_word(word_id):
    """Edit an existing word analysis."""
    word_analysis = WordAnalysis.query.get_or_404(word_id)
    
    if request.method == 'POST':
        word_analysis.word = request.form.get('word')
        word_analysis.part_of_speech = request.form.get('part_of_speech')
        word_analysis.language = request.form.get('language', 'german')
        
        # Get JSON data from form
        json_data_str = request.form.get('json_data', '{}')
        
        try:
            # Parse JSON data
            json_data = json.loads(json_data_str)
            word_analysis.data = json_data
            
            db.session.commit()
            flash('Word analysis updated successfully', 'success')
            return redirect(url_for('admin.admin_dashboard'))
        except json.JSONDecodeError:
            flash('Invalid JSON data', 'error')
        except Exception as e:
            db.session.rollback()
            flash(f'Error updating word analysis: {str(e)}', 'error')
    
    return render_template('admin/edit_word.html', word=word_analysis)

@admin_bp.route('/delete/<int:word_id>', methods=['POST'])
def delete_word(word_id):
    """Delete a word analysis."""
    word_analysis = WordAnalysis.query.get_or_404(word_id)
    
    try:
        db.session.delete(word_analysis)
        db.session.commit()
        flash('Word analysis deleted successfully', 'success')
    except Exception as e:
        db.session.rollback()
        flash(f'Error deleting word analysis: {str(e)}', 'error')
    
    return redirect(url_for('admin.admin_dashboard'))
