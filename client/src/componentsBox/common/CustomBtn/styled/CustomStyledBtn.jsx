import styled from "styled-components";

export const CustomStyledBtn = styled.button`
    padding: 6px 16px;
    color: ${(props) => (props.color ? props.color : "#fff")};
    text-transform: uppercase;
    background: ${(props) => (props.bg ? props.bg : "grey")};
    transition: all 0.3s ease;
    font-size: 0.875rem;
    min-width: 64px;
    border-radius: 4px;
    line-height: 1.75;
    border: none;
    box-shadow: ${(props) => props.boxShadow && props.boxShadow};

    &:hover,
    &:focus,
    &:active {
        background: ${(props) => props.hover && props.hover};
        box-shadow: 0px 2px 4px -1px rgb(0 0 0 / 20%),
            0px 4px 5px 0px rgb(0 0 0 / 14%), 0px 1px 10px 0px rgb(0 0 0 / 12%);
    }
`;
