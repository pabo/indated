<!-- vscode-markdown-toc -->
* 1. [it's way better than being outdated](#itswaybetterthanbeingoutdated)
	* 1.1. [Installation](#Installation)
	* 1.2. [Usage](#Usage)
	* 1.3. [Options](#Options)
	* 1.4. [Example output](#Exampleoutput)

<!-- vscode-markdown-toc-config
	numbering=true
	autoSave=true
	/vscode-markdown-toc-config -->
<!-- /vscode-markdown-toc --># Indated
##  1. <a name='itswaybetterthanbeingoutdated'></a>it's way better than being outdated

Analyze your npm project's dependencies to determine how far behind you are.





###  1.1. <a name='Installation'></a>Installation
```
$ npm install --save-dev indated
```

###  1.2. <a name='Usage'></a>Usage
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

###  1.3. <a name='Options'></a>Options
By default, `indated` will generate a markdown table listing your project's dependencies that are one or more **major** versions behind the latest available. It does this by leveraging output from `npm outdated`.

You can easily add **minor** and **patch** versions to the output with `--minor` and `--patch`, and disable **major** with `--no-major`.

Example: show all dependencies that differ from latest only by minor version:
```
$ indated --no-major --minor
```

###  1.4. <a name='Exampleoutput'></a>Example output
```
$ indated --major --minor
building package tree... (this may take a while)
| package | level | difference |
| ------- | ----- | ---------- |
| jest    | minor | 1          |
```