const functions = require("firebase-functions");
const admin = require("firebase-admin");

// const helper = require("../src/helper/efficency");

admin.initializeApp();

exports.makeSummary = functions.database
  .ref("/gasEntries/{userId}/{entryId}")
  .onCreate(async (snapshot, context) => {
    const original = snapshot.val();
    const userId = context.params.userId;
    console.log("start");
    console.log("userid", userId);
    const carId = original.carId;

    //TODO: FIX THIS. Broken - figure out how to work on this locally

    // const entriesList = await getCarEntries(userId, carId);

    // console.log(entriesList);

    const analyticsRef = admin.database().ref("summaryStats/" + carId);
    console.debug("ref", analyticsRef);
    return admin
      .database()
      .ref(`/gasEntries/${userId}`)
      .orderByChild("carId")
      .equalTo(carId)
      .once("value")
      .then((snap) => {
        const entriesList = Object.keys(snap.val()).map((key) => ({
          ...snap.val()[key],
          uid: key,
        }));

        const numEntries = snap.numChildren();

        const keys = ["cost", "liters", "mileage"];

        let summaryData = entriesList.reduce(
          (acc, curr) => {
            const keys = ["cost", "liters", "mileage"];

            keys.forEach((field) => {
              acc.hasOwnProperty(field)
                ? (acc[field] += Number(curr[field]))
                : (acc[field] = Number(curr[field]));
            });
            acc["count"] += 1;
            return acc;
          },
          { count: 0 }
        );

        return analyticsRef.set({
          numEntries: numEntries,
          userId: userId,
          totalCost: summaryData.cost,
          totalDistance: summaryData.mileage,
          totalLiters: summaryData.liters,
          averageMetricMPG: metricMPG(summaryData.liters, summaryData.mileage),
          averageMPG: mpg(summaryData.liters, summaryData.mileage),
          dateLastUpdated: admin.database.ServerValue.TIMESTAMP,
        });
      });
  });

async function getCarEntries(userId, carId) {
  if (!userId || !carId) return Promise.reject(new Error("missing params"));

  //entries ref
  const entriesSnap = admin
    .database()
    .ref(`/gasEntries/${userId}`)
    .orderByChild("carId")
    .equalTo(carId)
    .once("value");

  const entriesList = entriesSnap.keys(entriesSnap.val()).map((key) => ({
    ...entriesSnap.val()[key],
    uid: key,
  }));

  return entriesList;
}

function metricMPG(liters, distance) {
  return (liters / distance) * 100;
}

function mpg(liters, distance) {
  return 232.215 / metricMPG(liters, distance);
}
