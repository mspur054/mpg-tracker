import styled from "styled-components";

export const StyledGrid = styled.div`
  max-width: 100%;
  display: grid;

  grid-gap: 2rem;
  grid-template-columns: 1fr;

  margin: 0 auto;
  justify-content: center;
  -webkit-box-pack: center;
  position: relative;

  @media (min-width: 400px) {
    // background-color: purple;
    grid-template-columns: 1fr;
  }

  @media screen and (min-width: 900px) {
    grid-template-columns: repeat(3, 1fr);
    grid-gap: 1rem;

    // background-color: lightgreen;
  }
`;
