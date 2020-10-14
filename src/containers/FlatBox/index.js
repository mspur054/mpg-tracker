import React from "react";
import { Link } from "react-router-dom";

import { StyledOuterBox, StyledInnerBox } from "./FlatBox.styled";
const FlatBox = (props) => {
  const { heading, desc } = props;
  return (
    <StyledOuterBox>
      <StyledInnerBox>
        <header>
          <div>
            <h3>{heading}</h3>
            <p>{desc}</p>
          </div>
        </header>
        <Link></Link>
      </StyledInnerBox>
    </StyledOuterBox>
  );
};

export default FlatBox;
