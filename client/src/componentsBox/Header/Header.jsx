import React from 'react';
import { NavLink } from 'react-router-dom';
import { HeaderBox } from '../styled-components/Header.styled';
import GuestLinks from './UserLinks/GuestLinks';

// const drawerWidth = 240;
// const navItems = ['Home', 'About', 'Contact', 'CategoryBox'];

const Header = (props) => {
    return (
        <HeaderBox>
            <div className="header-logo">
                <NavLink to="/">Logo</NavLink>
            </div>
            <GuestLinks />
        </HeaderBox>
    )
}
export default Header;
