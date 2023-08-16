from flask import Blueprint, request, jsonify
from flask_sqlalchemy import SQLAlchemy
from flask_login import LoginManager  # Import only LoginManager here

db = SQLAlchemy()
login_manager = LoginManager()

auth_bp = Blueprint('auth', __name__)

@login_manager.user_loader
def load_user(user_id):
    return User.query.get(int(user_id))

@auth_bp.route('/login', methods=['POST'])
def login():
    data = request.json
    username = data.get('username')
    password = data.get('password')
    user = User.query.filter_by(username=username).first()

    if not user or not check_password_hash(user.password, password):
        return jsonify({'message': 'Invalid username or password'}), 401

    login_user(user)
    return jsonify({'message': 'Logged in successfully'})

@auth_bp.route('/logout', methods=['POST'])
def logout():
    logout_user()
    return jsonify({'message': 'Logged out successfully'})

@auth_bp.route('/current_user', methods=['GET'])
def current_logged_user():
    if current_user.is_authenticated:
        return jsonify({'username': current_user.username})
    return jsonify({'message': 'No user logged in'}), 401

@auth_bp.route('/', methods=['GET'])
def index():
    return 'Hello World!'

