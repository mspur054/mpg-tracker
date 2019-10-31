import React, { useState } from "react";

import { StyledDropDown } from "./DropDown.styled";

const INITIAL_STATE = {
  showMenu: false
};

const DropDown = ({ cars, ...props }) => {
  const [state, setState] = useState(INITIAL_STATE);

  //   useEffect(() => {
  //     setState(prevState => ({ ...prevState }));
  //   });

  const handleClick = event => {
    setState(state => ({ showMenu: !state.showMenu }));

    event.preventDefault();
  };

  const doChangeSelectedCar = event => {
    props.onSelectCar(event.target.value);

    event.preventDefault();
  };

  return (
    <StyledDropDown>
      <button onClick={handleClick}>Select a car</button>

      {state.showMenu ? (
        <div className="dd-list">
          {cars.map(car => (
            <button
              className="dd-list-item"
              onClick={doChangeSelectedCar}
              key={car.uid}
              value={car.uid}
            >
              {car.carname}
            </button>
          ))}
        </div>
      ) : null}
    </StyledDropDown>
  );
};

export default DropDown;
