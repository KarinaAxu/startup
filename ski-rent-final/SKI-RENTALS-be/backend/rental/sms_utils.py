from django.conf import settings
import logging
logger = logging.getLogger(__name__)

def send_sms(to_number: str, message: str):
    """
    Если TWILIO настроен — используем его. Иначе — логируем (dev fallback).
    """
    if getattr(settings, 'SMS_USE_TWILIO', False):
        from twilio.rest import Client
        client = Client(settings.TWILIO_ACCOUNT_SID, settings.TWILIO_AUTH_TOKEN)
        from_number = settings.TWILIO_FROM_NUMBER
        msg = client.messages.create(body=message, from_=from_number, to=str(to_number))
        return msg.sid
    else:
        logger.info("SMS (dev) to %s: %s", to_number, message)
        return "console-fallback"
