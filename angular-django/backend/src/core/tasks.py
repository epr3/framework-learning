from celery.decorators import task
from celery.utils.log import get_task_logger

logger = get_task_logger(__name__)


@task(name="test")
def send_feedback_email_task():
    logger.info("test")
