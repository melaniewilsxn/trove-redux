#!/usr/bin/env python3

from flask import request, session
from flask_restful import Resource
from sqlalchemy.exc import IntegrityError

from config import app, db, api
from models import User, Genre, Book, Library, Review

# Views go here!

class Signup(Resource):
    
    def post(self):
        try:
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

            db.session.add(user)
            db.session.commit()

            session['user_id'] = user.id

            return user.to_dict(), 201

        except ValueError as e:
            db.session.rollback()
            return {'error': str(e)}, 400
        except IntegrityError:
            db.session.rollback()
            return {'error': 'Username or email already exists.'}, 422
        except Exception as e:
            db.session.rollback()
            return {'error': 'Internal server error'}, 500

class CheckSession(Resource):
    def get(self):
        
        user_id = session.get('user_id')
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
        session.clear()
        return {}, 204
    
class GenreIndex(Resource):
    def get(self):
        genres = [genre.to_dict() for genre in Genre.query.all()]
        return genres, 200

class BooksByGenre(Resource):
    def get(self, name):
        genre = Genre.query.filter_by(name=name).first()
        if genre:
            books = [book.to_dict() for book in genre.books]
            return books, 200
        return {'error': 'Genre not found'}, 404

class BookIndex(Resource):
    def get(self):
        books = [book.to_dict() for book in Book.query.all()]
        return books, 200

    def post(self):
        try:
            request_json = request.get_json()

            title = request_json.get('title')
            author = request_json.get('author')
            publication_year = request_json.get('publicationYear')
            genre_name = request_json.get('genre')
            summary = request_json.get('summary')
            cover_image_url = request_json.get('coverImageURL')

            genre = Genre.query.filter_by(name=genre_name).first()

            book = Book(
                title=title,
                author=author,
                publication_year=publication_year,
                summary=summary,
                cover_image_url=cover_image_url,
            )

            book.genre_id = genre.id

            db.session.add(book)
            db.session.commit()

            return book.to_dict(), 201
        
        except ValueError as e:
            db.session.rollback()
            return {'error': str(e)}, 400
        except IntegrityError:
            db.session.rollback()
            return {'error': 'Book already exists.'}, 422
        except Exception as e:
            db.session.rollback()
            return {'error': 'Internal server error'}, 500

class BookByID(Resource):
    def get(self, id):
        book = Book.query.filter_by(id=id).first()
        if book:
            return book.to_dict(), 200
        return {'error': 'Book not found'}, 404
    
    def patch(self,id):
        data = request.get_json()

        book = Book.query.filter_by(id=id).first()

        for attr in data:
            setattr(book, attr, data[attr])

        db.session.add(book)
        db.session.commit()

        return book.to_dict(), 200

    def delete(self, id):
        book = Book.query.filter_by(id=id).first()

        if book.libraries:
            book.libraries.clear()
            db.session.commit()

        db.session.delete(book)
        db.session.commit()

        return {}, 204

class LibraryIndex(Resource):
    def get(self):
        user = User.query.filter_by(id=session['user_id']).first()
        libraries = [library.to_dict() for library in user.libraries]
        return libraries, 200

    def post(self):
        try:
            request_json = request.get_json()

            name = request_json.get('libraryName')

            library = Library(
                name=name,
                user_id=session['user_id']
            )

            db.session.add(library)
            db.session.commit()

            return library.to_dict(), 201
        
        except ValueError as e:
            db.session.rollback()
            return {'error': str(e)}, 400
        except Exception as e:
            db.session.rollback()
            return {'error': 'Internal server error'}, 500

class AddBookToLibrary(Resource):

    def post(self):
        try:
            request_json = request.get_json()

            library_id = request_json.get('library_id')
            book_id = request_json.get('book_id')

            library = Library.query.filter_by(id=library_id).first()
            book = Book.query.filter_by(id=book_id).first()

            library.books.append(book)
            db.session.commit()

        except Exception as e:
            db.session.rollback()
            return {'error': 'Internal server error'}, 500

class DeleteBookFromLibrary(Resource):
    def delete(self, library_id, book_id):
        try:
            library = library = Library.query.filter_by(id=library_id).first()
            book = Book.query.filter_by(id=book_id).first()

            if book in library.books:
                library.books.remove(book)
                db.session.commit()
                return {}, 204
            else:
                return {'error': 'Book not found in the specified library'}, 404

        except Exception as e:
            db.session.rollback()
            return {'error': 'Internal server error'}, 500

class LibrariesByBookID(Resource):
    def get(self, id):
        book = Book.query.filter_by(id=id).first()
        if book:
            libraries = [library.to_dict() for library in book.libraries]
            return libraries, 200
        return {'error': 'Book not found'}, 404

class LibraryByID(Resource):
    def get(self, id):
        library = Library.query.filter_by(id=id).first()
        if library:
            return library.to_dict(), 200
        return {'error': 'Library not found'}, 404
    
    def patch(self, id):
        data = request.get_json()

        library = Library.query.filter_by(id=id).first()

        for attr in data:
            setattr(library, attr, data[attr])

        db.session.add(library)
        db.session.commit()

        return library.to_dict(), 200
        
    def delete(self, id):
        library = Library.query.filter_by(id=id).first()

        if library.books:
            library.books.clear()
            db.session.commit()

        db.session.delete(library)
        db.session.commit()

        return {}, 204

class ReviewsByBookID(Resource):
    def get(self, id):
        book = Book.query.filter_by(id=id).first()
        if book:
            reviews = [review.to_dict() for review in book.reviews]
            return reviews, 200
        return {'error': 'Book not found'}, 404

    def post(self, id):
        try:
            request_json = request.get_json()

            rating = request_json.get('rating')
            mood = request_json.get('mood')
            pace = request_json.get('pace')
            comment = request_json.get('comment')

            review = Review(
                rating=rating,
                mood=mood,
                pace=pace,
                comment=comment,
                user_id=session['user_id'],
                book_id=id
            )

            db.session.add(review)
            db.session.commit()

            return review.to_dict(), 201
        
        except ValueError as e:
            db.session.rollback()
            return {'error': str(e)}, 400
        except Exception as e:
            db.session.rollback()
            return {'error': 'Internal server error'}, 500

class ReviewByID(Resource):
    def get(self, id):
        review = Review.query.filter_by(id=id).first()
        if review:
            return review.to_dict(), 200
        return {'error': 'Review not found'}, 404

    def patch(self, id):
        data = request.get_json()

        review = Review.query.filter_by(id=id).first()

        for attr in data:
            setattr(review, attr, data[attr])

        db.session.add(review)
        db.session.commit()

        return review.to_dict(), 200

    def delete(self, id):
        review = Review.query.filter_by(id=id).first()

        db.session.delete(review)
        db.session.commit()

        return {}, 204

api.add_resource(Signup, '/signup', endpoint='signup')
api.add_resource(CheckSession, '/check_session', endpoint='check_session')
api.add_resource(Login, '/login', endpoint='login')
api.add_resource(Logout, '/logout', endpoint='logout')
api.add_resource(GenreIndex, '/genres', endpoint='genres')
api.add_resource(BooksByGenre, '/genres/<string:name>', endpoint="books_by_genre")
api.add_resource(BookIndex, '/books', endpoint='books')
api.add_resource(BookByID, '/books/<int:id>', endpoint='book_by_id')
api.add_resource(LibraryIndex, '/libraries', endpoint='libraries')
api.add_resource(AddBookToLibrary, '/add_book_to_library', endpoint='add_book_to_library')
api.add_resource(DeleteBookFromLibrary, '/delete_book_from_library/library/<int:library_id>/book/<int:book_id>', endpoint='delete_book_from_library')
api.add_resource(LibrariesByBookID, '/book/libraries/<int:id>', endpoint='libraries_by_book_id')
api.add_resource(LibraryByID, '/library/<int:id>', endpoint='library_by_id')
api.add_resource(ReviewsByBookID, '/book/reviews/<int:id>', endpoint='reviews_by_book_id')
api.add_resource(ReviewByID, '/reviews/<int:id>', endpoint='review_by_id')


if __name__ == '__main__':
    app.run(port=5555, debug=True)

