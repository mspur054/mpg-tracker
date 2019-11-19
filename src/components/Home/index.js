import React, { useState, useEffect } from "react";
import { compose } from "recompose";

import { withAuthorization, AuthUserContext } from "../Session";
import { withFirebase } from "../Firebase";
import {
  StyledNumEntries,
  StyledInformationContainer,
  StyledSpentOnGas,
  StyledMPG
} from "./Home.styled";

const INITIAL_STATE = {
  entries: [],
  loading: false,
  error: null,
  totalSpent: null,
  avgEfficiency: null
};

const HomePageBase = ({ loading, entries, totalSpent, avgEfficiency }) => {
  return (
    <div>
      <h1>Home Page</h1>
      <p>The home page is accessible to signed in users.</p>
      {loading && <div>Loading...</div>}
      {entries && (
        <StyledInformationContainer>
          <StyledNumEntries>{entries.length}</StyledNumEntries>
          <StyledSpentOnGas>{`$${Math.round(totalSpent * 100) /
            100}`}</StyledSpentOnGas>
          <StyledMPG>{`${Math.round(avgEfficiency * 100) /
            100} l/100 km`}</StyledMPG>
        </StyledInformationContainer>
      )}

      {/* {!cars && <div>There are no cars...</div>} */}
    </div>
  );
};

const condition = authUser => !!authUser;

const totalSpent = entries => {
  const reducer = (acc, currval) => acc + currval;
  const total = entries.map(x => parseFloat(x.cost)).reduce(reducer);

  return total;
};

const avgMPG = entries => {
  const reducer = (acc, currval) => acc + currval;
  const entrympg = entries
    .map(e => (e.liters / e.mileage) * 100)
    .reduce(reducer);
  const avg = entrympg / entries.length;
  return avg;
};

const summarizeData = entries => {
  //might bnot be necessary
  entries.forEach(e => (e.month = new Date(e.dateAdded).getMonth()));
  console.log(entries);

  //Fields to summarize
  const keys = ["cost", "liters", "mileage"];
  const monthlyData = entries.reduce((acc, cur) => {
    //keep count of records for averaging
    if (acc.hasOwnProperty(cur.month) === false) {
      acc[cur.month] = { records: 1 };
    } else {
      acc[cur.month].records += 1;
    }
    //loop through fields to summarize
    keys.forEach(prop => {
      acc[cur.month].hasOwnProperty(prop)
        ? (acc[cur.month][prop] += Number(cur[prop]))
        : (acc[cur.month][prop] = Number(cur[prop]));
      console.log(prop);
    });
    return acc;
  }, {});

  return monthlyData;
};

const HomePage = ({ firebase }) => {
  const [state, setState] = useState(INITIAL_STATE);
  //.getUserGasEntries(firebase.auth.currentUser.uid)
  useEffect(() => {
    setState({ loading: true });

    firebase.gasEntries().on("value", snapshot => {
      const entriesObject = snapshot.val();

      if (entriesObject) {
        const entriesList = Object.keys(entriesObject).map(key => ({
          ...entriesObject[key],
          uid: key
        }));
        const avgEfficiency = avgMPG(entriesList);
        const total = totalSpent(entriesList);
        const mpgbymonth = summarizeData(entriesList);
        setState({
          entries: entriesList,
          loading: false,
          totalSpent: total,
          avgEfficiency: avgEfficiency
        });
      } else {
        setState({ entries: null, loading: false });
      }
    });

    //cleanup
    return () => firebase.gasEntries().off();
  }, []);
  return (
    <AuthUserContext.Consumer>
      {authUser => (
        <div>
          <HomePageBase
            totalSpent={state.totalSpent}
            entries={state.entries}
            loading={state.loading}
            avgEfficiency={state.avgEfficiency}
          />
        </div>
      )}
    </AuthUserContext.Consumer>
  );
};

export default compose(withFirebase, withAuthorization(condition))(HomePage);
