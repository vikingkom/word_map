# Word Map

An interactive application for learning words with detailed linguistic analysis powered by ChatGPT.

## Features
- Word analysis with detailed grammatical information
- Multi-language support (German, English, Russian)
- Interactive examples and translations
- Smart caching for better performance
- Progress tracking
- Visual learning aids

## Setup

### Backend (Python)
1. Create a virtual environment:
```bash
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
```

2. Install dependencies:
```bash
pip install -r requirements.txt
```

3. Set up environment variables:
Create a `.env` file with:
```
OPENAI_API_KEY=your_api_key_here
DATABASE_URL=postgresql://user:password@localhost:5432/word_map
```

4. Initialize the database:
```bash
flask db upgrade
```

### Frontend (React)
1. Install dependencies:
```bash
cd frontend
npm install
```

2. Start development server:
```bash
npm start
```

## Development

The project uses:
- Python/Flask for backend
- React for frontend
- PostgreSQL for data storage
- OpenAI API for word analysis
