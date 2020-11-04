import React, { useEffect, useState, useContext } from "react";
import { compose } from "recompose";

import { ENTRIES } from "../../constants/routes";
import { withFirebase } from "../Firebase";
import { Link } from "react-router-dom";
import { withUnits, UnitContext, withAuthorization } from "../Session";

import GraphContainer from "../../containers/GraphContainer";

const Car = (props) => {
  const { carname, dateAdded, year, uid, userId } = props.location.state;

  const { isMetric } = useContext(UnitContext);

  const [state, setState] = useState({
    loading: true,
    entries: null,
    summaryData: null,
  });

  useEffect(() => {
    let entries;
    const ref = props.firebase.db
      .ref(`gasEntries/${userId}`)
      .orderByChild("carId")
      .equalTo(uid);
    const listener = ref.on("value", (snapshot) => {
      const carObject = snapshot.val();
      if (carObject) {
        const carList = Object.keys(carObject).map((key) => ({
          ...carObject[key],
          uid: key,
        }));
        //setState({ entries: carList });
        entries = carList;
      }
    });
    console.log(entries);

    const summaryRef = props.firebase.db.ref(`summaryStats/${uid}`);
    console.log(uid);
    summaryRef.on("value", (snapshot) => {
      const summaryObj = snapshot.val();
      console.log(summaryObj);
      if (summaryObj) {
        setState({
          entries: entries,
          loading: false,
          summaryData: summaryObj,
        });
      }
    });

    return () => ref.off("value", listener);
  }, [props.firebase.db, userId, uid]);

  const numEntries = state.entries ? (
    <GraphContainer
      entries={state.entries}
      isMetric={isMetric}
      {...state.summaryData}
    />
  ) : (
    <div>no entries yet</div>
  );

  //TODO: Add Fuel ups, best L/KM, last L/KM, Trend, KM tracked, total spent

  return (
    <div>
      <h1>
        {year} {carname}
      </h1>
      <p>Added on {new Date(dateAdded).toDateString()}</p>

      <div>{numEntries}</div>
      <div>
        {" "}
        <Link
          to={{
            pathname: `${ENTRIES}/${uid}`,
            state: { ...props.location.state },
          }}
        >
          <strong>View Entries</strong>
        </Link>
      </div>
    </div>
  );
};

const condition = (authUser) => !!authUser;

export default compose(
  withFirebase,
  withUnits,
  withAuthorization(condition)
)(Car);
