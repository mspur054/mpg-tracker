import { createGlobalStyle } from "styled-components";

export const GlobalStyles = createGlobalStyle`
  html, body {
    margin: 0;
    padding: 0;
 
  }

  #root {
    height: 100vh;
    width: 100%;
  }

  // *, *::after, *::before {
  //   box-sizing: border-box;
  // }
  body {
    display: flex;
    justify-content: center;
    align-items: center;
    background: ${({ theme }) => theme.primaryDark};
    color: ${({ theme }) => theme.primaryLight};
    
    text-rendering: optimizeLegibility;
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";
  }
  h1 {
    font-size: 2rem;
    text-align: center;
    text-transform: uppercase;
  }
  img {
    border-radius: 5px;
    height: auto;
    width: 10rem;
  }
  div {
    text-align: center;
  }
  // small {
  //   display: block;
  // }
  button{
    background-color: lightcoral; 
    border: none;
    color: white;
    padding: 10px 25px;
    text-align: center;
    text-decoration: none;
    border-radius: 2px;

  }
  a {
    color: ${({ theme }) => theme.primaryHover};
    text-decoration: none;
  }
  html {
    height: 100%;
  }
  body {
    height: 100%;
  }

  ul {
    padding-inline-start: 0px;

  }


`;
