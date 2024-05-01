from sqlalchemy_serializer import SerializerMixin
from sqlalchemy.ext.associationproxy import association_proxy
from sqlalchemy.ext.hybrid import hybrid_property
from sqlalchemy.orm import validates
import re
from datetime import datetime

from config import db, bcrypt

class User(db.Model, SerializerMixin):
    __tablename__ = 'users'

    id = db.Column(db.Integer, primary_key=True)
    first_name = db.Column(db.String(50), nullable=False)
    last_name = db.Column(db.String(50), nullable=False)
    username = db.Column(db.String(50), unique=True, nullable=False)
    email = db.Column(db.String(255), unique=True, nullable=False)
    _password_hash = db.Column(db.String)

    libraries = db.relationship('Library', back_populates='user')

    @hybrid_property
    def password(self):
        return self._password_hash
    
    @password.setter
    def password(self, plaintext_password):
        self.validate_password(plaintext_password)
        self._password_hash = bcrypt.generate_password_hash(plaintext_password).decode('utf-8')

    def authenticate(self, password):
        return bcrypt.check_password_hash(self._password_hash, password)
    
    @validates('email')
    def validate_email(self, key, address):
        if not re.match('^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$', address):
            raise ValueError("Invalid email address.")
        return address
    
    @validates('username')
    def validate_username(self, key, username):
        if not re.match('^\w+$', username):
            raise ValueError("Invalid username. Only letters, numbers and underscores are allowed.")
        return username
    
    @validates('password')
    def validate_password(self, password):
        if len(password) < 8:
            raise ValueError("Password must be at least 8 characters")
        if not any(char.isdigit() for char in password):
            raise ValueError("Password must contain a number")
        if not any(char.isupper() for char in password):
            raise ValueError("Password must contain an uppercase letter")
        if not any(char.islower() for char in password):
            raise ValueError("Password must contain a lowercase letter")
        return password

    def __repr__(self):
        return f'User {self.username}, ID {self.id}'

class Genre(db.Model, SerializerMixin):
    __tablename__ = 'genres'
    serialize_rules = ('-books',)

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(255), unique=True, nullable=False)

    def __repr__(self):
        return f'<Genre {self.name}>'

library_book = db.Table('library_book',
    db.Column('library_id', db.Integer, db.ForeignKey('libraries.id'), primary_key=True),
    db.Column('book_id', db.Integer, db.ForeignKey('books.id'), primary_key=True)
)

class Book(db.Model, SerializerMixin):
    __tablename__ = 'books'
    serialize_rules = ('-genre.books',)

    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(255), nullable=False)
    author = db.Column(db.String(255), nullable=False)
    publication_year = db.Column(db.Integer, nullable=False)
    summary = db.Column(db.Text, nullable=True)
    cover_image_url = db.Column(db.String, nullable=True)  # Stores the URL to a cover image

    genre_id = db.Column(db.Integer, db.ForeignKey('genres.id'), nullable=True)
    genre = db.relationship('Genre', backref='books')

    libraries = db.relationship('Library', secondary=library_book, back_populates='books')

    @validates('publication_year')
    def validate_publication_year(self, key, year):
        current_year = datetime.now().year
        if year > current_year:
            raise ValueError("Publication year cannot be in the future.")
        if year < 1450:
            raise ValueError("Publication year is unrealistically old.")
        return year
    
    @validates('cover_image_url')
    def validate_cover_image_url(self, key, url):
        if url and not re.match('^(https?://)\S+(\.\S+)$', url):
            raise ValueError("Invalid URL for the cover image.")
        return url
    
    def __repr__(self):
        return f'<Book {self.title}, Author: {self.author}>'

class Library(db.Model):
    __tablename__ = 'libraries'

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(255), nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)  # Links library to its creator/owner

    user = db.relationship('User', back_populates='libraries')
    books = db.relationship('Book', secondary=library_book, back_populates='libraries')