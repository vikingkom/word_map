from flask import Blueprint, render_template, request, redirect, url_for, flash, current_app
from backend.models import WordAnalysis
from backend import db

admin_bp = Blueprint('admin', __name__, url_prefix='/admin')

@admin_bp.route('/')
def admin_dashboard():
    """Admin dashboard showing list of word analyses."""
    print("Admin dashboard route hit!")  # Debug print
    current_app.logger.info("Admin dashboard route accessed")
    try:
        words = WordAnalysis.query.all()
        print(f"Found {len(words)} words")  # Debug print
    except Exception as e:
        print(f"Error querying words: {e}")  # Debug print
        words = []
    return render_template('admin/dashboard.html', words=words)

@admin_bp.route('/create', methods=['GET', 'POST'])
def create_word():
    """Create a new word analysis."""
    if request.method == 'POST':
        word = request.form.get('word')
        part_of_speech = request.form.get('part_of_speech')
        language = request.form.get('language', 'german')
        
        # Basic validation
        if not word or not part_of_speech:
            flash('Word and Part of Speech are required', 'error')
            return redirect(url_for('admin.create_word'))
        
        # Create new word analysis
        new_word = WordAnalysis(
            word=word, 
            part_of_speech=part_of_speech, 
            language=language
        )
        
        try:
            db.session.add(new_word)
            db.session.commit()
            flash('Word analysis created successfully', 'success')
            return redirect(url_for('admin.admin_dashboard'))
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
        
        try:
            db.session.commit()
            flash('Word analysis updated successfully', 'success')
            return redirect(url_for('admin.admin_dashboard'))
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
