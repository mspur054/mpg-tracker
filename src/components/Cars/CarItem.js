import React, { useState, useEffect } from "react";

import { StyledCarItem } from "./CarItem.styled";

const INITIAL_STATE = {
  editMode: false,
  car: {}
};

const CarItem = ({ car, ...props }) => {
  const [state, setState] = useState(INITIAL_STATE);
  const { editMode } = state;
  const { authUser, onDeleteCar } = props;

  useEffect(() => {
    setState({ car: car });
  }, [car]);

  const onToggleEditMode = () => {
    setState(state => ({
      editMode: !state.editMode,
      car
    }));
  };

  const onEditCarFields = event => {
    event.persist();
    const fieldName = event.target.name;
    const fieldValue = event.target.value;

    setState(prevState => ({
      editMode: prevState.editMode,
      car: { ...prevState.car, [fieldName]: fieldValue }
    }));
  };

  const onSaveCarEdits = () => {
    props.onEditCar(car, state.car);

    setState(prevState => ({ ...prevState, editMode: false }));
  };

  return (
    <li>
      {authUser.uid === car.userId && (
        <StyledCarItem>
          {editMode ? (
            <>
              <input
                name="carname"
                value={state.car.carname}
                onChange={onEditCarFields}
                type="text"
              />
              <input
                name="year"
                value={state.car.year}
                onChange={onEditCarFields}
                type="text"
              />

              <span>
                <button onClick={onSaveCarEdits}>Save</button>
                <button onClick={onToggleEditMode}>Reset</button>
              </span>
            </>
          ) : (
            <>
              <span>
                <strong>{state.car.carname}</strong> - {car.year}
                {car.editedAt && <span>(Edited)</span>}
              </span>
              <button onClick={onToggleEditMode}>Edit</button>
            </>
          )}

          {!editMode && (
            <button type="button" onClick={() => onDeleteCar(car.uid)}>
              Delete
            </button>
          )}
        </StyledCarItem>
      )}
    </li>
  );
};

export default CarItem;
