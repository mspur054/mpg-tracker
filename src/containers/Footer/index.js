import React from "react";

import { StyledFooter } from "./Footer.styled";

const Footer = () => {
  return (
    <StyledFooter>
      <div>
        <p>
          Made with ❤ by{" "}
          <a
            target="_blank"
            rel="noopener noreferrer"
            href="https://github.com/mspur054/"
          >
            Matt Spurdle
          </a>
        </p>
      </div>
    </StyledFooter>
  );
};

export default Footer;
