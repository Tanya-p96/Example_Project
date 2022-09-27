from flask import Flask
import db
from controllers import items, inventory
import os


def create_app():
    app = Flask(__name__)
    app.config["MONGO_URI"] = os.environ["MONGO_URI"]
    db.mongo.init_app(app)

    # Add the articles collection if it doesn't already exist
    if not "schema" in db.mongo.db.list_collection_names():
        schema = db.mongo.db["schema"]

    app.url_map.strict_slashes = False
    app.register_blueprint(items, url_prefix="/api/items")
    app.register_blueprint(inventory, url_prefix="/api/inventory")
    return app
