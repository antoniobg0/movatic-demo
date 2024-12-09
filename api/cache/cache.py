from flask_caching import Cache
from dotenv import load_dotenv
import os

load_dotenv()

# Configure Redis cache using environment variables
cache = Cache(config={
    'CACHE_TYPE': os.getenv('CACHE_TYPE'),
    'CACHE_REDIS_HOST': os.getenv('CACHE_REDIS_HOST'),
    'CACHE_REDIS_PORT': os.getenv('CACHE_REDIS_PORT'),
    'CACHE_REDIS_DB': os.getenv('CACHE_REDIS_DB'),
    'CACHE_REDIS_URL': os.getenv('CACHE_REDIS_URL')
})