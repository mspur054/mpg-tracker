import React, { useState } from "react";

const INITIAL_STATE = {
  editMode: false,
  car: {}
};

const CarItem = ({ car, ...props }) => {
  const [state, setState] = useState(INITIAL_STATE);
  const { editMode } = state;
  const { authUser, onDeleteCar } = props;

  const onToggleEditMode = () => {
    setState(state => ({
      editMode: !state.editMode,
      car
    }));
  };

  const onEditCarFields = event => {
    setState({ car: { [event.target.name]: event.target.value } });
  };

  const onSaveCarEdits = () => {
    props.onEditCar(car, state.car);

    setState({ editMode: false });
  };

  return (
    <li>
      {editMode ? (
        <>
          <input
            name="carname"
            value={car.carname}
            onChange={onEditCarFields}
            type="text"
          />
          <input
            name="year"
            value={car.year}
            onChange={onEditCarFields}
            type="text"
          />
        </>
      ) : (
        <span>
          <strong>{car.carname}</strong> - {car.year}
          {car.editedAt && <span>(Edited)</span>}
        </span>
      )}

      {authUser.uid === car.userId && (
        <span>
          {editMode ? (
            <span>
              <button onClick={onSaveCarEdits}>Save</button>
              <button onClick={onToggleEditMode}>Reset</button>
            </span>
          ) : (
            <button onClick={onToggleEditMode}>Edit</button>
          )}

          {!editMode && (
            <button type="button" onClick={() => onDeleteCar(car.uid)}>
              Delete
            </button>
          )}
        </span>
      )}
    </li>
  );
};

export default CarItem;
