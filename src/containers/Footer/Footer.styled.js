import styled from "styled-components";

export const StyledFooter = styled.footer`
  padding: 1rem;
  width: 88%;
  margin: auto;
`;

export const StyledOuterContainer = styled.div`
  justify-content: stretch;
  justify-items: start;
  display: grid;
  @media (min-width: 400px) {
    grid-template-columns: repeat(6, 1fr);
  }
  @media screen and (min-width: 900px) {
    grid-template-columns: repeat(12, 1fr);
  }
  grid-template-rows: auto;
`;

export const StyledAbout = styled.div`
  text-align: left;
  @media (min-width: 400px) {
    grid-column: 1 / 6;
  }
  grid-column: 1 / 6;
  padding-right: 15px;
  padding-left: 15px;
`;

export const StyledLinks = styled.div`
  
  @media (min-width: 400px) {
    grid-column: 1/6;
    grid-row: auto;
  }
  @media screen and (min-width: 900px) {
  grid-column 7 / 12;
  }

  grid-row: 1;
  padding-right: 15px;
  padding-left: 15px;

  ul > li {
    list-style-type: none;

  }
`;
