import React from "react";
import { EllipsisSpinner } from "./Spinner.styled";

const Spinner = ({ color, size, sizeUnit }) => (
  <EllipsisSpinner color={color} size={size} sizeUnit={sizeUnit}>
    <div />
    <div />
    <div />
    <div />
  </EllipsisSpinner>
);

Spinner.defaultProps = {
  size: 64,
  color: "#00bfff",
  sizeUnit: "px"
};

export default Spinner;
