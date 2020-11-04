import React from "react";

import LineGraph from "../../components/LineGraph";
import {
  StyledBAN,
  StyledGridContainer,
  StyledGraphContainer,
  StyledLabel,
} from "./GraphContainer.Styled";
import { kilometersToMiles } from "../../helper/efficency";

const BAN = ({ banclass, display, label }) => {
  return (
    <StyledBAN className={banclass}>
      {display}
      <StyledLabel>{display === "N/A" ? "" : label}</StyledLabel>
    </StyledBAN>
  );
};

const GraphContainer = (props) => {
  const costDisplay = props.totalCost ? `$${props.totalCost}` : "N/A";
  const mpgDisplay = props.isMetric
    ? !props.averageMetricMPG
      ? "N/A"
      : props.averageMetricMPG.toFixed(2)
    : !props.averageMPG
    ? "N/A"
    : props.averageMPG.toFixed(2);
  const distanceDisplay = !props.totalDistance
    ? "N/A"
    : props.isMetric
    ? props.totalDistance
    : kilometersToMiles(props.totalDistance);

  return (
    <StyledGridContainer>
      <BAN banclass="ban-spent" display={costDisplay} label="Spent" />
      <BAN banclass="ban-mpg" display={mpgDisplay} label="L/100 KM" />
      <BAN
        banclass="ban-distance"
        display={distanceDisplay}
        label="Tracked KM"
      />
      <StyledGraphContainer>
        <LineGraph entries={props.entries} />
      </StyledGraphContainer>
    </StyledGridContainer>
  );
};

export default GraphContainer;
