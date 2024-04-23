#!/usr/bin/env python3

# Standard library imports
from random import randint, choice as rc

# Remote library imports
from faker import Faker

# Local imports
from app import app
from models import db, User, Genre, Book

books_list = [
    {
        "title": "A Court of Thorns and Roses",
        "author": "Sarah J. Maas",
        "publication_year": 2015,
        "summary": "When nineteen-year-old huntress Feyre kills a wolf in the woods, a terrifying creature arrives to demand retribution. Dragged to a treacherous magical land she knows about only from legends, Feyre discovers that her captor is not truly a beast, but one of the lethal, immortal faeries who once ruled her world. \nAt least, he's not a beast all the time. \nAs she adapts to her new home, her feelings for the faerie, Tamlin, transform from icy hostility into a fiery passion that burns through every lie she's been told about the beautiful, dangerous world of the Fae. But something is not right in the faerie lands. An ancient, wicked shadow is growing, and Feyre must find a way to stop it, or doom Tamlin-and his world-forever.",
        "cover_image_url": "https://ia600505.us.archive.org/view_archive.php?archive=/35/items/l_covers_0014/l_covers_0014_42.zip&file=0014429818-L.jpg",
        "genre": "Fantasy"
    },
    {
        "title": "A Court of Mist and Fury",
        "author": "Sarah J. Maas",
        "publication_year": 2016,
        "summary": "Feyre has undergone more trials than one human woman can carry in her heart. Though she's now been granted the powers and lifespan of the High Fae, she is haunted by her time Under the Mountain and the terrible deeds she performed to save the lives of Tamlin and his people. \nAs her marriage to Tamlin approaches, Feyre's hollowness and nightmares consume her. She finds herself split into two different people: one who upholds her bargain with Rhysand, High Lord of the feared Night Court, and one who lives out her life in the Spring Court with Tamlin. While Feyre navigates a dark web of politics, passion, and dazzling power, a greater evil looms. She might just be the key to stopping it, but only if she can harness her harrowing gifts, heal her fractured soul, and decide how she wishes to shape her future-and the future of a world in turmoil. \nBestselling author Sarah J. Maas's masterful storytelling brings this second book in her dazzling, sexy, action-packed series to new heights.",
        "cover_image_url": "https://ia600505.us.archive.org/view_archive.php?archive=/35/items/l_covers_0014/l_covers_0014_42.zip&file=0014429816-L.jpg",
        "genre": "Fantasy"
    },
    {
        "title": "A Court of Wings and Ruin",
        "author": "Sarah J. Maas",
        "publication_year": 2017,
        "summary": "Looming war threatens all Feyre holds dear in the third volume of the #1 New York Times bestselling A Court of Thorns and Roses series. \nFeyre has returned to the Spring Court, determined to gather information on Tamlin's manoeuvrings and the invading king threatening to bring Prythian to its knees. But to do so she must play a deadly game of deceit – and one slip may spell doom not only for Feyre, but for her world as well. \nAs war bears down upon them all, Feyre must decide who to trust amongst the dazzling and lethal High Lords – and hunt for allies in unexpected places. \nIn this thrilling third book in the #1 New York Times bestselling series from Sarah J. Maas, the earth will be painted red as mighty armies grapple for power over the one thing that could destroy them all.",
        "cover_image_url": "https://ia801909.us.archive.org/view_archive.php?archive=/31/items/l_covers_0013/l_covers_0013_31.zip&file=0013315544-L.jpg",
        "genre": "Fantasy"
    },
    {
        "title": "Dune",
        "author": "Frank Herbert",
        "publication_year": 1965,
        "summary": "Set on the desert planet Arrakis, Dune is the story of the boy Paul Atreides, heir to a noble family tasked with ruling an inhospitable world where the only thing of value is the \"spice\" melange, a drug capable of extending life and enhancing consciousness. Coveted across the known universe, melange is a prize worth killing for...\nWhen House Atreides is betrayed, the destruction of Paul's family will set the boy on a journey toward a destiny greater than he could ever have imagined. And as he evolves into the mysterious man known as Muad'Dib, he will bring to fruition humankind's most ancient and unattainable dream. \nA stunning blend of adventure and mysticism, environmentalism and politics, Dune won the first Nebula Award, shared the Hugo Award, and formed the basis of what is undoubtedly the grandest epic in science fiction.",
        "cover_image_url": "https://ia801505.us.archive.org/view_archive.php?archive=/8/items/olcovers697/olcovers697-L.zip&file=6978883-L.jpg",
        "genre": "Science Fiction"
    },
    {
        "title": "Misery",
        "author": "Stephen King",
        "publication_year": 1988,
        "summary": "Paul Sheldon. He's a bestselling novelist who has finally met his biggest fan. Her name is Annie Wilkes and she is more than a rabid reader—she is Paul's nurse, tending his shattered body after an automobile accident. But she is also his captor, keeping him prisoner in her isolated house. Now Annie wants Paul to write his greatest work—just for her. She has lots of ways to spur him on. One is a needle. Another is an ax. And if they don't work, she can get really nasty...",
        "cover_image_url": "https://ia801401.us.archive.org/view_archive.php?archive=/32/items/l_covers_0008/l_covers_0008_46.tar&file=0008461351-L.jpg",
        "genre": "Mystery"
    },
    {
        "title": "IT",
        "author": "Stephen King",
        "publication_year": 1986,
        "summary": "It began for the Losers on a day in June of 1958, the day school let out for the summer. That was the day Henry Bowers carved the first letter of his name on Ben Hanscom's belly and chased him into the Barrens, the day Henry and his Neanderthal friends beat up on Stuttering Bill Denbrough and Eddie Kaspbrak, the day Stuttering Bill had to save Eddie from his worst asthma attack ever by riding his bike to beat the devil. It ended in August, with seven desperate children in search of a creature of unspeakable evil in the drains beneath Derry. In search of It. And somehow it ended. \nOr so they thought. \nThen on a spring night in 1985 Mike Hanlon, once one of those children, makes six calls. Stan Uris, accountant. Richie \"Records\" Tozier, L.A. disc jockey. Ben Hanscom, renowned architect. Beverly Rogan, dress designer. Eddie Kaspbrak, owner of a successful New York limousine company. And Bill Denbrough, bestselling writer of horror novels. Bill Denbrough who now only stutters in his dreams. \nThese six men and one woman have forgotten their childhoods, have forgotten the time when they were Losers . . . but an unremembered promise draws them back, the present begins to rhyme dreadfully with the past, and when the Losers reunite, the wheels of fate lock together and roll them toward the ultimate terror. \nIn the biggest and most ambitious book of his career, Stephen King gives us not only his most towering epic of horror but a surprising reillumination of the corridor where we pass from the bright mysteries of childhood to those of maturity.",
        "cover_image_url": "https://ia601401.us.archive.org/view_archive.php?archive=/32/items/l_covers_0008/l_covers_0008_56.tar&file=0008569284-L.jpg",
        "genre": "Horror"
    },
    {
        "title": "Pet Sematary",
        "author": "Stephen King",
        "publication_year": 1983,
        "summary": "When Dr. Louis Creed takes a new job and moves his family to the idyllic rural town of Ludlow, Maine, this new beginning seems too good to be true. Despite Ludlow's tranquility, an undercurrent of danger exists here. Those trucks on the road outside the Creed's beautiful old home travel by just a little too quickly, for one thing…as is evidenced by the makeshift graveyard in the nearby woods where generations of children have buried their beloved pets. Then there are the warnings to Louis both real and from the depths of his nightmares that he should not venture beyond the borders of this little graveyard where another burial ground lures with seductive promises and ungodly temptations. A blood-chilling truth is hidden there—one more terrifying than death itself, and hideously more powerful. As Louis is about to discover for himself...",
        "cover_image_url": "https://ia904703.us.archive.org/view_archive.php?archive=/9/items/l_covers_0012/l_covers_0012_02.zip&file=0012020747-L.jpg",
        "genre": "Horror"
    },
    {
        "title": "The Shining",
        "author": "Stephen King",
        "publication_year": 1977,
        "summary": "The Shining is a 1977 horror novel by American author Stephen King. It is King's third published novel and first hardback bestseller; its success firmly established King as a preeminent author in the horror genre. The setting and characters are influenced by King's personal experiences, including both his visit to The Stanley Hotel in 1974 and his struggle with alcoholism. The book was followed by a sequel, Doctor Sleep, published in 2013. \nThe Shining centers on the life of Jack Torrance, a struggling writer and recovering alcoholic who accepts a position as the off-season caretaker of the historic Overlook Hotel in the Colorado Rockies. His family accompanies him on this job, including his young son Danny Torrance, who possesses \"the shining\", an array of psychic abilities that allow Danny to see the hotel's horrific past. Soon, after a winter storm leaves them snowbound, the supernatural forces inhabiting the hotel influence Jack's sanity, leaving his wife and son in incredible danger.",
        "cover_image_url": "https://ia802607.us.archive.org/view_archive.php?archive=/31/items/l_covers_0010/l_covers_0010_20.zip&file=0010201235-L.jpg",
        "genre": "Horror"
    },
    # Add more books as needed
]

def add_books(books_list):
    for book_data in books_list:
        genre_name = book_data.pop("genre", None)
        genre = Genre.query.filter_by(name=genre_name).first()
        if genre:
            book = Book(
                title=book_data.get("title"),
                author=book_data.get("author"),
                publication_year=book_data.get("publication_year"),
                summary=book_data.get("summary"),
                cover_image_url=book_data.get("cover_image_url"),
            )
            book.genre_id = genre.id
            db.session.add(book)
    db.session.commit()

if __name__ == '__main__':
    fake = Faker()
    with app.app_context():
        print("Starting seed...")
        
        User.query.delete()
        Genre.query.delete()
        Book.query.delete()

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
            )

            user.password = user.username + 'Password' + '123'

            users.append(user)

        db.session.add_all(users)
        db.session.commit()

        genres_list = [
            "Mystery", "Fantasy", "Thriller", "Horror", "Historical Fiction",
            "Romance", "Science Fiction", "Dystopian", "Adventure",
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

        add_books(books_list)
        print("Books have been added to the database.")