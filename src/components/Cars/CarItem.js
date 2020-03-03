import React, { useState, useEffect } from "react";
import { CARS } from "../../constants/routes";
import { Link } from "react-router-dom";

import {
  StyledCarItem,
  StyledCarItemLi,
  StyledCarItemButton,
  StyledCarItemInput
} from "./CarItem.styled";

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
    <StyledCarItemLi>
      {authUser.uid === car.userId && (
        <StyledCarItem>
          {editMode ? (
            <>
              <StyledCarItemInput
                name="carname"
                value={state.car.carname}
                onChange={onEditCarFields}
                type="text"
              />
              <StyledCarItemInput
                name="year"
                value={state.car.year}
                onChange={onEditCarFields}
                type="text"
              />

              <span>
                <StyledCarItemButton onClick={onSaveCarEdits}>
                  Save
                </StyledCarItemButton>
                <StyledCarItemButton onClick={onToggleEditMode}>
                  Reset
                </StyledCarItemButton>
              </span>
            </>
          ) : (
            <>
              <span>
                <Link
                  to={{
                    pathname: `${CARS}/${state.car.uid}`,
                    state: { ...car }
                  }}
                >
                  <strong>{state.car.carname}</strong>
                </Link>{" "}
                - {car.year}
                {car.editedAt && <span> (Edited)</span>}
              </span>
              <StyledCarItemButton onClick={onToggleEditMode}>
                Edit
              </StyledCarItemButton>
            </>
          )}

          {!editMode && (
            <StyledCarItemButton
              type="button"
              onClick={() => onDeleteCar(authUser.uid, car.uid)}
            >
              Delete
            </StyledCarItemButton>
          )}
        </StyledCarItem>
      )}
    </StyledCarItemLi>
  );
};

export default CarItem;
