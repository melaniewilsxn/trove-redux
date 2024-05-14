import React from 'react'
import { Menu, Icon } from 'semantic-ui-react'
import { NavLink } from 'react-router-dom'

function NavBar(){

    return (
        <Menu fluid vertical inverted>
            <Menu.Item as={NavLink} exact to="/" name="home"><Icon name="home" />Home</Menu.Item>
            <Menu.Item as={NavLink} exact to="/books" name="books"><Icon name="book" />All Books</Menu.Item>
            <Menu.Item as={NavLink} exact to="/discover" name="discover"><Icon name="search" />Discover</Menu.Item>
            <Menu.Item as={NavLink} exact to="/library" name="library"><Icon name="bookmark" />Libraries</Menu.Item>
            <Menu.Item as={NavLink} exact to="/about" name="about"><Icon name="question" />About</Menu.Item>
        </Menu>
    )
}

export default NavBar