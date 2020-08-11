import styled from "styled-components";

export const StyledEntriesItem = styled.li`
  list-style: none;
`;

export const StyledEntryContainer = styled.div`
  padding: 1rem;

  table {
    border-spacing: 0;
    border: 1px solid black;
    margin: 0 auto;

    tr {
      :last-child {
        td {
          border-bottom: 0;
        }
      }
    }

    th,
    td {
      margin: 0;
      padding: 0.5rem;
      border-bottom: 1px solid black;
      border-right: 1px solid black;

      :last-child {
        border-right: 0;
      }
    }
  }
`;
