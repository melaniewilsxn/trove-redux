from sqlalchemy_serializer import SerializerMixin
from sqlalchemy.ext.associationproxy import association_proxy
from sqlalchemy.ext.hybrid import hybrid_property

from config import db, bcrypt

class User(db.Model, SerializerMixin):
    __tablename__ = 'users'

    id = db.Column(db.Integer, primary_key=True)
    first_name = db.Column(db.String, nullable=False)
    last_name = db.Column(db.String, nullable=False)
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

class Genre(db.Model, SerializerMixin):
    __tablename__ = 'genres'
    serialize_rules = ('-books',)

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(255), unique=True, nullable=False)

    def __repr__(self):
        return f'<Genre {self.name}>'

class Book(db.Model, SerializerMixin):
    __tablename__ = 'books'
    serialize_rules = ('-genre.books',)

    id = db.Column(db.Integer, primary_key=True)
    isbn = db.Column(db.String, unique=True, nullable=False)
    title = db.Column(db.String, nullable=False)
    author = db.Column(db.String, nullable=False)
    publication_year = db.Column(db.Integer, nullable=False)
    summary = db.Column(db.Text, nullable=True)
    cover_image_url = db.Column(db.String, nullable=True)  # Stores the URL to a cover image

    genre_id = db.Column(db.Integer, db.ForeignKey('genres.id'), nullable=True)
    genre = db.relationship('Genre', backref='books')

    def __repr__(self):
        return f'<Book {self.title}, Author: {self.author}>'