import styled from 'styled-components';

export const AppWrapper = styled.div`
    padding: 0 0 0 0;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
`;

export const Main = styled.main`
    min-height: 80vh;
    margin-top: 10vh;
`;

export const ContentModal = styled.div`
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 500px;
    height: 150px;
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

export const CustomBox = styled.div`
    margin-bottom: 10px;
`;