import React, { useEffect, useState } from "react";

const Car = props => {
  const { carname, dateAdded, year } = props.location.state;
  return (
    <div>
      <h3>{carname}</h3>
      <p>This is the car</p>
      <p>{props.match.params.id}</p>
      <p>{props.location.state.carname}</p>
    </div>
  );
};

export default Car;
