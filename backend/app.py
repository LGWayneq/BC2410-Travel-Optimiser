from flask import Flask
from flask_cors import CORS

from gurobi.controller import gurobi_blueprint

app = Flask(__name__)
CORS(app)
app.register_blueprint(gurobi_blueprint, url_prefix='/gurobi')

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=80)
