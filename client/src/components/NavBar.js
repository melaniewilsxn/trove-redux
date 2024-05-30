import React from 'react';
import { Menu, Icon } from 'semantic-ui-react';
import { NavLink } from 'react-router-dom';

function NavBar(){

    return (
        <Menu fluid vertical inverted>
            <Menu.Item as={NavLink} to="/" name="home"><Icon name="home" />Home</Menu.Item>
            <Menu.Item as={NavLink} to="/books" name="books"><Icon name="book" />All Books</Menu.Item>
            <Menu.Item as={NavLink} to="/discover" name="discover"><Icon name="search" />Discover</Menu.Item>
            <Menu.Item as={NavLink} to="/library" name="library"><Icon name="bookmark" />Libraries</Menu.Item>
            <Menu.Item as={NavLink} to="/about" name="about"><Icon name="question" />About</Menu.Item>
        </Menu>
    )
}

export default NavBar