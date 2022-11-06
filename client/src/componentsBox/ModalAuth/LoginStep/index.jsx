import React from 'react';
import { Box, Button, IconButton, TextField, Typography } from '@mui/material';
import { useForm } from "react-hook-form";
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import { LoginStepStyled } from './styled';
import { login } from './../../../store/actions/authActions'
import { useDispatch, useSelector } from 'react-redux';

const LoginStep = ({ handleStepAuth, clearStepOnClose }) => {
    const { isAuthenticated } = useSelector(store => store.auth);
    const { error } = useSelector(store => store.error);
    const { register, handleSubmit, formState: { errors } } = useForm();
    const dispatch = useDispatch();
    const onSubmit = (data) => {
        const user = data;
        dispatch(login(user));

        if(isAuthenticated && !error) {
            clearStepOnClose();
        }
    };

    console.log(isAuthenticated, "isAuthenticated");
    console.log(error, "error");

    return (
        <LoginStepStyled>
            <IconButton onClick={() => handleStepAuth('')} aria-label="delete">
                <ArrowBackIosIcon />
            </IconButton>
            <h2>Login</h2>
            <form onSubmit={handleSubmit(onSubmit)} className="login-box-fields">
                <Box className="field-input">
                    <TextField
                        error={errors.email}
                        {...register("email", { required: true })}
                        id="outlined-basic"
                        label={"Email"}
                        variant="outlined" />
                </Box>
                {errors.email && <Typography className="error-message" component="h5">This field is required</Typography>}
                <Box className="field-input">
                    <TextField
                        error={errors.password}
                        {...register("password", { required: true })}
                        id="outlined-adornment-password"
                        label={"Password"}
                        variant="outlined" />
                </Box>
                {errors.password && <Typography className="error-message" component="h5">This field is required</Typography>}
                <Box className="field-submit">
                    <Button
                        type="submit"
                        variant="contained"
                    >
                        Sign in
                    </Button>
                </Box>
            </form>
        </LoginStepStyled>
    )
}

export default LoginStep;