import React, { useState } from "react";
import { categoriesArray } from "../common/dataList";
import Button from "@mui/material/Button";
import { NavLink, useHistory } from "react-router-dom";
import { Popover, ListItem, List } from "@mui/material";
import { logout } from "../../../store/actions/authActions";
import { useDispatch } from "react-redux";

const AuthLinks = () => {
    const [anchorEl, setAnchorEl] = useState(null);
    const dispatch = useDispatch();
    const history = useHistory();

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const Logout = () => {
        dispatch(logout());
    };

    const pushPage = (url) => {
        history.push(url);
    };

    const open = Boolean(anchorEl);
    const id = open ? "simple-popover" : undefined;

    return (
        <div className="header-list">
            <ul>
                <Button onClick={handleClick} variant="contained">
                    Categories
                </Button>
                <Popover
                    id={id}
                    open={open}
                    anchorEl={anchorEl}
                    onClose={handleClose}
                    anchorOrigin={{
                        vertical: "bottom",
                        horizontal: "left",
                    }}
                >
                    <List subheader={<li />}>
                        {categoriesArray.map((element, value) => (
                            <li key={`section-${element}`}>
                                <ul>
                                    <ListItem onClick={handleClose} key={value}>
                                        {/* <ListItemText primary={`Item ${element}`} /> */}
                                        {element === "All" ? (
                                            <NavLink to={`/recipes`}>
                                                All recipes
                                            </NavLink>
                                        ) : (
                                            <NavLink
                                                to={`/category/${element}`}
                                            >
                                                {element}
                                            </NavLink>
                                        )}
                                    </ListItem>
                                </ul>
                            </li>
                        ))}
                    </List>
                </Popover>
                <li>About</li>
                <li>Contact</li>
                <li onClick={() => pushPage("/user")}>Profile</li>
                <li onClick={Logout}>Logout</li>
            </ul>
        </div>
    );
};

export default AuthLinks;
