from flask import Flask
from flask_cors import CORS
from stations.stations import api_stations, limiter
from cache.cache import cache

# Create the Flask app
app = Flask(__name__)

# Register the blueprint
app.register_blueprint(api_stations, url_prefix='/api')

# Initialize cache and limiter with the app
cache.init_app(app)

# Intialize the limiter with the app
limiter.init_app(app)

# Enable CORS for all routes
CORS(app, resources={r"/*": {"origins": "http://localhost:3000"}})

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=7001, debug=True)