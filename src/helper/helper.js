import { useState, useEffect } from "react";

export const numberRange = (start, end) => {
  return Array(end - start + 1)
    .fill()
    .map((_, idx) => start + idx);
};

export const useAuth = (auth) => {
  //Hook to get auth user
  const [authState, setState] = useState({
    isLoading: true,
    user: null,
  });

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((authState) =>
      setState({ isLoading: false, user: authState })
    );
    return unsubscribe;
  }, [auth]);
  return authState;
};

export function formatDate(date) {
  var d = new Date(date),
    month = "" + (d.getMonth() + 1),
    day = "" + d.getDate(),
    year = d.getFullYear();

  if (month.length < 2) month = "0" + month;
  if (day.length < 2) day = "0" + day;

  return [year, month, day].join("-");
}
