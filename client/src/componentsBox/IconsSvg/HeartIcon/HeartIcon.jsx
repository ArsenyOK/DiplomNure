import React from "react";
import IconButton from "@mui/material/IconButton";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { WrapperBtn } from "./WrapperBtn";

const HeartIcon = ({ color, width, height, toggleBtn, click }) => {
    return (
        <WrapperBtn btncolor={color} onClick={click} aria-label="delete">
            {toggleBtn ? <FavoriteIcon /> : <FavoriteBorderIcon />}
        </WrapperBtn>
    );
};

export default HeartIcon;
