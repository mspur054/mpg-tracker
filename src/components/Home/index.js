import React, { useState, useEffect } from "react";
import { compose } from "recompose";
import {
  VictoryChart,
  VictoryAxis,
  VictoryLine,
  VictoryTooltip
} from "victory";

import { withAuthorization, AuthUserContext } from "../Session";
import { withFirebase } from "../Firebase";
import {
  StyledNumEntries,
  StyledInformationContainer,
  StyledSpentOnGas,
  StyledMPG
} from "./Home.styled";
import Card from "../Card";
import { useAuth } from "../../helper/helper";

const INITIAL_STATE = {
  entries: [],
  loading: false,
  error: null,
  totalSpent: null,
  avgEfficiency: null,
  chartData: []
};

const CHART_INITIAL_STATE = {
  //! FIX THIS
  isLoading: true,
  chartData: []
};

const MpgChart = entries => {
  const [state, setState] = useState(CHART_INITIAL_STATE);

  const today = new Date();
  const monthlyDomain = [today.getMonth() - 2, today.getMonth() + 1];

  useEffect(() => {
    try {
      const monthlyData = summarizeData(entries);

      setState({
        isLoading: false,
        chartData: monthlyData
      });
    } catch (e) {
      console.log(e);
      setState({ isLoading: false });
    }
  }, [entries]);
  //
  const yDomain = [0, getUpperYDomain(state.chartData)];

  return state.isLoading ? (
    <VictoryChart>
      <VictoryLine />
    </VictoryChart>
  ) : (
    <VictoryChart style={{ parent: { maxWidth: "100%" } }}>
      <VictoryLine
        labels={({ datum }) => Math.round(datum.cost)}
        data={state.chartData}
        x="month"
        y="cost"
        // labelComponent={
        //   <VictoryTooltip cornerRadius={2} dy={0} centerOffset={{ x: 25 }} />
        // }
      />
      <VictoryAxis
        crossAxis
        tickFormat={t => `${Math.round(t)}`}
        tickCount={monthlyDomain[1] - monthlyDomain[0]}
        domain={{ x: monthlyDomain }}
      />
      <VictoryAxis dependentAxis domain={{ y: yDomain }} />
    </VictoryChart>
  );
};

const getUpperYDomain = monthlyData => {
  const maxVal = Math.max.apply(
    Math,
    monthlyData.map(function(o) {
      return o.cost;
    })
  );

  return Math.ceil(maxVal / 100) * 100;
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
          <Card header="Monthly AVG Cost" body={MpgChart(entries)} />
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
  entries.forEach(e => (e.month = new Date(e.dateAdded).getMonth() + 1));

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
    });
    return acc;
  }, {});

  const graphData = Object.entries(monthlyData).map(e => ({
    month: parseInt(e[0], 10),
    ...e[1]
  }));

  return graphData;
};

const HomePage = ({ firebase }) => {
  const [state, setState] = useState(INITIAL_STATE);
  const { isLoading, user } = useAuth(firebase.auth);
  console.log("user1", user);
  useEffect(() => {
    async function fetchData() {
      try {
        setState({ loading: true });
        const response = await firebase.getUserGasEntries(user.uid);

        const entries = await response.on("value", snapshot => {
          const entriesObject = snapshot.val();
          console.log(entriesObject);
          if (entriesObject) {
            const entriesList = Object.keys(entriesObject).map(key => ({
              ...entriesObject[key],
              uid: key
            }));
            return entriesList;
          }
        });
        const avgEfficiency = avgMPG(entries);
        const total = totalSpent(entries);
        setState({
          entries: entries,
          loading: false,
          totalSpent: total,
          avgEfficiency: avgEfficiency
        });
      } catch (err) {
        console.log(err);
        setState({ loading: false, entries: null });
      }

      // setState({ loading: true });
      // const unsubscribe = firebase
      //   .getUserGasEntries(user.uid)
      //   .on("value", snapshot => {
      //     const entriesObject = snapshot.val();
      //     console.log(entriesObject);
      //     if (entriesObject) {
      //       const entriesList = Object.keys(entriesObject).map(key => ({
      //         ...entriesObject[key],
      //         uid: key
      //       }));
      //       const avgEfficiency = avgMPG(entriesList);
      //       const total = totalSpent(entriesList);
      //       setState({
      //         entries: entriesList,
      //         loading: false,
      //         totalSpent: total,
      //         avgEfficiency: avgEfficiency
      //       });
      //     } else {
      //       setState({ entries: null, loading: false });
      //     }
      //   });

      // //cleanup
      // //return () => firebase.gasEntries().off();
      // return unsubscribe;
    }
    fetchData();
  }, [user]);
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
