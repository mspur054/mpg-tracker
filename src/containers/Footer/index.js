import React from "react";

import {
  StyledFooter,
  StyledOuterContainer,
  StyledAbout,
  StyledLinks,
} from "./Footer.styled";

const Footer = () => {
  return (
    <StyledFooter>
      <StyledOuterContainer>
        <StyledAbout>
          <h3>FUELLAGE</h3>
          <p>Track your car's gas usage!</p>
        </StyledAbout>
        <StyledLinks>
          <h3>LINKS</h3>
          <ul>
            <li>Link 1</li>
            <li>Link 2</li>
            <li>Link 3</li>
          </ul>
        </StyledLinks>
      </StyledOuterContainer>

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
