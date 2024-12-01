from io import BytesIO
from flask import Blueprint, request, Response, jsonify, send_file
from app.model.ImageMetadata import ImageMetadata
from app.concern.minio_upload import Uploader
import sys

upload_blueprint = Blueprint('upload_bp', __name__, url_prefix='/api/v1/image')

@upload_blueprint.route('/')
def index():
    return jsonify({}, 200)


@upload_blueprint.route('/upload', methods=['POST'])
def upload():
    file = request.files['file']
    print(request.form.get('user_id'))
    user_id = request.form.get('user_id')

    client = Uploader()
    print(file)
    upload_data = client.upload_iamge(file, user_id)
    return jsonify(upload_data, 201)


@upload_blueprint.route('/fetch/<image_id>', methods=['GET'])
def fetch_image(image_id):

    client = Uploader()
    meta_data =  client.fetch(image_id)
    return jsonify({"key": meta_data.key,"bucket": meta_data.file_bucket, "size": meta_data.size }), 200


@upload_blueprint.route('/get/<image_id>', methods=['GET'])
def get_image(image_id):
    """"""

    try:
        client = Uploader()
        original_image = client.get_image(image_id)
        return send_file(original_image, mimetype=original_image.headers['Content-Type'])
    except Exception as e:
        # Handle exceptions, e.g., log the error and return an error response
        print(f"Error retrieving object: {e}")
        return "Error retrieving object", 500
