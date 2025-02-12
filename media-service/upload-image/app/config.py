import os
my_variable = os.environ.get('MY_VARIABLE')

class Config:
    SQLALCHEMY_DATABASE_URI = os.environ.get('SQLALCHEMY_DATABASE_URI', 'postgresql://postgres:dipghosh099@host.docker.internal:5432/fimlydb_2024')
    SQLALCHEMY_TRACK_MODIFICATIONS = False
    BUCKET_NAME = os.environ.get('BUCKET_NAME', 'filmy')
    MINIO_HOST = os.environ.get('MINIO_HOST', 'localhost:9000')
    MINIO_ACCESS_KEY = os.environ.get('MINIO_ACCESS_KEY', 'minioadmin')
    MINIO_ACCESS_SECRET = os.environ.get('MINIO_ACCESS_SECRET', 'minioadmin')
