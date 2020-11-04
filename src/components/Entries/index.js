import React, { useEffect, useState, useContext } from "react";
import { compose } from "recompose";
import { useTable, useSortBy } from "react-table";
import { Link } from "react-router-dom";

import { withFirebase } from "../Firebase";
import {
  AuthUserContext,
  withAuthorization,
  UnitContext,
  withUnits,
} from "../Session";
import { DATA_ENTRY } from "../../constants/routes";
import { formatDate } from "../../helper/helper";
import { kilometersToMiles, litersToGallons } from "../../helper/efficency";

import { StyledEntryContainer } from "./Entries.styled";

const Entries = ({ match, location, ...props }) => {
  const carId = match.params.id;
  const { userId, carname } = location.state;
  const [state, setState] = useState({
    loading: true,
    entries: null,
    test: null,
  });

  const { isMetric } = useContext(UnitContext);

  useEffect(() => {
    const ref = props.firebase.db
      .ref(`gasEntries/${userId}`)
      .orderByChild("carId")
      .equalTo(carId);

    const listener = ref.on("value", (snapshot) => {
      const entriesObject = snapshot.val();
      if (entriesObject) {
        const entriesList = Object.keys(entriesObject).map((key) => ({
          ...entriesObject[key],
          uid: key,
        }));
        // ! TODO: move this to firebase class
        //const test = props.firebase.doSummarizeCarData(userId, carId);

        setState({ loading: false, entries: entriesList });
      } else {
        setState({ loading: false });
      }
    });

    return () => ref.off("value", listener);
  }, [props.firebase.db, carId, userId]);

  const getColumns = (isMetric) => {
    return [
      {
        Header: "Entry",
        columns: [
          {
            Header: "Date",
            accessor: (d) => {
              return formatDate(d.entryDate);
            },
          },
          {
            Header: isMetric ? "Liters" : "Gallons",
            accessor: isMetric
              ? "liters"
              : (d) => {
                  return litersToGallons(d.liters).toFixed(2);
                },
          },
          {
            Header: "Cost",
            accessor: "cost",
          },
          {
            Header: isMetric ? "Mileage (Km)" : "Miles",
            accessor: isMetric
              ? "mileage"
              : (d) => {
                  return kilometersToMiles(d.mileage).toFixed(0);
                },
          },
        ],
      },
    ];
  };

  const columns = React.useMemo(() => getColumns(isMetric), [isMetric]);

  return (
    <AuthUserContext.Consumer>
      {(authUser) => (
        <UnitContext.Consumer>
          {(userSettings) => (
            <div>
              <h1>{`Entries for ${carname}`}</h1>

              {!state.loading && state.entries && (
                <StyledEntryContainer>
                  <Table columns={columns} data={state.entries} />
                </StyledEntryContainer>
              )}
              {!state.loading && state.entries == null && (
                <StyledEntryContainer>
                  <p>
                    No entries yet, <Link to={`${DATA_ENTRY}`}>add one</Link>
                  </p>
                </StyledEntryContainer>
              )}
            </div>
          )}
        </UnitContext.Consumer>
      )}
    </AuthUserContext.Consumer>
  );
};

function Table({ columns, data }) {
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
  } = useTable(
    {
      columns,
      data,
    },
    useSortBy
  );

  // We don't want to render all 2000 rows for this example, so cap
  // it at 20 for this use case
  const firstPageRows = rows.slice(0, 20);

  return (
    <>
      <table {...getTableProps()}>
        <thead>
          {headerGroups.map((headerGroup) => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column) => (
                // Add the sorting props to control sorting. For this example
                // we can add them into the header props
                <th {...column.getHeaderProps(column.getSortByToggleProps())}>
                  {column.render("Header")}
                  {/* Add a sort direction indicator */}
                  <span>
                    {column.isSorted
                      ? column.isSortedDesc
                        ? " 🔽"
                        : " 🔼"
                      : ""}
                  </span>
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {firstPageRows.map((row, i) => {
            prepareRow(row);
            return (
              <tr {...row.getRowProps()}>
                {row.cells.map((cell) => {
                  return (
                    <td {...cell.getCellProps()}>{cell.render("Cell")}</td>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
      <br />
      <div>Showing the first 20 results of {rows.length} rows</div>
    </>
  );
}

const condition = (authUser) => !!authUser;

export default compose(
  withFirebase,
  withAuthorization(condition),
  withUnits
)(Entries);
