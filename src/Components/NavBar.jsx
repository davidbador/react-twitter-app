import React from 'react';
import { Navbar, Nav, NavItem } from 'reactstrap';
import { NavLink } from 'react-router-dom';
import styles from './NavBar.module.css';

function NavBar() {
    return (
        <div className={styles.navBarWrapper}>
            <Navbar color="dark" dark expand="md" className={styles.navBar}>
                <Nav>
                    <NavItem>
                        <NavLink exact activeClassName="active" to="/">Home</NavLink>
                    </NavItem>
                    <NavItem>
                        <NavLink exact activeClassName="active" to="/profile">Profile</NavLink>
                    </NavItem>
                </Nav>
            </Navbar>
        </div>
    )
}

export default NavBar
