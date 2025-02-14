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
        if not response_data.get('choices') or not response_data['choices'][0].get('message'):
            raise Exception("Invalid response format from OpenAI API")
            
        content = response_data['choices'][0]['message']['content']
        
        # Try to parse the response as JSON
        try:
            word_analysis = json.loads(content)
        except json.JSONDecodeError:
            # If the response isn't valid JSON, try to extract JSON from the text
            start = content.find('{')
            end = content.rfind('}') + 1
            if start >= 0 and end > start:
                try:
                    word_analysis = json.loads(content[start:end])
                except json.JSONDecodeError:
                    raise Exception("Could not parse OpenAI response as JSON")
            else:
                raise Exception("Could not find JSON content in OpenAI response")
        
        # Ensure the response matches our expected format
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
        
    except Exception as e:
        print(f"Error getting word analysis: {str(e)}")
        raise Exception(f"Error getting word analysis: {str(e)}")
