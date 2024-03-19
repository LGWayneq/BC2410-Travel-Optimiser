import csv
import json
import requests
from bson import json_util
from response import make_json_response

def endpoint():
    return make_json_response(json_util.dumps([]), 200)
