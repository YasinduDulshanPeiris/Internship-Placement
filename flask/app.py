from flask import Flask, render_template, jsonify
from flask_cors import CORS
import requests

app = Flask(__name__)
CORS(app)  # Enable CORS for all routes

# Replace this with your actual API URL
DIRECT_LINE_TOKEN_URL = "https://default534253fcdfb6462fb5cacbe81939f5.ee.environment.api.powerplatform.com/powervirtualagents/botsbyschema/crad5_internshipPlacementAgent/directline/token?api-version=2022-03-01-preview"

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/get_token')
def get_token():
    try:
        response = requests.get(DIRECT_LINE_TOKEN_URL)
        response.raise_for_status()  # Raise an exception for bad status codes
        data = response.json()
        return jsonify({"token": data.get("token")})
    except Exception as e:
        return jsonify({"error": str(e)}), 500

if __name__ == '__main__':
    app.run(host='127.0.0.1', port=5002, debug=True)