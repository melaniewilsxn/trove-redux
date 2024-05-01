#!/usr/bin/env python3

from flask import request, session
from flask_restful import Resource
from sqlalchemy.exc import IntegrityError

from config import app, db, api
from models import User, Genre, Book

# Views go here!

class Signup(Resource):
    
    def post(self):

        request_json = request.get_json()

        first_name = request_json.get('firstName')
        last_name = request_json.get('lastName')
        email = request_json.get('email')
        username = request_json.get('username')
        password = request_json.get('password')

        user = User(
            username=username,
            email=email,
            first_name=first_name,
            last_name=last_name
        )

        user.password = password

        try:

            db.session.add(user)
            db.session.commit()

            session['user_id'] = user.id

            return user.to_dict(), 201

        except IntegrityError:

            return {'error': '422 Unprocessable Entity'}, 422

class CheckSession(Resource):
    def get(self):
        
        user_id = session['user_id']
        if user_id:
            user = User.query.filter(User.id == user_id).first()
            return user.to_dict(), 200
        
        return {}, 401

class Login(Resource):
    
    def post(self):

        request_json = request.get_json()

        username = request_json.get('username')
        password = request_json.get('password')

        user = User.query.filter(User.username == username).first()

        if user:
            if user.authenticate(password):

                session['user_id'] = user.id
                return user.to_dict(), 200

        return {'error': 'You have entered an invalid username or password.'}, 401

class Logout(Resource):
    def delete(self):
        session['user_id'] = None
        return {}, 204
    
class GenreIndex(Resource):
    def get(self):
        genres = [genre.to_dict() for genre in Genre.query.all()]
        return genres, 200

class BooksByGenre(Resource):
    def get(self, name):
        genre = Genre.query.filter_by(name=name).first()
        if genre:
            books = [book.to_dict() for book in Book.query.filter_by(genre_id = genre.id).all()]
            return books, 200
        return {'error': 'Genre not found'}, 404

class BookByID(Resource):
    def get(self, id):
        book = Book.query.filter_by(id=id).first()
        if book:
            return book.to_dict(), 200
        return {'error': 'Book not found'}, 404

api.add_resource(Signup, '/signup', endpoint='signup')
api.add_resource(CheckSession, '/check_session', endpoint='check_session')
api.add_resource(Login, '/login', endpoint='login')
api.add_resource(Logout, '/logout', endpoint='logout')
api.add_resource(GenreIndex, '/genres', endpoint='genres')
api.add_resource(BooksByGenre, '/genres/<string:name>', endpoint="books_by_genre")
api.add_resource(BookByID, '/books/<int:id>', endpoint='book_by_id')


if __name__ == '__main__':
    app.run(port=5555, debug=True)

