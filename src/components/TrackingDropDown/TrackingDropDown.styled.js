import styled from "styled-components";

export const StyledTrackingDropDown = styled.div`
padding: 0;
  display: flex;
  
  margin: 2% 0 2% 0;

  .custom-drop {
    flex: 1 0 280px;
    color: ${({ theme }) => theme.primaryDark};
    padding: 1% 0 1% 0;
    background-color: #ffecdb;
  }

  }
`;

// .dd-list {
//   z-index: 9999;
//   width: 100%;
//   white-space: nowrap;
//   text-overflow: ellipsis;
//   -webkit-overflow-scrolling: touch;
//   border-bottom-right-radius: 3px;
//   border-bottom-left-radius: 3px;
// }

// .dd-list-item {
//   padding: 8px 10px;
//   line-height: 1.6rem;
//   cursor: default;
//   display: inline-block;
//   white-space: nowrap;
//   text-overflow: ellipsis;

//   &:hover {
//     color: white;
//     background-color: #ffcc01;
//   }
