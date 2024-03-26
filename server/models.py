from sqlalchemy_serializer import SerializerMixin
from sqlalchemy.ext.associationproxy import association_proxy
from sqlalchemy.ext.hybrid import hybrid_property

from config import db, bcrypt

class User(db.Model, SerializerMixin):
    __tablename__ = 'users'

    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String, unique=True, nullable=False)
    email = db.Column(db.String, unique=True, nullable=False)
    _password_hash = db.Column(db.String)
    image_url = db.Column(db.String)

    @hybrid_property
    def password(self):
        return self._password_hash
    
    @password.setter
    def password(self, plaintext_password):
        self._password_hash = bcrypt.generate_password_hash(plaintext_password).decode('utf-8')

    def authenticate(self, password):
        return bcrypt.check_password_hash(self._password_hash, password)

    def __repr__(self):
        return f'User {self.username}, ID {self.id}'