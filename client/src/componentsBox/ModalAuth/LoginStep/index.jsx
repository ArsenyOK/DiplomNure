import React from "react";
import { Box, Button, IconButton, TextField, Typography } from "@mui/material";
import { useForm } from "react-hook-form";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import { LoginStepStyled } from "./styled";
import { login } from "./../../../store/actions/authActions";
import { useDispatch, useSelector } from "react-redux";
import ErrorMessage from "../../common/ErrorMessage/ErrorMessage";

const LoginStep = ({ handleStepAuth, clearStepOnClose }) => {
    const { isAuthenticated, msg } = useSelector((store) => store.auth);
    const { error } = useSelector((store) => store.error);
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();
    const dispatch = useDispatch();
    const onSubmit = (data) => {
        const user = data;
        dispatch(login(user));

        if (isAuthenticated && !error) {
            clearStepOnClose();
        }
    };

    return (
        <LoginStepStyled>
            <IconButton onClick={() => handleStepAuth("")} aria-label="delete">
                <ArrowBackIosIcon />
            </IconButton>
            <h2>Login</h2>
            <form
                onSubmit={handleSubmit(onSubmit)}
                className="login-box-fields"
            >
                <Box className="field-input">
                    <TextField
                        error={errors.email}
                        {...register("email", { required: true })}
                        id="outlined-basic"
                        label={"Email"}
                        variant="outlined"
                    />
                </Box>

                <Box className="field-input">
                    <TextField
                        error={errors.password}
                        {...register("password", { required: true })}
                        id="outlined-adornment-password"
                        label={"Password"}
                        variant="outlined"
                        type="password"
                    />
                </Box>
                {msg && <ErrorMessage text="Name or Password are wrong!" />}
                <Box className="field-submit">
                    <Button type="submit" variant="contained">
                        Sign in
                    </Button>
                </Box>
            </form>
        </LoginStepStyled>
    );
};

export default LoginStep;
