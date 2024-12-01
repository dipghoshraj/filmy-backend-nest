import datetime
from app.model import db



# model Image{
#   id Int @default(autoincrement()) @id
#   name String?
#   url String?
#   user_id Int
#   post_id Int?
#   image_matadata_id Int @unique
#   post Post? @relation(fields: [post_id], references: [id])
#   user user @relation(fields: [user_id], references: [id])
#   imageMeatadata ImageMetadata @relation(fields: [image_matadata_id], references: [id])
# }


class Image(db.Model):

    __tablename__ = 'Image'
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String)
    url = db.Column(db.String)
    user_id = db.Column(db.Integer, nullable=False)  # Foreign key to User
    post_id = db.Column(db.Integer, nullable=True)  # Foreign key to Post
    image_matadata_id = db.Column(db.Integer, db.ForeignKey('ImageMetadata.image_id')) # Foreign key to metadata

    def __repr__(self):
        return f"<Image {self.id}>"
