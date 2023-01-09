import React from "react";
import { FooterWrapper } from "./styled/footerItem.styled";
import Logo from "./../../images/logo-footer.jpeg";
import LogoFooter from "./styled/LogoFooter";

//©
const Footer = () => {
    return (
        <FooterWrapper>
            {/* <img src={Logo} alt="logo-kitchener" /> */}
            <LogoFooter />
        </FooterWrapper>
    );
};

export default Footer;
