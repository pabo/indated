const table = require('markdown-table')
const fs = require('fs');


const stdinBuffer = fs.readFileSync(0); // STDIN_FILENO = 0
const input = stdinBuffer.toString();

let packageData;
try {
  packageData = JSON.parse(input);
} catch (e) {
  console.log(`Could not parse input as JSON. ${e}`);
  return;
}

const dataTable = Object.keys(packageData).map((packageName) => {
  const {
    current,
    latest
  } = packageData[packageName];

  [currentMajor, currentMinor, currentPatch] = current.split(".");
  [latestMajor, latestMinor, latestPatch] = latest.split(".");

  let level = "same";
  let diff = "";

  if (latestMajor > currentMajor) {
    level = "major";
    diff = latestMajor - currentMajor;
  }
  else if (latestMinor > currentMinor) {
    level = "minor";
    diff = latestMinor - currentMinor;
  }
  else if (latestPatch > currentPatch) {
    level = "patch";
    diff = latestPatch - currentPatch;
  }

  return [packageName, level, diff];
}).sort((a,b) => {
  if (a[1] === b[1]) {
    return b[2] - a[2];
  }

  return (a[1] < b[1] ? -1 : 1);
});

console.log(table([["package", "level", "difference"], ...dataTable]));