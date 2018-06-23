# Indated
## it's way better than being outdated

Analyze your npm project's dependencies to determine how far behind you are.


### Installation
```
$ npm install --save-dev indated
```

### Usage
assuming you have `./node_modules/.bin/` in your path, just run
```
$ indated
```

otherwise, run
```
$ node_modules/.bin/indated
```

### Options
By default, `indated` will generate a markdown table listing your project's dependencies that are one or more **major** versions behind the latest available. It does this by leveraging output from `npm outdated`.

You can easily add **minor** and **patch** versions to the output with `--minor` and `--patch`, and disable **major** with `--no-major`.

Example: show all dependencies that differ from latest only by minor version:
```
$ indated --no-major --minor
```