import os

class Config:
    MYSQL_HOST = os.getenv('MYSQL_HOST')
    MYSQL_USER = os.getenv('MYSQL_USER')
    MYSQL_PASSWORD = os.getenv('MYSQL_PASSWORD')
    MYSQL_DB = os.getenv('MYSQL_DB')
    # MYSQL_HOST = 'localhost'
    # MYSQL_USER = 'root'
    # MYSQL_PASSWORD = '12345678'
    # MYSQL_DB = 'flask_connection'
