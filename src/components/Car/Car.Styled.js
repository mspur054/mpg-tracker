import styled from "styled-components";

export const StyledGridContainer = styled.div`
  display: grid;
  //   height: minmax(1fr, 400px);
  // background: coral;
  grid-template-columns: repeat(3, 1fr);
  grid-template-rows: minmax(100px, 30%) auto;
`;

export const StyledBAN = styled.div`
  // background: lightpink;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  font-weight: 600;
  text-transform: uppercase;
  padding: 1rem;

  h1 {
    margin: 0;
  }

  p {
    margin-top: 0;
    font-weight: 400;
  }
`;

export const StyledGraphContainer = styled.div`
  grid-area: 2 / 1 / 3 / 4;
`;
