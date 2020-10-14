import styled from "styled-components";

export const StyledGrid = styled.div`
  @media (min-width: 970px) {
    grid-template-columns: repeat(3, 1fr);
    -webkit-box-pack: center;
    justify-content: center;
    padding-left: 45px;
    padding-right: 45px;
  }

  @media (min-width: 750px) {
    display: grid;
    grid-column-gap: 30px;
    grid-row-gap: 30px;
  }

  padding-right: 24px;
  padding-left: 24px;
  margin: 0 auto;
`;
