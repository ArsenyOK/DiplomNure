import React from 'react';
import { useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { HeaderBox } from '../styled-components/Header.styled';
import AuthLinks from './UserLinks/AuthLinks';
import GuestLinks from './UserLinks/GuestLinks';

// const drawerWidth = 240;
// const navItems = ['Home', 'About', 'Contact', 'CategoryBox'];

const Header = (props) => {
    const { isAuthenticated } = useSelector(store => store.auth)
    return (
        <HeaderBox>
            <div className="header-logo">
                <NavLink to="/">Logo</NavLink>
            </div>
            { !isAuthenticated ? <GuestLinks /> : <AuthLinks />}
        </HeaderBox>
    )
}
export default Header;
