import React from "react";
import { CustomStyledBtn } from "./styled/CustomStyledBtn";

const CustomBtn = ({ text, color, bg, onClick, hover, type, boxShadow }) => {
    return (
        <CustomStyledBtn
            type={type ? type : "button"}
            color={color}
            bg={bg}
            boxShadow={boxShadow}
            hover={hover}
            onClick={onClick}
        >
            {text}
        </CustomStyledBtn>
    );
};

export default CustomBtn;
