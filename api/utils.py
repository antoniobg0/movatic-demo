from flask import Flask
import requests

def fetch_data(url):
    try:
        response = requests.get(url)
        response.raise_for_status()
        return response.json()
    except requests.RequestException as e:
        return {"error": str(e)}

def to_camel_case(snake_str: str) -> str:
    snake_str = snake_str.replace("-", "_")
    components = snake_str.split("_")
    return components[0] + "".join(word.capitalize() for word in components[1:])

def transform_keys_to_camel_case(data):
    if isinstance(data, dict):
        return {to_camel_case(key): transform_keys_to_camel_case(value) for key, value in data.items()}
    elif isinstance(data, list):
        return [transform_keys_to_camel_case(item) for item in data]
    else:
        return data