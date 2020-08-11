import React from "react";
import { Link } from "react-router-dom";

import { StyledFooter } from "./Footer.styled";

const Footer = () => {
  return (
    <StyledFooter>
      <div>
        <p>
          Made with ❤ by <Link>Matt Spurdle</Link>
        </p>
      </div>
    </StyledFooter>
  );
};

export default Footer;
