import React, { useEffect, useState } from "react";

import { withFirebase } from "../Firebase";

const Car = props => {
  const { carname, dateAdded, year, uid, userId } = props.location.state;

  const [state, setState] = useState({ loading: true, entries: null });

  useEffect(() => {
    const ref = props.firebase.db
      .ref(`gasEntries/${userId}`)
      .orderByChild("carId")
      .equalTo(uid);
    const listener = ref.on("value", snapshot => {
      const carObject = snapshot.val();
      if (carObject) {
        const carList = Object.keys(carObject).map(key => ({
          ...carObject[key],
          uid: key
        }));
        setState({ loading: false, entries: carList });
      }
    });
    return () => ref.off("value", listener);
  }, [props.firebase.db, userId, uid]);

  const numEntries = state.entries ? (
    <div>
      <p>TOTAL</p>Fuel-ups {state.entries.length}
    </div>
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
    </div>
  );
};

export default withFirebase(Car);
