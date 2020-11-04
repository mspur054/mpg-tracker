import styled from "styled-components";

//https://instapage.com/

export const StyledOuterBox = styled.div`
  max-width: 1240px;
  // margin: 0 auto 60px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;

  padding: 20px;
  height: 7rem;

  background-color: #b0e3fb;
  border-radius: 10px;

  box-shadow: 0 4px 3px 0 rgba(34, 90, 182, 0.12),
    0 0 1px 0 rgba(41, 92, 176, 0.25);
  transition: 0.2s;

  position: relative;
  top: 0;
  transition: all 0.1s ease-in;

  :hover {
    top: -2px;
    box-shadow: 0 4px 5px rgba(0, 0, 0, 0.2);
  }

  @media (min-width: 900px) {
    margin-bottom: 30px;
  }
`;

export const StyledInnerBox = styled.div`
  // display: block;
  // height: 100%;

  header {
    margin-bottom: 20px;
  }

  // @media (min-width: 500px) {
  //   padding: 80px;
  // }

  // @media (min-width: 900px) {
  //   padding: 50px;
  // }
`;
