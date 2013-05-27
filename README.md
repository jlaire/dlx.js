dlx
===

An implementation of Knuth's Dancing Links algorithm for the exact cover
problem. Many combinatoric problems, such as Sudoku and N-queens, can be
reduced to exact cover problems and solved with the same algorithm.

Usage:
```
var dlx = require("dlx");
var matrix = [
	[0, 0, 1, 0, 1, 1, 0],
	[1, 0, 0, 1, 0, 0, 1],
	[0, 1, 1, 0, 0, 1, 0],
	[1, 0, 0, 1, 0, 0, 0],
	[0, 1, 0, 0, 0, 0, 1],
	[0, 0, 0, 1, 1, 0, 1],
];

var solutions = dlx.solve(matrix);
// solutions is [[0, 3, 4]];
```

Run tests:
```
npm install
npm test
```
