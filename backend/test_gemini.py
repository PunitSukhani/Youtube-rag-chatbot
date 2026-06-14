import os
from google import genai
from dotenv import load_dotenv

# 1. Load the environmental variables from the .env file
load_dotenv()

# Double check that the key exists
if not os.getenv("GEMINI_API_KEY"):
    raise ValueError("GEMINI_API_KEY is not set in the environment or .env file.")

# 2. Initialize the client (it automatically picks up GEMINI_API_KEY from the environment)
client = genai.Client()

# 3. Call the model (use "gemini-2.5-flash")
print("Sending test request to Gemini using the new SDK...")
response = client.models.generate_content(
    model='gemini-2.5-flash',
    contents='Write a 1-sentence joke about a programmer.'
)

print("\nResponse from Gemini:")
print(response.text)
