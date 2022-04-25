// nodemailer outlook settings
exports.SMTP_PORT = 25
exports.SMTP_HOST = '10.185.232.39'
exports.SMTP_USER = 'abdumalik.imenov@optimabank.kg'
exports.SMTP_TITLE_URL = 'http://localhost:3000/api/mail/message'
exports.SMTP_TO_MAIL = 'abdumalik.imenov@optimabank.kg'

// rabbit api
exports.RABBIT_URL = 'amqp://guest:guest@10.185.233.241:5672'
exports.RABBIT_URL_ADMIN = 'http://guest:guest@10.185.233.241:15672/api/queues'
exports.DEV_PORT = 3000