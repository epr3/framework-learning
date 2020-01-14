from celery.decorators import task
from celery.utils.log import get_task_logger
from django.core.mail import send_mail
from django.conf import settings

logger = get_task_logger(__name__)


@task(name="test")
def send_feedback_email_task(email, token):
    logger.info("mail sent")
    send_mail(
        'Password reset',
        f'Reset your password at: {settings.FRONTEND_URL}/reset-password?email={email}&token={token}',
        settings.EMAIL_USER,
        [email],
        fail_silently=False,
    )
