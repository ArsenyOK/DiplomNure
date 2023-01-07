import React, { useState, useCallback } from "react";
import { Modal, Box, Button } from "@mui/material";
import { ContentModal } from "../styled-components";
import LoginStep from "./LoginStep";
import { ContentModalLogin } from "./LoginStep/styled";
import RegisterStep from "./RegisterStep";
import { ContentModalRegister } from "./RegisterStep/styled";
import CustomBtn from "../common/CustomBtn/CustomBtn";

const BasicStep = ({ handleStepAuth }) => {
    return (
        <>
            <Box className="container-login">
                <CustomBtn
                    text="Login"
                    bg={"#1976d2"}
                    hover={"#1565c0"}
                    onClick={() => handleStepAuth("login")}
                />
            </Box>
            <Box>
                <CustomBtn
                    text="Registration"
                    bg={"#1976d2"}
                    hover={"#1565c0"}
                    onClick={() => handleStepAuth("register")}
                />
            </Box>
        </>
    );
};

const ModalAuth = ({ open, handleClose }) => {
    const [stepAuth, setStepAuth] = useState("");

    const handleStepAuth = useCallback(
        (step) => {
            setStepAuth(step);
        },
        [setStepAuth]
    );

    const clearStepOnClose = useCallback(() => {
        handleClose();
        setStepAuth("");
    }, [handleClose, setStepAuth]);

    return (
        <Modal
            open={open}
            onClose={clearStepOnClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            {stepAuth === "" ? (
                <ContentModal>
                    <BasicStep handleStepAuth={handleStepAuth} />
                </ContentModal>
            ) : stepAuth === "login" ? (
                <ContentModalLogin>
                    <LoginStep
                        clearStepOnClose={clearStepOnClose}
                        handleStepAuth={handleStepAuth}
                    />
                </ContentModalLogin>
            ) : (
                <ContentModalRegister>
                    <RegisterStep
                        handleStepAuth={handleStepAuth}
                        clearStepOnClose={clearStepOnClose}
                    />
                </ContentModalRegister>
            )}
        </Modal>
    );
};

export default ModalAuth;
