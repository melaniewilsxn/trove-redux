from sqlalchemy_serializer import SerializerMixin
from sqlalchemy.ext.associationproxy import association_proxy
from sqlalchemy.ext.hybrid import hybrid_property
from sqlalchemy.orm import validates
import re
from datetime import datetime, timezone

from config import db, bcrypt

class User(db.Model, SerializerMixin):
    __tablename__ = 'users'
    serialize_rules = ('-_password_hash', '-reviews', '-libraries')

    id = db.Column(db.Integer, primary_key=True)
    first_name = db.Column(db.String(50), nullable=False)
    last_name = db.Column(db.String(50), nullable=False)
    username = db.Column(db.String(50), unique=True, nullable=False)
    email = db.Column(db.String(255), unique=True, nullable=False)
    _password_hash = db.Column(db.String)

    # Relationship mapping the user to related libraries
    libraries = db.relationship('Library', back_populates='user')

    # Relationship mapping the user to related reviews
    reviews = db.relationship('Review', back_populates='user', cascade='all, delete-orphan')

    # Association proxy to get books for this user through reviews
    books = association_proxy('reviews', 'book', creator=lambda book_obj: Review(book=book_obj))

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

    # Relationship mapping the genre to related books
    books = db.relationship('Book', back_populates='genre')

    def __repr__(self):
        return f'<Genre {self.name}>'

library_book = db.Table('library_book',
    db.Column('library_id', db.Integer, db.ForeignKey('libraries.id'), primary_key=True),
    db.Column('book_id', db.Integer, db.ForeignKey('books.id'), primary_key=True)
)

class Book(db.Model, SerializerMixin):
    __tablename__ = 'books'
    serialize_rules = ('-genre.books', '-reviews', '-libraries')

    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(255), nullable=False)
    author = db.Column(db.String(255), nullable=False)
    publication_year = db.Column(db.Integer, nullable=False)
    summary = db.Column(db.Text, nullable=True)
    cover_image_url = db.Column(db.String, nullable=True)  # Stores the URL to a cover image

    genre_id = db.Column(db.Integer, db.ForeignKey('genres.id'), nullable=True)

    # Relationship mapping the book to related genre
    genre = db.relationship('Genre', back_populates='books')

    # Relationship mapping the book to related libraries
    libraries = db.relationship('Library', secondary=library_book, back_populates='books')

    # Relationship mapping the book to related reviews
    reviews = db.relationship('Review', back_populates='book', cascade='all, delete-orphan')

    # Association proxy to get books for this user through reviews
    users = association_proxy('reviews', 'user', creator=lambda user_obj: Review(user=user_obj))

    def __repr__(self):
        return f'<Book: {self.title}, Author: {self.author}>'

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

class Library(db.Model, SerializerMixin):
    __tablename__ = 'libraries'
    serialize_rules = ('-user.libraries', '-books.libraries', '-user', '-books')

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(255), nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)  # Links library to its creator/owner

    # Relationship mapping the library to related user
    user = db.relationship('User', back_populates='libraries')

    # Relationship mapping the library to related books
    books = db.relationship('Book', secondary=library_book, back_populates='libraries')

class Review(db.Model, SerializerMixin):
    __tablename__ = 'reviews'
    serialize_rules = ('-user.libraries', '-book')

    id = db.Column(db.Integer, primary_key=True)
    rating = db.Column(db.Integer, nullable=False)
    mood = db.Column(db.String(50), nullable=False)
    pace = db.Column(db.String(50), nullable=False)
    comment = db.Column(db.String)
    created_at = db.Column(db.DateTime, default=lambda: datetime.now(tz=timezone.utc), nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    book_id = db.Column(db.Integer, db.ForeignKey('books.id'), nullable=False)

    # Relationship mapping the review to related user
    user = db.relationship('User', back_populates='reviews')

    # Relationship mapping the review to related book
    book = db.relationship('Book', back_populates='reviews')

    @validates('rating')
    def validate_rating(self, key, rating):
        if not (1 <= rating <= 5):
            raise ValueError("Rating must be between 1 and 5.")
        return rating
    
    @validates('user_id')
    def validate_user_id(self, key, user_id):
        user = User.query.filter_by(id=user_id).first()
        if not user:
            raise ValueError("Invalid user.")
        return user_id
    
    @validates('book_id')
    def validate_book_id(self, key, book_id):
        book = Book.query.filter_by(id=book_id).first()
        if not book:
            raise ValueError("Invalid book.")
        return book_id