


from PIL import Image
import io, logging
from minio import Minio



class Processor:

    def __init__(self, logger ):

        """
        """
        self.client = Minio("play.min.io",
            access_key="minioadmin",
            secret_key="minioadmin",
        )
        self.MINIO_BUCKET = 'filmy-image'
        self.logger = logger

    
    def upload(self, imageID):
        """
        Upload the compress image and save metadat in DB with ACID

        :param: filename: Raw image bytes, metadata: File metadata
        :return None
        """

        try:
            # response = s3_client.get_object(Bucket=CEPH_BUCKET, Key=image_id)
            response = self.client.get_object(Bucket=self.MINIO_BUCKET, Key=imageID)
            original_image = response["Body"].read()

            compressed_image =  self.compress_image(original_image)
            self.client.put_object(Bucket=self.MINIO_BUCKET, Key=imageID, Body=compressed_image)
            self.logger.info(f"Resized image saved as: {imageID}")
        except Exception as e:
            self.logger.error(f"Failed to process image {imageID}: {str(e)}")       


    def compress_image(self, image):
        """
        Compresses an image using lossless compression.

        :param image_data: Raw image bytes.
        :return: Compressed image bytes.
        """
        with Image.open(io.BytesIO(image)) as img:
            output = io.BytesIO()
            # Save image in the original format with optimization enabled
            img.save(output, format=img.format, optimize=True)
            output.seek(0)
            return output.getvalue()