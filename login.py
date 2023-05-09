import hashlib

from flask import Flask, render_template, request
from flask_sqlalchemy import SQLAlchemy

login = Flask(__name__)
login.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///test.db'
db = SQLAlchemy(login)


class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String(120), unique=True, nullable=False)
    password = db.Column(db.String(32), nullable=False)


@login.route('/')
def index():
    return render_template('login.html')


@login.route('/signup', methods=['GET', 'POST'])
def signup():
    if request.method == 'POST':
        email = request.form['email']
        password = request.form['password']
        confirm_password = request.form['confirm_password']

        if confirm_password == password:
            hashed_password = hashlib.md5(password.encode()).hexdigest()
            user = User(email=email, password=hashed_password)
            db.session.add(user)
            db.session.commit()
            return f'User {email} has been registered successfully'
        else:
            return 'Passwords do not match'

    return render_template('login.html')


@login.route('/login', methods=['GET', 'POST'])
def login():
    if request.method == 'POST':
        email = request.form['email']
        password = request.form['password']
        hashed_password = hashlib.md5(password.encode()).hexdigest()

        user = User.query.filter_by(email=email).first()

        if user and user.password == hashed_password:
            return f'Welcome, {email}!'
        else:
            return 'Login failed. Please check your email and password.'

    return render_template('login.html')


if __name__ == '__main__':
    db.create_all()
    login.run(debug=True)
