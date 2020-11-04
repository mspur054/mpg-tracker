import styled from "styled-components";

export const StyledNavContainer = styled.div`
  //   position: relative;
  //   top: 0;
`;

export const StyledMainContainer = styled.div`
  min-height: 100%;
  display: grid;
  grid-template-rows: auto 1fr auto;
  grid-template-columns: 100%;
`;

export const StyledContent = styled.div`
  margin: 0rem 1rem 0rem 1rem;
  // display: flex;
  // width: 100%;
`;

export const StyledMain = styled.main`
  -webkit-flex: 1;
  flex: 1 0 auto;
  position: relative;
  min-width: 1px;
  max-width: 700px;
  margin: 0 auto;
  z-index: 1;
`;
