import React from 'react';
import { Box, Button, IconButton, TextField } from '@mui/material';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import { RegisterStepStyled } from './styled';

const RegisterStep = ({ handleStepAuth }) => {
    return (
        <RegisterStepStyled>
            <IconButton onClick={() => handleStepAuth('')} aria-label="delete">
                <ArrowBackIosIcon />
            </IconButton>
            <h2>Register</h2>
            <Box className="login-box-fields">
                <Box className="field-input">
                    <TextField id="outlined-basic" label="Name" variant="outlined" />
                </Box>
                <Box className="field-input">
                    <TextField id="outlined-basic" label="Email" variant="outlined" />
                </Box>
                <Box className="field-input">
                    <TextField id="outlined-adornment-password" label="Password" variant="outlined" />
                </Box>
                <Box className="field-submit">
                    <Button variant="contained">Sign up</Button>
                </Box>
            </Box>
        </RegisterStepStyled>
    )
}

export default RegisterStep;