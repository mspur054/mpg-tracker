import React from "react";

import { StyledCardHeader, StyledCardH4 } from "./Card.Styled";

const Card = ({ header, body, ...props }) => {
  return (
    <article>
      <CardHeader header={header}></CardHeader>
      <div>{body}</div>
    </article>
  );
};

export default Card;

const CardHeader = ({ header, ...props }) => {
  return (
    <StyledCardHeader {...props}>
      <StyledCardH4>{header}</StyledCardH4>
    </StyledCardHeader>
  );
};
