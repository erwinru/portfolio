import os

class Config(object):
    DEBUG = False
    TESTING = False
    GITHUB_TOKEN = os.getenv('GITHUB_TOKEN')
    SQLALCHEMY_DATABASE_URI = os.getenv("SQLALCHEMY_DATABASE_URI")


class ProductionConfig(Config):
    SQLALCHEMY_DATABASE_URI = os.getenv("SQLALCHEMY_DATABASE_URI")
    SECRET_KEY = os.getenv("SECRET_KEY")


class DevelopmentConfig(Config):
    DEBUG = True

    SECRET_KEY = "dev"
