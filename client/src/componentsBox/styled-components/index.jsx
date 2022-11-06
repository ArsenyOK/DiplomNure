import styled from 'styled-components';

export const AppWrapper = styled.div`
    padding: 0 0 0 0;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
`;

export const Main = styled.main`
    min-height: 80vh;
`;

export const ContentModal = styled.div`
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 500px;
    height: 250px;
    background: #fff;
    box-shadow: 24;
    padding: 10px;
    border-radius: 12px;

    display: flex;
    flex-direction: column;
    justify-content: space-around;
    align-items: center;

    .container-login {
        margin-bottom: 20px;
    } 
`;