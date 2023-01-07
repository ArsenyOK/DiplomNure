import React, { useState } from "react";
import { categoriesArray } from "../common/dataList";
import Button from "@mui/material/Button";
import { NavLink } from "react-router-dom";
import { Popover, ListItem, List } from "@mui/material";
import ModalAuth from "../../ModalAuth/ModalAuth";
import CustomBtn from "../../common/CustomBtn/CustomBtn";

const GuestLinks = () => {
    const [anchorEl, setAnchorEl] = useState(null);
    const [modalOpen, setModalOpen] = useState(false);

    const toggleModal = () => {
        setModalOpen((prev) => !prev);
    };

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const open = Boolean(anchorEl);
    const id = open ? "simple-popover" : undefined;

    return (
        <div className="header-list">
            <ul>
                <CustomBtn
                    text="Categories"
                    bg={"#1976d2"}
                    hover={"#1565c0"}
                    boxShadow={
                        "0px 3px 1px -2px rgb(0 0 0 / 20%), 0px 2px 2px 0px rgb(0 0 0 / 14%), 0px 1px 5px 0px rgb(0 0 0 / 12%)"
                    }
                    onClick={handleClick}
                />
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
                <li onClick={toggleModal}>Auth</li>
                <ModalAuth open={modalOpen} handleClose={toggleModal} />
            </ul>
        </div>
    );
};

export default GuestLinks;
