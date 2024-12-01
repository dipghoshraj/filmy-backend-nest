from minio import Minio
from minio.error import S3Error
import uuid, sys
from app.config import Config
from app.model import db
from app.model.Image import Image
from app.model.ImageMetadata import ImageMetadata
from io import BytesIO

class Uploader:

    def __init__(self):
        self.client = Minio("minio:9000",access_key="minioadmin",secret_key="minioadmin", secure=False)

    def fetch(self, image_key):
        """
        """
        meta_data = db.session.query(ImageMetadata).filter(ImageMetadata.key == image_key).first()
        return meta_data
    
    def get_image(self, image_key):
        """
        """

        meta_data = db.session.query(ImageMetadata).filter(ImageMetadata.key == image_key).first()
        original_image = self.client.get_object(bucket_name=meta_data.file_bucket, object_name=meta_data.key)
        return original_image


    def upload_iamge(self, file, user_id: str, post_id: str = None):

        key =uuid.uuid4().hex
        file_name = key + file.filename
        extension = file.filename.split('.')[1]


        # if bucket is not present then create one
        found = self.client.bucket_exists(Config.BUCKET_NAME)
        if not found: self.client.make_bucket(Config.BUCKET_NAME)

        try:
            file_stream = BytesIO(file.read())
            meta_data = ImageMetadata(key=file_name, size= sys.getsizeof(file_stream), extension=extension)
            db.session.add(meta_data)
            db.session.flush()


            image = Image(name= file_name, url ="" , user_id= user_id, image_matadata_id=meta_data.id)
            db.session.add(image)
            db.session.flush()
            sys.getsizeof(file_stream)/2

            pobj = self.client.put_object(bucket_name=Config.BUCKET_NAME, object_name=file_name, data=file_stream, length=-1, part_size=10*1024*1024, content_type=file.content_type)
            
            meta_data.image_id =image.id
            meta_data.etag = pobj.etag
            meta_data.version = pobj.version_id
            meta_data.file_bucket= pobj.bucket_name

            db.session.commit()
            return {"image": file_name}
        except Exception as e:
            self.client.remove_object(Config.BUCKET_NAME, file_name)
            db.session.rollback()
            raise Exception(f"An error occurred of image add {e.__repr__()}")
        finally:
            # Ensure the session is closed even if there's an error
            db.session.remove()

