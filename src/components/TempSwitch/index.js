import React from "react";

import Switch from "../Switch";

import { SwitchContainer } from "./TempSwitch.Styled";

const TempSwitch = ({ isOn, handleToggle }) => {
  return (
    <SwitchContainer>
      <div>Imperial (MPG)</div>

      <div>
        <Switch isOn={isOn} handleToggle={handleToggle} />
      </div>
      <div>
        Metric <br />
        (L/100 Km)
      </div>
    </SwitchContainer>
  );
};

export default TempSwitch;
