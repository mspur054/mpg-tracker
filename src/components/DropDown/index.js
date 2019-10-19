import React, { useState, useEffect } from "react";
import { defaultProps } from "recompose";

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
    <div>
      <button onClick={handleClick}>Select a car</button>

      {state.showMenu ? (
        <div className="menu">
          {cars.map(car => (
            <button onClick={doChangeSelectedCar} key={car.uid} value={car.uid}>
              {car.carname}
            </button>
          ))}
        </div>
      ) : null}
    </div>
  );
};

export default DropDown;
