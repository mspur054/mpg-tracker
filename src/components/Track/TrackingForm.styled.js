import styled from "styled-components";

export const StyledTrackingForm = styled.ul`
  padding: 0;

  li {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
  }

  li > label,
  li p {
    flex: 1 0 120px;
    max-width: 220px;
  }

  li > label + * {
    flex: 1 0 220px;
  }

  li button {
    margin-left: auto;
    padding: 8px 16px;
    border: none;
    text-transform: uppercase;
    letter-spacing: 0.09em;
    border-radius: 2px;
  }
`;
