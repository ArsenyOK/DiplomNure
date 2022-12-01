import React from "react";
import { IconButton } from "@mui/material";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import { useHistory } from "react-router-dom";

const BackButton = ({ color }) => {
    const history = useHistory();

    const goBack = () => {
        history.goBack();
    };

    return (
        <IconButton onClick={goBack} aria-label="delete">
            <ArrowBackIosIcon
                style={{
                    color: color,
                }}
            />
        </IconButton>
    );
};

export default BackButton;
