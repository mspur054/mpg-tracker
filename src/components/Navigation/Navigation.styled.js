import styled from "styled-components";

export const StyledMenu = styled.nav`
  display: flex;
  flex-direction: column;
  justify-content: center;
  background: ${({ theme }) => theme.primaryLight};
  height: 100vh;
  text-align: left;
  padding: 0rem 2rem 0rem 2rem;
  position: absolute;
  top: 0;
  left: 0;
  transition: transform 0.3s ease-in-out;
  transform: ${({ open }) => (open ? "translateX(0)" : "translateX(-100%)")};
  z-index: 100;

  @media (max-width: ${({ theme }) => theme.mobile}) {
    width: 80%;
  }

  .main-nav li {
    margin: 15px auto;
  }

  a {
    font-size: 2rem;
    text-transform: uppercase;
    padding: 1rem 0;
    font-weight: bold;
    letter-spacing: 0.5rem;
    color: ${({ theme }) => theme.primaryDark};
    text-decoration: none;
    transition: color 0.3s linear;

    @media (max-width: ${({ theme }) => theme.mobile}) {
      font-size: 1.5rem;
      text-align: center;
    }

    &:hover {
      color: ${({ theme }) => theme.primaryHover};
    }
  }
`;

export const StyledUnitContainer = styled.div``;

export const StyledUnitTitle = styled.p`
  font-size: 1rem;
  text-transform: uppercase;
  padding: 1rem 0;
  font-weight: bold;
  letter-spacing: 0.25rem;
  color: ${({ theme }) => theme.primaryDark};
  text-decoration: none;
`;
