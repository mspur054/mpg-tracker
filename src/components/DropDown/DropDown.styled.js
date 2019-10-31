import styled from "styled-components";

export const StyledDropDown = styled.div`
  position: relative;
  width: 222px;

  .dd-header {
  }

  .dd-list {
    z-index: 9999;
    width: 100%;
    white-space: nowrap;
    text-overflow: ellipsis;
    -webkit-overflow-scrolling: touch;
    border-bottom-right-radius: 3px;
    border-bottom-left-radius: 3px;
  }

  .dd-list-item {
    padding: 8px 10px;
    line-height: 1.6rem;
    cursor: default;
    display: inline-block;
    white-space: nowrap;
    text-overflow: ellipsis;

    &:hover {
      color: white;
      background-color: #ffcc01;
    }
  }
`;
