import React from "react";

import LineGraph from "../../components/LineGraph";
import {
  StyledBAN,
  StyledGridContainer,
  StyledGraphContainer,
  StyledLabel,
} from "./GraphContainer.Styled";

const GraphContainer = (props) => {
  return (
    <StyledGridContainer>
      <StyledBAN className="ban-spent">
        {props.totalCost
          ? `$${props.totalCost}` + <StyledLabel>Spent</StyledLabel>
          : "N/A"}
      </StyledBAN>
      <StyledBAN className="ban-mpg">
        {/* !TODO add KM / Miles */}
        {props.averageMetricMPG
          ? props.averageMetricMPG.toFixed(2) +
            <StyledLabel>L/100 KM</StyledLabel>
          : "N/A"}
      </StyledBAN>
      <StyledBAN className="ban-distance">
        {/* !TODO add KM / Miles */}
        {props.totalDistance ? props.totalDistance : "N/A"}
        <StyledLabel>Tracked KM</StyledLabel>
      </StyledBAN>
      <StyledGraphContainer>
        <LineGraph entries={props.entries} />
      </StyledGraphContainer>
    </StyledGridContainer>
  );
};

export default GraphContainer;
