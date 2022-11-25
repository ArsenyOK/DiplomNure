import * as React from "react";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { useHistory } from "react-router-dom";

const categoriesArray = [
    "First meal",
    "Main courses",
    "Salads",
    "Snacks",
    "Desserts",
    "Bakery",
    "Sauces",
    " ",
];

const CategoryBox = () => {
    const [anchorEl, setAnchorEl] = React.useState(null);
    const history = useHistory();

    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = (param) => {
        if (param === " ") {
            history.push(`/`);
            setAnchorEl(null);
        } else {
            history.push(`/category/${param}`);
            setAnchorEl(null);
        }
    };

    return (
        <div>
            <Button
                color="inherit"
                id="basic-button"
                aria-controls={open ? "basic-menu" : undefined}
                aria-haspopup="true"
                aria-expanded={open ? "true" : undefined}
                onClick={handleClick}
            >
                Categories
            </Button>
            <Menu
                id="basic-menu"
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                MenuListProps={{
                    "aria-labelledby": "basic-button",
                }}
            >
                {categoriesArray.map((item) => {
                    return (
                        <MenuItem
                            key={item}
                            onClick={() => {
                                handleClose(item);
                            }}
                        >
                            {item}
                        </MenuItem>
                    );
                })}
            </Menu>
        </div>
    );
};

export default CategoryBox;
