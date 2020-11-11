import React from "react";
import { compose } from "recompose";
import { Link } from "react-router-dom";

import * as ROUTES from "../../constants/routes";
import { withAuthorization, AuthUserContext } from "../Session";
import { withFirebase } from "../Firebase";
import {
  StyledNumEntries,
  StyledInformationContainer,
  StyledSpentOnGas,
  StyledMPG,
  StyledButtonDiv,
} from "./Home.styled";

import Spinner from "../Spinner";

const INITIAL_STATE = {
  entries: null,
  loading: true,
  error: null,
  totalSpent: null,
  avgEfficiency: null,
  chartData: null,
};

class HomePageBase extends React.Component {
  constructor(props) {
    super(props);
    this.state = { ...INITIAL_STATE };
  }

  componentDidMount() {
    this.authSubscription = this.props.firebase.auth.onAuthStateChanged(
      (user) => {
        this.onGetEntries(user);
      }
    );
  }

  onGetEntries = (user) => {
    try {
      this.setState({ loading: true });

      this.props.firebase.db
        .ref(`gasEntries/${user.uid}`)
        .once("value", (snapshot) => {
          const entriesObject = snapshot.val();

          if (entriesObject) {
            const entriesList = Object.keys(entriesObject).map((key) => ({
              ...entriesObject[key],
              uid: key,
            }));
            const total = totalSpent(entriesList);
            const avg = avgMPG(entriesList);
            this.setState({
              entries: entriesList,
              loading: false,
              totalSpent: total,
              avgEfficiency: avg,
            });
          } else {
            this.setState({ entries: null, loading: false });
          }
        });
    } catch (err) {
      console.log(err);
      this.setState({ loading: false, error: err });
    }
  };

  componentWillUnmount() {
    this.props.firebase.gasEntries().off();
    this.authSubscription();
  }

  render() {
    const { loading, entries, totalSpent, avgEfficiency, error } = this.state;
    return (
      <AuthUserContext.Consumer>
        {(authUser) => (
          <div>
            <h1>Home Page</h1>
            {loading && <Spinner />}
            {error && <div>ERROR:</div>}
            {entries && (
              <StyledInformationContainer>
                <StyledNumEntries>{entries.length}</StyledNumEntries>
                <StyledSpentOnGas>{`$${
                  Math.round(totalSpent * 100) / 100
                }`}</StyledSpentOnGas>
                <StyledMPG>{`${
                  Math.round(avgEfficiency * 100) / 100
                } l/100 km`}</StyledMPG>
                {/* <Card header="Monthly AVG Cost" body={MpgChart(entries)} /> */}
              </StyledInformationContainer>
            )}

            {/* {!cars && <div>There are no cars...</div>} */}
            <StyledButtonDiv>
              <Link to={ROUTES.DATA_ENTRY}>
                <button>Add an entry</button>
              </Link>
            </StyledButtonDiv>
          </div>
        )}
      </AuthUserContext.Consumer>
    );
  }
}

const totalSpent = (entries) => {
  const reducer = (acc, currval) => acc + currval;
  const total = entries.map((x) => parseFloat(x.cost)).reduce(reducer);

  return total;
};

const avgMPG = (entries) => {
  const reducer = (acc, currval) => acc + currval;
  const entrympg = entries
    .map((e) => (e.liters / e.mileage) * 100)
    .reduce(reducer);
  const avg = entrympg / entries.length;
  return avg;
};

// const summarizeData = (entries) => {
//   //might bnot be necessary
//   entries.forEach((e) => (e.month = new Date(e.dateAdded).getMonth() + 1));

//   //Fields to summarize
//   const keys = ["cost", "liters", "mileage"];

//   const monthlyData = entries.reduce((acc, cur) => {
//     //keep count of records for averaging
//     if (acc.hasOwnProperty(cur.month) === false) {
//       acc[cur.month] = { records: 1 };
//     } else {
//       acc[cur.month].records += 1;
//     }
//     //loop through fields to summarize
//     keys.forEach((prop) => {
//       acc[cur.month].hasOwnProperty(prop)
//         ? (acc[cur.month][prop] += Number(cur[prop]))
//         : (acc[cur.month][prop] = Number(cur[prop]));
//     });
//     return acc;
//   }, {});

//   const graphData = Object.entries(monthlyData).map((e) => ({
//     month: parseInt(e[0], 10),
//     ...e[1],
//   }));

//   return graphData;
// };

const condition = (authUser) => !!authUser;

//export default compose(withFirebase, withAuthorization(condition))(HomePage);
export default compose(
  withFirebase,
  withAuthorization(condition)
)(HomePageBase);
