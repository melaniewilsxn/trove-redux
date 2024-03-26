#!/usr/bin/env python3

# Standard library imports
from random import randint, choice as rc

# Remote library imports
from faker import Faker

# Local imports
from app import app
from models import db, User

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
                email=fake.email(),
                image_url=fake.url(),
            )

            user.password = user.username + 'password'

            users.append(user)

        db.session.add_all(users)
        db.session.commit()
