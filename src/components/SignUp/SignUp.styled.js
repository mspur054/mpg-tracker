import styled from "styled-components";

export const StyledContainer = styled.div`
    width: 100%
    padding-right: 15px;
    padding-left: 15px;
    margin-right: auto;
    margin-left: auto;
`;

export const StyledRow = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin-right: -15px;
  margin-left: -15px;
  justify-content: center;
`;

export const StyledHeading = styled.div`
  flex: 0 0 100%;
  max-width: 100%;
`;

export const StyledSignUpDiv = styled.div`
  margin-bottom: 2em;

  div {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    margin-bottom: 15px;
  }

  form > div > label {
    flex: 1 0 100%;
    text-align: left;
  }

  label + * {
    flex: 1 0 100%;
  }

  label {
    font-weight: 600;
    margin-bottom: 5px;
  }

  input {
    border-radius: 3px;
    border: 2px solid #ccc;
    padding: 6px 12px;
  }
`;
