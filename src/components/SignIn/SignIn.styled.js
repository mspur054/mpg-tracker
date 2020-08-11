import styled from "styled-components";

export const StyledSignInForm = styled.form`
  padding: 0;

  div {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    margin-bottom: 15px;
  }

  div > label {
    flex: 1 0 100%;
    text-align: left;
  }

  div > label + * {
    flex: 1 0 100%;
  }
  input {
    box-sizing: border-box;
  }

  input {
    border-radius: 3px;
    border: 2px solid #ccc;
    padding: 6px 12px;
  }
  label {
    font-weight: 600;
    margin-bottom: 5px;
  }

  input:focus {
    border: 2px solid #00bfff;
  }
`;
