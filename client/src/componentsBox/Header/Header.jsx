import React from "react";
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { HeaderBox } from "../styled-components/Header.styled";
import AuthLinks from "./UserLinks/AuthLinks";
import GuestLinks from "./UserLinks/GuestLinks";
import Logo from "./../../images/main-logo.jpeg";
import { useHistory } from "react-router-dom";

// const drawerWidth = 240;
// const navItems = ['Home', 'About', 'Contact', 'CategoryBox'];

const Header = (props) => {
    const { isAuthenticated } = useSelector((store) => store.auth);
    const history = useHistory();

    const pushPage = (url) => {
        history.push(url);
    };

    return (
        <HeaderBox>
            <div className="header-logo">
                <NavLink to="/">
                    <img src={Logo} alt="logo" />
                </NavLink>
            </div>
            {!isAuthenticated ? <GuestLinks /> : <AuthLinks />}
            {isAuthenticated && (
                <div className="profile" onClick={() => pushPage("/user")}>
                    Profile
                </div>
            )}
        </HeaderBox>
    );
};
export default Header;
