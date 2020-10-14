// Function to be exposed
function metricMPG(liters, distance) {
  return (liters / distance) * 100;
}

function mpg(liters, distance) {
  return 282.48 / metricMPG(liters, distance);
}

function milesToKMeters(miles) {
  return 1.60934 * miles;
}

function gallonsToLiters(gallons) {
  return gallons * 3.78541;
}

function kilometersToMiles(km) {
  return km * 0.6214;
}

function litersToGallons(liters) {
  return liters / 3.785;
}

module.exports = {
  metricMPG,
  mpg,
  milesToKMeters,
  gallonsToLiters,
  kilometersToMiles,
  litersToGallons,
};
