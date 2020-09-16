import styled from "styled-components";

export const StyledInput = styled.input`
  height: 0;
  width: 0;
  visibility: hidden;
`;

export const StyledLabel = styled.label`
  display: flex;
  align-items: center;
  justify-content: space-between;
  cursor: pointer;
  width: 80px;
  height: 40px;
  border-radius: 100px;
  border: 2px solid gray;
  position: relative;
  transition: background-color 0.2s;
  background: ${(props) => props.theme.primaryLight};
`;

export const SwitchButton = styled.span`
  content: "";
  position: absolute;
  top: 2px;
  left: 2px;
  width: 36px;
  height: 36px;
  border-radius: 45px;
  transition: 0.2s;
  background: grey;
  box-shadow: 0 0 2px 0 rgba(10, 10, 10, 0.29);
  ${StyledInput}:checked + ${StyledLabel} & {
    left: calc(100% - 2px);
    transform: translateX(-100%);
  }

  ${StyledLabel}:active & {
    width: 45px;
  }
`;

//   .react-switch-checkbox:checked + .react-switch-label .react-switch-button {
//     left: calc(100% - 2px);
//     transform: translateX(-100%);
//   }

//   .react-switch-label:active .react-switch-button {
//     width: 60px;
// `;
