import React from 'react'
import { Menu } from 'semantic-ui-react'
import { NavLink } from 'react-router-dom'

function NavBar(){
    return (
        <Menu>
            <Menu.Item as={NavLink} exact to="/" name="home">Home</Menu.Item>
            <Menu.Item as={NavLink} exact to="/library" name="library">My Library</Menu.Item>
            <Menu.Item as={NavLink} exact to="/discover" name="discover">Discover</Menu.Item>
            <Menu.Item as={NavLink} exact to="/account" name="account">My Account</Menu.Item>
            <Menu.Item as={NavLink} exact to="/about" name="about">About</Menu.Item>
        </Menu>
    )
}

export default NavBar