import React from 'react';
import { Container, Segment, Header } from 'semantic-ui-react';

function About(){
    return (
    <Container text>
        <Header as='h1' textAlign='center' style={{color: 'white', fontFamily: 'Bagel Fat One', fontSize: '50px'}}>About Trove</Header>
        <Segment padded='very' style={{ marginTop: '2em' }}>
            <Header as='h2' style={{ fontFamily: 'Bagel Fat One', fontSize: '25px' }}>Our Mission</Header>
            <p>
                At Trove, our mission is to provide book enthusiasts with an intuitive platform to manage their personal libraries, explore new genres, and share their thoughts through reviews. Whether you're a casual reader or a dedicated bibliophile, our app is designed to enhance your reading experience by making book discovery and organization simple and enjoyable.
            </p>
            <Header as='h2' style={{ fontFamily: 'Bagel Fat One', fontSize: '25px' }}>Who We Are</Header>
            <p>
                We are a team of book lovers and software developers dedicated to creating digital solutions that enhance how people interact with their favorite books. Founded in 2024, Trove was born from the idea that technology should bring books closer to people, making reading more accessible and engaging for everyone.
            </p>
            <Header as='h2' style={{ fontFamily: 'Bagel Fat One', fontSize: '25px' }}>What We Offer</Header>
            <p>
                Trove provides a variety of features designed to cater to all your bookish needs:
            </p>
            <ul>
                <li><strong>Library Management:</strong> Organize your books with custom libraries, track your reading progress, and manage your book collection.</li>
                <li><strong>Discover New Books:</strong> Explore books from a wide range of genres and use our discovery tools to find your next favorite read.</li>
                <li><strong>Community Reviews:</strong> Share your opinions and read reviews from other users to find out what they think about the latest bestsellers or timeless classics.</li>
            </ul>
            <Header as='h2' style={{ fontFamily: 'Bagel Fat One', fontSize: '25px' }}>Join Our Community</Header>
            <p>
                Ready to take your reading experience to the next level? Join Trove today and start building your ultimate book collection. Connect with other readers, share your reviews, and discover endless reading possibilities. Let's turn the page to a new chapter together!
            </p>
        </Segment>
    </Container>
    )
}

export default About