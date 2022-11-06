import styled from "styled-components";

export const RegisterStepStyled = styled.div`
    h2 {
        text-align: center;
    }

    .login-box-fields {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;

        .field-input {
            margin-top: 20px;
        }

        .field-submit {
            margin-top: 20px;
        }
    }
`;

export const ContentModalRegister = styled.div`
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 500px;
    height: auto;
    background: #fff;
    box-shadow: 24;
    padding: 10px;
    border-radius: 12px;
`;