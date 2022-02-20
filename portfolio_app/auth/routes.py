from flask import (
    Blueprint,
    flash,
    redirect,
    render_template,
    request,
    url_for,
)
from flask_login import login_user, current_user, logout_user
from portfolio_app import db, bcrypt
from portfolio_app.auth.forms import RegistrationForm, LoginForm
from portfolio_app.models import User

auth = Blueprint("auth", __name__, url_prefix="/auth")


@auth.route("/register", methods=["GET", "POST"])
def register_view():
    if current_user.is_authenticated:
        return redirect(url_for("main.home_view"))
    form = RegistrationForm()
    if form.validate_on_submit():
        hashed_password = bcrypt.generate_password_hash(
            form.password.data
        ).decode("utf-8")
        user = User(
            username=form.username.data,
            email=form.email.data,
            password=hashed_password,
        )
        db.session.add(user)
        db.session.commit()
        flash(
            "Your account has been created! You are now able to log in.",
            "success",
        )
        return redirect(url_for("auth.login_view"))

    return render_template("auth/register.html", form=form)


@auth.route("/login", methods=["GET", "POST"])
def login_view():
    form = LoginForm()
    if form.validate_on_submit():
        user = User.query.filter_by(email=form.email.data).first()
        if user and bcrypt.check_password_hash(
            user.password, form.password.data
        ):
            login_user(user)
            next_page = request.args.get("next")
            return (
                redirect(next_page)
                if next_page
                else redirect(url_for("main.home_view"))
            )
            flash("Login successful.", "success")
        else:
            flash(
                "Login Unsuccessful. Please check email and password",
                "danger",
            )

    return render_template("auth/login.html", form=form)


@auth.route("/logout")
def logout_view():
    logout_user()
    return redirect(url_for("main.home_view"))
