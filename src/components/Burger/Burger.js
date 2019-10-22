import React from "react";
import { StyledBurger } from "./Burger.styled";
//import PropTypes from 'prop-types'

const Burger = ({ open, changeOpen }) => {
  return (
    <StyledBurger open={open} onClick={() => changeOpen()}>
      <div />
      <div />
      <div />
    </StyledBurger>
  );
};

export default Burger;
