from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_bcrypt import Bcrypt
from flask_login import LoginManager
from portfolio_app.config import DevelopmentConfig, ProductionConfig


db = SQLAlchemy()
bcrypt = Bcrypt()
login_manager = LoginManager()
login_manager.login_view = "auth.login_view"


def create_app(config=DevelopmentConfig):
    app = Flask(__name__, instance_relative_config=True)
    app.config.from_object(config)

    db.init_app(app)
    bcrypt.init_app(app)
    login_manager.init_app(app)

    from portfolio_app.auth.routes import auth
    from portfolio_app.blog.routes import blog
    from portfolio_app.main.routes import main

    app.register_blueprint(auth)
    app.register_blueprint(blog)
    app.register_blueprint(main)
    app.add_url_rule("/", endpoint="index")

    return app
