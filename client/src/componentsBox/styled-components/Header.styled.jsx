import styled from 'styled-components';

export const HeaderBox = styled.header`
    background: #007FFF;
    width: 100%;
    height: 10vh;
    padding: 0 20px;
    position: fixed;
    z-index: 10;

    display: flex;
    justify-content: space-between;
    align-items: center;

    .header-logo a {
        font-size: 30px;
        color: white;
    }

    .header-list {
        display: flex;
        align-items: center;
        ul {
            display: flex;
            align-items: center;
            margin: 0;
            
            button {
                margin-right: 20px;
            }
        
            li {
                cursor: pointer;
                margin-right: 20px;
                font-size: 18px;
                color: #fff;
            }

            li:last-child {
                margin-right: 0;
            }
        } 
    }
`;