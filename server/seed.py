#!/usr/bin/env python3

# Standard library imports
from random import randint, choice as rc

# Remote library imports
from faker import Faker

# Local imports
import requests
from app import app
from models import db, User, Genre, Book

books_list = [
    {
        "isbn": "1635575567",
        "title": "Court of Thorns and Roses",
        "author": "Sarah J. Maas",
        "publication_year": 2015,
        "summary": "When nineteen-year-old huntress Feyre kills a wolf in the woods, a terrifying creature arrives to demand retribution. Dragged to a treacherous magical land she knows about only from legends, Feyre discovers that her captor is not truly a beast, but one of the lethal, immortal faeries who once ruled her world. \nAt least, he's not a beast all the time. \nAs she adapts to her new home, her feelings for the faerie, Tamlin, transform from icy hostility into a fiery passion that burns through every lie she's been told about the beautiful, dangerous world of the Fae. But something is not right in the faerie lands. An ancient, wicked shadow is growing, and Feyre must find a way to stop it, or doom Tamlin-and his world-forever.",
        "cover_image_url": "https://ia600505.us.archive.org/view_archive.php?archive=/35/items/l_covers_0014/l_covers_0014_42.zip&file=0014429818-L.jpg",
        "genre": "Fantasy"
    },
    # Add more books as needed
]

def manually_add_books(books_list):
    for book_data in books_list:
        genre_name = book_data.pop("genre", None) # Remove genre from book_data and hold it
        genre = Genre.query.filter_by(name=genre_name).first() # Find the genre by name

        if genre is None:
            print(f"Genre '{genre_name}' not found. Skipping book '{book_data.get('title')}'.")
            continue

        # Check if the book already exists to avoid duplicates
        existing_book = Book.query.filter_by(isbn=book_data["isbn"]).first()
        if not existing_book:
            book = Book(**book_data, genre_id=genre.id)  # Assume your Book model uses genre_id
            db.session.add(book)
    db.session.commit()

if __name__ == '__main__':
    fake = Faker()
    with app.app_context():
        print("Starting seed...")
        
        User.query.delete()

        # make sure users have unique usernames
        users = []
        usernames = []

        for i in range(20):
        
            username = fake.first_name()
            while username in usernames:
                username = fake.first_name()
            usernames.append(username)

            user = User(
                username=username,
                first_name = fake.first_name(),
                last_name = fake.last_name(),
                email=fake.email(),
                image_url=fake.url(),
            )

            user.password = user.username + 'password'

            users.append(user)

        db.session.add_all(users)
        db.session.commit()

        genres_list = [
            "Literary Fiction", "Mystery", "Thriller", "Horror", "Historical Fiction",
            "Romance", "Science Fiction", "Fantasy", "Dystopian", "Adventure",
            "Young Adult (YA)", "Children's", "Biography/ Autobiography", "Memoir",
            "Self-help", "Motivational", "Health & Wellness", "History", "True Crime",
            "Science", "Philosophy", "Travel", "Cookbooks/Food", "Art & Photography",
            "Personal Development", "Business & Finance", "Education", "Graphic Novels & Comics",
            "Poetry", "Essays", "Anthologies", "Religious/Spiritual", "LGBTQ+",
            "Cultural", "Political", "Crafts, Hobbies & Home", "Parenting & Relationships",
            "Climate Fiction (Cli-Fi)", "Urban Fantasy", "Cyberpunk", "Magical Realism",
            "New Adult (NA)", "Steampunk", "Dark Fantasy", "Paranormal"
        ]

        for genre_name in genres_list:
            existing_genre = Genre.query.filter_by(name=genre_name).first()
            if not existing_genre:  # Only add the genre if it doesn't exist
                genre = Genre(name=genre_name)
                db.session.add(genre)

        db.session.commit()

        manually_add_books(books_list)
        print("Books have been added to the database.")