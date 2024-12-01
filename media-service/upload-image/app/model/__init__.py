from flask_sqlalchemy import SQLAlchemy


db = SQLAlchemy()

# model ImageMetadata{
#   id Int @default(autoincrement()) @id
#   key String
#   file_path String
#   upload_time DateTime?
#   image_id Int
#   image Image?
# }