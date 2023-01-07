import React, { useEffect } from "react";
import { Box, Button, IconButton, TextField } from "@mui/material";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import { RegisterStepStyled } from "./styled";
import { useForm } from "react-hook-form";
import ErrorMessage from "../../common/ErrorMessage/ErrorMessage";
import { useDispatch, useSelector } from "react-redux";
import { register as registerUser } from "./../../../store/actions/authActions";
import CustomBtn from "../../common/CustomBtn/CustomBtn";

const RegisterStep = ({ handleStepAuth, clearStepOnClose }) => {
    const { isAuthenticated } = useSelector((store) => store.auth);
    const dispatch = useDispatch();

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    const onSubmit = (data) => {
        const newUser = {
            name: data.name,
            email: data.email,
            password: data.password,
        };

        dispatch(registerUser(newUser));
    };

    useEffect(() => {
        if (isAuthenticated) {
            clearStepOnClose();
        }
    }, [isAuthenticated]);

    return (
        <RegisterStepStyled>
            <IconButton onClick={() => handleStepAuth("")} aria-label="delete">
                <ArrowBackIosIcon />
            </IconButton>
            <h2>Register</h2>
            <form onSubmit={handleSubmit(onSubmit)}>
                <Box className="login-box-fields">
                    <Box className="field-input">
                        <TextField
                            id="outlined-basic"
                            label="Name"
                            variant="outlined"
                            {...register("name", { required: true })}
                        />
                        {errors.name && (
                            <ErrorMessage text="This field is required!" />
                        )}
                    </Box>
                    <Box className="field-input">
                        <TextField
                            id="outlined-basic"
                            label="Email"
                            variant="outlined"
                            {...register("email", { required: true })}
                            type="email"
                        />
                        {errors.email && (
                            <ErrorMessage text="This field is required!" />
                        )}
                    </Box>
                    <Box className="field-input">
                        <TextField
                            id="outlined-adornment-password"
                            label="Password"
                            variant="outlined"
                            {...register("password", { required: true })}
                            type="password"
                        />
                        {errors.password && (
                            <ErrorMessage text="This field is required!" />
                        )}
                    </Box>
                    <Box className="field-submit">
                        <CustomBtn
                            text="Sign up"
                            bg={"#1976d2"}
                            hover={"#1565c0"}
                            type={"submit"}
                        />
                    </Box>
                </Box>
            </form>
        </RegisterStepStyled>
    );
};

export default RegisterStep;
