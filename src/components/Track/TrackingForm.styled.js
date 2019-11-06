import styled from "styled-components";

export const StyledTrackingFormInput = styled.input`
  border: none;
`;

export const StyledTrackingLabel = styled.label`
  flex: 1 0 auto;
`;

export const StyledTrackingForm = styled.ul`
  padding: 0;

  li {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
  }

  li > input {
    margin: 2% 0 2% 0;
  }

  li > label,
  li p {
    flex: 1 0 120px;
    max-width: 280px;
  }

  li > label + * {
    flex: 1 0 280px;
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
