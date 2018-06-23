const { promisify } = require('util');
const { exec } = require('child_process');

const execPromise = promisify(exec);

module.exports.getOutdatedPackageData = () => {
  return execPromise('npm outdated --json --silent');
};

module.exports.tryToParseJson = (text) => {
  try {
    return JSON.parse(text);
  } catch (e) {
    console.error(`Could not parse input as JSON. ${e}`);
    process.exit(1);
  }
}

module.exports.generateDataTable = ({packageData, major, minor, patch}) => {
  return Object.keys(packageData).map((packageName) => {
    const {
      current,
      latest
    } = packageData[packageName];

    [currentMajor, currentMinor, currentPatch] = current.split(".");
    [latestMajor, latestMinor, latestPatch] = latest.split(".");

    let level = "";
    let diff = "";

    if (latestMajor > currentMajor) {
      if (major) {
        level = "major";
        diff = latestMajor - currentMajor;
      }
    } else if (latestMinor > currentMinor) {
      if (minor) {
        level = "minor";
        diff = latestMinor - currentMinor;
      }
    } else if (latestPatch > currentPatch) {
      if (patch) {
        level = "patch";
        diff = latestPatch - currentPatch;
      }
    }

    return [packageName, level, diff];
  }).filter((a) => {
    return a[1];
  }).sort((a, b) => {
    if (a[1] === b[1]) {
      return b[2] - a[2];
    }

    return (a[1] < b[1] ? -1 : 1);
  });
}