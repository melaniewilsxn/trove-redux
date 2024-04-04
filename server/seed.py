#!/usr/bin/env python3

# Standard library imports
from random import randint, choice as rc

# Remote library imports
from faker import Faker

# Local imports
from app import app
from models import db, User, Genre

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
            "Young Adult (YA)", "Children's", "Biography/Autobiography", "Memoir",
            "Self-help", "Motivational", "Health & Wellness", "History", "True Crime",
            "Science", "Philosophy", "Travel", "Cookbooks/Food", "Art & Photography",
            "Personal Development", "Business & Finance", "Education", "Graphic Novels & Comics",
            "Poetry", "Essays", "Anthologies", "Religious/Spiritual", "LGBTQ+",
            "Cultural", "Political", "Crafts, Hobbies & Home", "Parenting & Relationships",
            "Climate Fiction (Cli-Fi)", "Urban Fantasy", "Cyberpunk", "Magical Realism",
            "New Adult (NA)", "Steampunk", "Dark Fantasy", "Paranormal"
        ]

        for genre_name in genres_list:
            genre = Genre(name=genre_name)
            db.session.add(genre)

        db.session.commit()
