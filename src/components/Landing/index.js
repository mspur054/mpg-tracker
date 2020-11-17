import React from "react";
import { Link } from "react-router-dom";

import * as ROUTES from "../../constants/routes";
import FlatBox from "../../containers/FlatBox";
import FlatBoxGrid from "../../containers/FlatBoxGrid";
//TODO
// Signup button top left
// car image tealish in middle
// do the three panel thingy (vertical 1x3)

const LandingPage = () => {
  return (
    <div>
      <h1>Landing Page</h1>
      <div style={{ marginBottom: "50px" }}>
        <h2>Track your Car's Mileage and Efficiency</h2>
        <h3 style={{ textAlign: "left" }}>
          Fuellage is a web app for tracking your vehicle's efficiency. Gain
          insight into how well your car is running.
        </h3>
        <Link to={ROUTES.SIGN_UP}>
          <button>Get Started</button>
        </Link>
      </div>
      <FlatBoxGrid>
        <FlatBox heading={"Track"} desc={"hello"} />
        <FlatBox heading={"Analyze"} desc={"monitor"} />
        <FlatBox heading={"Analyze"} desc={"monitor"} />
      </FlatBoxGrid>
    </div>
  );
};

export default LandingPage;
