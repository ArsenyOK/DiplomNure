import React, { useState } from 'react'
import { Modal, Box, Button } from '@mui/material';
import { ContentModal } from '../styled-components';


const LoginStep = ({ handleStepAuth }) => {
    return (
        <Box>
            <h2>Login Step</h2>
            <button onClick={() => handleStepAuth('')}>back</button>
        </Box>
    )
}

const RegisterStep = ({ handleStepAuth }) => {
    return (
        <Box>
            <h2>Regsiter Step</h2>
            <button onClick={() => handleStepAuth('')}>back</button>
        </Box>
    )
}

const BasicStep = ({ handleStepAuth }) => {
    return (
        <>
            <Box className="container-login">
                <Button onClick={() => handleStepAuth('login')} variant="contained">Login</Button>
            </Box>
            <Box>
                <Button onClick={() => handleStepAuth('register')} variant="contained">Registration</Button>
            </Box>
        </>
    )
}

const ModalAuth = ({ open, handleClose }) => {
    const [stepAuth, setStepAuth] = useState('');

    const handleStepAuth = (step) => {
        setStepAuth(step);
    }

    return (
        <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            {
                stepAuth === '' ? <ContentModal>
                    <BasicStep handleStepAuth={handleStepAuth} />
                </ContentModal> : stepAuth === 'login' ? <ContentModal>
                    <LoginStep handleStepAuth={handleStepAuth} />
                </ContentModal> : <ContentModal>
                    <RegisterStep handleStepAuth={handleStepAuth} />
                </ContentModal>
            }
        </Modal>
    )
}

export default ModalAuth