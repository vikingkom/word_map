"""
Word analysis service implementation
"""
import os
import json
import requests
import logging
from typing import Dict, Any, Optional, List
from .prompts.word_analysis import SYSTEM_PROMPT

# Create logs directory if it doesn't exist
log_dir = os.path.join(os.path.dirname(os.path.dirname(__file__)), 'logs')
os.makedirs(log_dir, exist_ok=True)

# Configure main logger
logger = logging.getLogger(__name__)
logger.setLevel(logging.INFO)

# Clear any existing handlers to avoid duplication
if logger.handlers:
    logger.handlers.clear()

# Create file handler with UTF-8 encoding for full responses
file_handler = logging.FileHandler(os.path.join(log_dir, 'openai_responses.log'), encoding='utf-8')
file_handler.setLevel(logging.INFO)
file_formatter = logging.Formatter('%(asctime)s - %(name)s - %(levelname)s\n%(message)s\n')
file_handler.setFormatter(file_formatter)
logger.addHandler(file_handler)

# Create separate logger for arguments only
args_logger = logging.getLogger(f"{__name__}.arguments")
args_logger.setLevel(logging.INFO)

# Clear any existing handlers
if args_logger.handlers:
    args_logger.handlers.clear()

# Create file handler for arguments
args_handler = logging.FileHandler(os.path.join(log_dir, 'function_arguments.log'), encoding='utf-8')
args_handler.setLevel(logging.INFO)
args_formatter = logging.Formatter('%(asctime)s\n%(message)s\n')
args_handler.setFormatter(args_formatter)
args_logger.addHandler(args_handler)

# Ensure loggers don't propagate to avoid duplicate logs
logger.propagate = False
args_logger.propagate = False

class WordAnalysisService:
    """Service for analyzing German words using OpenAI"""
    
    def __init__(self):
        self.api_key = os.getenv('OPENAI_API_KEY')
        if not self.api_key:
            raise ValueError("OpenAI API key not found in environment variables")
            
        # Load the OpenAI function schema
        schema_path = os.path.join(os.path.dirname(__file__), 'schemas', 'word_openai_schema.json')
        with open(schema_path, 'r', encoding='utf-8') as f:
            self.function_schema = json.load(f)
    
    def _make_api_request(self, word: str) -> Dict[str, Any]:
        """Make the OpenAI API request"""
        headers = {
            "Authorization": f"Bearer {self.api_key}",
            "Content-Type": "application/json"
        }
        
        data = {
            "model": "gpt-3.5-turbo",
            "messages": [
                {"role": "system", "content": SYSTEM_PROMPT},
                {"role": "user", "content": f"Analyze the German word: {word}"}
            ],
            "functions": [self.function_schema],
            "function_call": {"name": "analyze_german_word"},
            "max_tokens": 1500
        }
        
        logger.info("Making API request with data:\n" + json.dumps(data, indent=2, ensure_ascii=False))
        
        response = requests.post(
            "https://api.openai.com/v1/chat/completions",
            headers=headers,
            json=data,
            timeout=20
        )
        
        response_data = response.json()
        logger.info("Received API response:\n" + json.dumps(response_data, indent=2, ensure_ascii=False))
        
        if response.status_code != 200:
            error_data = response_data
            error_message = error_data.get('error', {}).get('message', 'Unknown error')
            logger.error(f"API request failed with status {response.status_code}:\n{error_message}")
            raise ValueError(f"API request failed with status {response.status_code}: {error_message}")
        
        return response_data
    
    def _parse_api_response(self, response_data: Dict[str, Any], word: str) -> Dict[str, Any]:
        """Parse and validate the API response"""
        if not response_data.get('choices') or not response_data['choices'][0].get('message'):
            logger.error(f"Invalid response format from OpenAI API: {response_data}")
            raise ValueError("Invalid response format from OpenAI API")
        
        function_call = response_data['choices'][0]['message'].get('function_call')
        
        if not function_call or function_call['name'] != 'analyze_german_word':
            logger.error(f"Expected function call not found in response: {response_data}")
            raise ValueError("Expected function call not found in response")
        
        try:
            # Log just the arguments, properly formatted
            formatted_args = json.dumps(json.loads(function_call['arguments']), indent=2, ensure_ascii=False)
            args_logger.info(formatted_args)
            
            word_analysis = json.loads(function_call['arguments'])
        except json.JSONDecodeError as e:
            logger.error(f"Error parsing OpenAI response for word {word}: {str(e)}")
            logger.error(f"Raw response content: {function_call['arguments']}")
            raise ValueError(f"Could not parse function arguments as JSON: {str(e)}")
        
        # Ensure required fields are present
        required_fields = ['word', 'part_of_speech', 'meanings']
        for field in required_fields:
            if field not in word_analysis:
                word_analysis[field] = None if field != 'meanings' else []
        
        # Format the response
        formatted_response = {
            'word': word,
            'part_of_speech': word_analysis.get('part_of_speech', 'unknown'),
            'meanings': word_analysis.get('meanings', []),
            'grammar': word_analysis.get('grammar', {}),
            'data': word_analysis  # Store the full analysis
        }
        
        logger.info(f"Successfully analyzed word: {word}")
        
        return formatted_response
    
    def get_word_analysis(self, word: str, use_cache: bool = True) -> Dict[str, Any]:
        """
        Get detailed word analysis using OpenAI API
        
        Args:
            word: The German word to analyze
            use_cache: Whether to use cached results if available
        
        Returns:
            Dict containing the word analysis
            
        Raises:
            ValueError: If there's an error in the API response or validation
        """
        try:
            # Make API request
            response_data = self._make_api_request(word)
            
            # Parse and validate response
            return self._parse_api_response(response_data, word)
            
        except requests.exceptions.RequestException as e:
            logger.error(f"Network error during API request: {str(e)}")
            raise ValueError(f"Network error during API request: {str(e)}")
        except Exception as e:
            logger.error(f"Error analyzing word {word}: {str(e)}", exc_info=True)
            raise ValueError(f"Error analyzing word: {str(e)}")

# Initialize the service
word_analysis_service = WordAnalysisService()
