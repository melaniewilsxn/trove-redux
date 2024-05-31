# Standard library imports
from os import environ, path
from dotenv import load_dotenv

# Remote library imports
from flask import Flask, send_from_directory
from flask_cors import CORS
from flask_migrate import Migrate
from flask_bcrypt import Bcrypt
from flask_restful import Api
from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import MetaData

# Set the base directory to two levels up (root directory)
basedir = path.abspath(path.join(path.dirname(__file__), '..'))

# Load environment variables from the .env file located in the root directory
load_dotenv(path.join(basedir, '.env'))

app = Flask(__name__, static_folder="../client/build", static_url_path="/")
app.secret_key = environ.get('SECRET_KEY')
app.config['SQLALCHEMY_DATABASE_URI'] = environ.get('SQLALCHEMY_DATABASE_URI')
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = environ.get('SQLALCHEMY_TRACK_MODIFICATIONS') == 'True'
app.json.compact = False

# Define metadata, instantiate db
metadata = MetaData(naming_convention={
    "fk": "fk_%(table_name)s_%(column_0_name)s_%(referred_table_name)s",
})
db = SQLAlchemy(metadata=metadata)
migrate = Migrate(app, db)
db.init_app(app)

bcrypt = Bcrypt(app)

# Instantiate REST API
api = Api(app)

# Instantiate CORS
CORS(app)

# Serve React App
@app.route('/')
@app.route('/<path:path>')
def serve_react_app(path=""):
    if path and path != "favicon.ico":
        return send_from_directory(app.static_folder, path)
    else:
        return send_from_directory(app.static_folder, 'index.html')
