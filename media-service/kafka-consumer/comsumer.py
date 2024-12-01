from kafka import KafkaConsumer, KafkaProducer
import io, logging, boto3, os


logging.basicConfig(level=logging.INFO)
logger = logging.getLogger("KafkaWorker")


KAFKA_BROKER_URL =os.getenv("KAFKA_BROKER_URL", "localhost:9092")
KAFKA_UPLOAD_TOPIC = os.getenv("KAFKA_TOPIC", "image_uploads")

print(KAFKA_BROKER_URL)
compress_consumer = KafkaConsumer(
    KAFKA_UPLOAD_TOPIC,
    bootstrap_servers=KAFKA_BROKER_URL,
    value_deserializer=lambda x: x.decode("utf-8"),
    heartbeat_interval_ms=10000
)


def process_message(message):
    """
    Process the kafka message

    :params: message: the kafka message
    :return: None
    """

    try:
        logger.error(f"Process the messaeg {message}")
    except Exception as e:
        logger.error(f"Failed to process image {message}: {str(e)}")


def start_worker():

    logger.info("Kafka worker started, waiting for messages...")
    for message in compress_consumer:
        process_message(message.value)

if __name__ == "__main__":
    start_worker()