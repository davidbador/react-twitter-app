import React from 'react';
import { Navbar, Nav, NavItem } from 'reactstrap';
import { NavLink } from 'react-router-dom';
import '../App.css'

function NavBar() {
    return (
        <div style={{ display:'flex', alignItems: 'center', justifyContent: 'center'}}>
            <Navbar color="dark" dark expand="md" className='navbar' style={{ width: '70%' }}>
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
