from flask import Blueprint, jsonify

main_bp = Blueprint('main_bp', __name__) # Ensure blueprint name is consistent

@main_bp.route('/health', methods=['GET']) # Route will be /api/health due to url_prefix
def health_check():
    return jsonify({'status': 'healthy', 'message': 'Backend is running!'})
