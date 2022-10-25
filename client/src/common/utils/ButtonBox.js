import React from 'react';
import { Box, Button } from '@material-ui/core';

const ButtonBox = ({ disabled, type, color, onClick, className, text, variant }) => (
    <Box p={2}>
        <Button variant={variant} disabled={disabled}
            type={type} color={color}
            onClick={onClick} className={className}
        >{text}</Button>
    </Box>
)

export default ButtonBox;
