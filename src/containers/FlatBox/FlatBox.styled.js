import styled from "styled-components";

//https://instapage.com/

export const StyledOuterBox = styled.div`
  margin: 0 auto 60px;

  @media (min-width: 750px) {
    margin-bottom: 30px;
  }

  background-color: #b0e3fb;
  border-radius: 10px;

  box-shadow: 0 4px 3px 0 rgba(34, 90, 182, 0.12),
    0 0 1px 0 rgba(41, 92, 176, 0.25);
  transition: 0.2s;
`;

export const StyledInnerBox = styled.div`
  @media (min-width: 1170px) {
    padding: 50px;
  }

  padding: 30px 30px 40px 30px;
  display: block;
  height: 100%;

  header {
    margin-bottom: 20px;
  }
`;
