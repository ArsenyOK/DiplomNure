import React from "react";
import { ErrorMessageBlock } from "./ErrorMessage.styled";

const ErrorMessage = ({ text }) => {
    return <ErrorMessageBlock>{text}</ErrorMessageBlock>;
};

export default ErrorMessage;
