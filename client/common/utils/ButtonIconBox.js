import React from 'react';
import { Box } from '@material-ui/core';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';

const ButtonIconBox = ({ color, onClick, size, id, type }) => (
    <Box>
        <IconButton
            id={id}
            color={color}
            size={size}
            onClick={onClick}
            type={type}
            >
            <CloseIcon />
        </IconButton>
    </Box>
)

export default ButtonIconBox;
