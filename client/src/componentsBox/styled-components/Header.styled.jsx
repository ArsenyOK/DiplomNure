import styled from "styled-components";

export const HeaderBox = styled.header`
    background: #fff;
    width: 100%;
    height: 10vh;
    padding: 30px 120px;
    position: fixed;
    z-index: 10;
    box-shadow: 0px 3px 1px -2px rgb(0 0 0 / 20%),
        0px 2px 2px 0px rgb(0 0 0 / 14%), 0px 1px 5px 0px rgb(0 0 0 / 12%);

    display: flex;
    justify-content: space-between;
    align-items: center;

    .profile {
        font-size: 18px;
        color: #212121;
        cursor: pointer;
        font-family: Nunito Sans, sans-serif;
    }

    .header-logo {
        a {
            font-size: 30px;
            color: white;
            img {
                height: 30px;
                width: auto;
            }
        }
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
                color: #212121;
                font-family: Nunito Sans, sans-serif;
            }

            li:last-child {
                margin-right: 0;
            }
        }
    }
`;
