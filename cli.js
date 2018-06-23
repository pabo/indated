#!/usr/bin/env node
const minimist = require('minimist');
const table = require('markdown-table')
const { getOutdatedPackageData, tryToParseJson, generateDataTable } = require("./lib/index.js");

/* usage
  --major / --no-major: output major diffs or don't (default: true)
  --minor / --no-minor: output minor diffs or don't (default: false)
  --patch / --no-patch: output patch diffs or don't (default: false)
*/

const defaultArgs = {
  major: true,
  minor: false,
  patch: false
};

const argv = minimist(process.argv.slice(2));
const args = Object.assign({}, defaultArgs, argv);

console.log('building package tree... (this may take a while)');

getOutdatedPackageData().then(({ stdout }) => {
  // https://github.com/npm/npm/issues/17266
  // npm outdated always exits with non-0 exit code, so this `then` is useless 
}).catch(({ error, stdout }) => {
  // https://github.com/npm/npm/issues/17266
  // npm outdated always exits with non-0 exit code, so we always get into this `catch`

  // console.error("something went wrong: ", error);
  // process.exit(1);

  const packageData = tryToParseJson(stdout);

  const dataTable = generateDataTable({packageData, major: args.major, minor:args.minor, patch:args.patch});

  console.log(table([
    ["package", "level", "difference"], ...dataTable
  ]));
});