import datetime
from app.model import db


class ImageMetadata(db.Model):
    __tablename__ = 'ImageMetadata'
    id = db.Column(db.Integer, primary_key=True)
    key = db.Column(db.String)
    file_bucket = db.Column(db.String, nullable=False)
    upload_time = db.Column(db.DateTime, default=datetime.datetime.now())
    size = db.Column(db.Integer)
    extension = db.Column(db.String)
    etag = db.Column(db.String)
    version = db.Column(db.String)
    image_id = db.Column(db.Integer, db.ForeignKey('Image.id'))  # Foreign key to User

    def __repr__(self):
        return f"<ImageMetadate {self.key}>"