import os
import json
import requests
from dotenv import load_dotenv
from .prompts.word_analysis import SYSTEM_PROMPT

load_dotenv()

def get_word_analysis(word):
    """
    Get detailed word analysis using OpenAI API
    """
    try:
        api_key = os.getenv('OPENAI_API_KEY')
        if not api_key:
            raise Exception("API key not found in environment variables")

        # Load the JSON schema
        schema_path = os.path.join(os.path.dirname(__file__), 'schemas', 'word_analysis.json')
        with open(schema_path, 'r', encoding='utf-8') as f:
            schema = json.load(f)
            
        # Add the schema to the system prompt
        full_prompt = f"{SYSTEM_PROMPT}\n\nUse this exact JSON structure:\n{json.dumps(schema, indent=2)}"

        print(f"Analyzing word: {word}")
        
        # Make direct API request
        headers = {
            "Authorization": f"Bearer {api_key}",
            "Content-Type": "application/json"
        }
        
        data = {
            "model": "gpt-3.5-turbo",
            "messages": [
                {"role": "system", "content": full_prompt},
                {"role": "user", "content": f"Analyze the German word: {word}"}
            ],
            "temperature": 0.7,
            "max_tokens": 1000
        }
        
        response = requests.post(
            "https://api.openai.com/v1/chat/completions",
            headers=headers,
            json=data
        )
        
        if response.status_code != 200:
            raise Exception(f"API request failed with status {response.status_code}: {response.text}")
        
        response_data = response.json()
        print(f"Received response from API")
        
        # Extract the completion text from the response
        if response_data.get('choices') and len(response_data['choices']) > 0:
            content = response_data['choices'][0]['message']['content']
        else:
            raise Exception("No completion found in API response")
        
        # Ensure the response is valid JSON
        try:
            # Parse the content to ensure it's valid JSON
            parsed_content = json.loads(content)
            return parsed_content
        except json.JSONDecodeError as e:
            print(f"Error parsing JSON response: {e}")
            print(f"Raw response: {content}")
            raise Exception("Invalid JSON response from API")
        
    except Exception as e:
        print(f"Error in get_word_analysis: {str(e)}")
        raise Exception(f"Error getting word analysis: {str(e)}")
