import React from "react";
import { StyledInput, StyledLabel, SwitchButton } from "./Switch.Styled";

const Switch = ({ isOn, handleToggle }) => {
  return (
    <>
      <StyledInput
        id={`react-switch-new`}
        type="checkbox"
        checked={isOn}
        onChange={() => handleToggle()}
      />
      <StyledLabel
        style={{ background: isOn && "#06D6A0" }}
        className="react-switch-label"
        htmlFor={`react-switch-new`}
      >
        <SwitchButton />
      </StyledLabel>
    </>
  );
};

export default Switch;
