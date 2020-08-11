import styled from "styled-components";

export const StyledTrackingFormInput = styled.input`
  border: none;
`;

export const StyledTrackingLabel = styled.label`
  flex: 1 0 auto;
  margin-bottom: 5px;
  font-weight: 600;
`;

export const StyledTrackingForm = styled.ul`
  padding: 0;

  li {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    margin-bottom: 15px;
  }

  li > label {
    font-weight: 600;
    margin-bottom: 5px;
  }

  li > input {
    margin: 2% 0 2% 0;
  }

  li > label,
  li p {
    flex: 1 0 280px;
    text-align: left;
  }

  li > label + * {
    flex: 1 0 280px;
  }

  input,
  select {
    border-radius: 3px;
    border: 2px solid #ccc;
    padding: 6px 12px;
  }

  input:focus {
    border: 2px solid #00bfff;
  }

  select {
    width: 100%;
  }
`;

export const StyledTrackingFormButton = styled.button`
  flex: 1 0 60px;
  margin: 5%;
  padding: 8px 16px;
  border: none;
  text-transform: uppercase;
  letter-spacing: 0.09em;
  border-radius: 2px;
`;
