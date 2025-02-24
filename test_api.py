import requests
import json

response = requests.post(
    'http://localhost:5000/api/analyze',
    json={'word': 'bevorstehen'},
    headers={'Content-Type': 'application/json'}
)

print(f"Status Code: {response.status_code}")
print(f"Response: {json.dumps(response.json(), indent=2)}")
