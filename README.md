[![GitHub license](https://img.shields.io/badge/license-MIT-blue.svg)](https://github.com/pabo/indated/blob/master/LICENSE) [![Coverage Status](https://img.shields.io/badge/dynamic/json.svg?label=coverage&url=https%3A%2F%2Fraw.githubusercontent.com%2Fpabo%2Findated%2Fnext%2Fcoverage%2Fcoverage-summary.json&query=%24.total.lines.pct&suffix=%)](https://github.com/pabo/indated/blob/master/coverage/coverage-summary.json) [![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](https://github.com/pabo/indated/)

# Indated

It's better to be indated than outdated!

Analyze your npm project's dependencies to determine how many major/minor/patch versions behind each one is.

---
<!-- TOC -->

- [Indated](#indated)
  - [Contents](#contents)
  - [Installation](#installation)
  - [Usage](#usage)
  - [Options](#options)
  - [Example Output](#example-output)

<!-- /TOC -->

## Installation

```
$ npm install --save-dev indated
```

## Usage

assuming you have `./node_modules/.bin/` in your path, just run
```
$ indated
```

or, if you have npm > 5.2.0
```
$ npx indated
```

otherwise, run
```
$ node_modules/.bin/indated
```

## Options

By default, `indated` will generate a markdown table listing your project's dependencies that are one or more **major** versions behind the latest available. It does this by leveraging output from `npm outdated`.

You can easily add **minor** and **patch** versions to the output with `--minor` and `--patch`, and disable **major** with `--no-major`.

Example: show all dependencies that differ from latest only by minor version:
```
$ indated --no-major --minor
```

## Example Output

```
$ indated --major --minor
building package tree... (this may take a while)
| package | level | difference |
| ------- | ----- | ---------- |
| jest    | minor | 1          |
```