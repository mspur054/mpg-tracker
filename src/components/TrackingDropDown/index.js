import React from "react";

import { StyledTrackingDropDown } from "./TrackingDropDown.styled";
import DropDown from "react-dropdown";

const TrackingDropDown = ({ ddCars, defaultOption, onChange, ...props }) => {
  return (
    <StyledTrackingDropDown>
      <DropDown
        className="custom-drop"
        options={ddCars}
        value={defaultOption}
        onChange={onChange}
        placeholder="Select a car"
      />
    </StyledTrackingDropDown>
  );
};

export default TrackingDropDown;
