from flask import Blueprint
from flask_limiter import Limiter
from flask_limiter.util import get_remote_address
from utils import transform_keys_to_camel_case, fetch_data
from cache.cache import cache

api_stations = Blueprint('api', __name__)

# Configure rate limiting
limiter = Limiter(
    key_func=get_remote_address,
    default_limits=["200 per day", "50 per hour"]
)

# Hardcoded URL for station status data
STATION_STATUS_URL = "https://gbfs.bcycle.com/bcycle_madison/station_status.json"

@api_stations.route("/stations", methods=["GET"])
# Cache the response for 60 seconds
@cache.cached(timeout=60) 
# Limit this route to 100 requests per minute
@limiter.limit("100 per minute")
def get_stations():
    """Fetch and return all station statuses."""
    data = fetch_data(STATION_STATUS_URL)
    stations = data.get("data", {}).get("stations", [])
    
    return transform_keys_to_camel_case(stations)