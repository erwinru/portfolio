import os
import json

with open("/etc/config.json") as config_file:
     config = json.load(config_file)

class Config(object):
    DEBUG = False
    TESTING = False
    SECRET_KEY = config.get("SECRET_KEY")
    APP_PATH = os.path.dirname(os.path.realpath(__file__))
    BLOG_UPLOADS = f"{APP_PATH}/portfolio_app/static/images/blog_uploads"
    PROJECT_UPLOADS = f"{APP_PATH}/portfolio_app/static/images/projects"
    IMAGES_PATH = "http://localhost:5000/static/images"
    IMAGE_UPLOADS_REL = "http://localhost:5000/static/images/blog_uploads"
    GITHUB_TOKEN = config.get("GITHUB_TOKEN")
    SQLALCHEMY_DATABASE_URI = config.get("SQLALCHEMY_DATABASE_URI")


class ProductionConfig(Config):
    pass


class DevelopmentConfig(Config):
    DEBUG = True
    APP_PATH = os.path.dirname(os.path.realpath(__file__))

    SECRET_KEY = "dev"

    BLOG_UPLOADS = f"{APP_PATH}/portfolio_app/static/images/blog_uploads"


class TestingConfig(Config):
    TESTING = True
