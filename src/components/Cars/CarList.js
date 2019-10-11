import React from "react";

import CarItem from "./CarItem";

const CarList = ({ authUser, onEditCar, onDeleteCar, cars }) => {
  return (
    <ul>
      {cars.map(car => (
        <CarItem
          authUser={authUser}
          key={car.uid}
          car={car}
          onEditCar={onEditCar}
          onDeleteCar={onDeleteCar}
        />
      ))}
    </ul>
  );
};

export default CarList;
