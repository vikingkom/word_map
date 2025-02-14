"""
Word analysis service implementation
"""
import os
import json
import requests
from typing import Dict, Any, Optional
from .prompts.word_analysis import SYSTEM_PROMPT

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
            "model": "gpt-3.5-turbo-0125",
            "messages": [
                {"role": "system", "content": SYSTEM_PROMPT},
                {"role": "user", "content": f"Analyze the German word: {word}"}
            ],
            "functions": [self.function_schema],
            "function_call": {"name": "analyze_german_word"},
            "temperature": 0.3,
            "max_tokens": 1500,
            "frequency_penalty": 0.3,
            "presence_penalty": 0.3
        }
        
        response = requests.post(
            "https://api.openai.com/v1/chat/completions",
            headers=headers,
            json=data,
            timeout=20
        )
        
        if response.status_code != 200:
            error_data = response.json()
            error_message = error_data.get('error', {}).get('message', 'Unknown error')
            raise ValueError(f"API request failed with status {response.status_code}: {error_message}")
        
        return response.json()
    
    def _parse_api_response(self, response_data: Dict[str, Any], word: str) -> Dict[str, Any]:
        """Parse and validate the API response"""
        if not response_data.get('choices') or not response_data['choices'][0].get('message'):
            raise ValueError("Invalid response format from OpenAI API")
        
        function_call = response_data['choices'][0]['message'].get('function_call')
        if not function_call or function_call['name'] != 'analyze_german_word':
            raise ValueError("Expected function call not found in response")
        
        try:
            word_analysis = json.loads(function_call['arguments'])
        except json.JSONDecodeError as e:
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
            raise ValueError(f"Network error during API request: {str(e)}")
        except Exception as e:
            raise ValueError(f"Error analyzing word: {str(e)}")

# Initialize the service
word_analysis_service = WordAnalysisService()
