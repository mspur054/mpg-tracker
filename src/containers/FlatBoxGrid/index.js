import React from "react";

import { StyledGrid } from "./FlatBoxGrid.styled";

const FlatBoxGrid = (props) => {
  return <StyledGrid>{props.children}</StyledGrid>;
};

export default FlatBoxGrid;
