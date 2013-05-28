dlx
===

An implementation of Knuth's Dancing Links algorithm for the exact cover
problem. Many combinatoric problems, such as Sudoku and N-queens, can be
reduced to exact cover problems and solved with the same algorithm.

Given a two-dimensional array of booleans, the problem is to select a subset of
the rows that sums to [1, 1, 1, ..., 1]. In other words: for every column of
the matrix, exactly one of the chosen rows must contain a one.

Usage:
```
var dlx = require("dlx");
var problem = [
	[0, 0, 1, 0, 1, 1, 0],
	[1, 0, 0, 1, 0, 0, 1],
	[0, 1, 1, 0, 0, 1, 0],
	[1, 0, 0, 1, 0, 0, 0],
	[0, 1, 0, 0, 0, 0, 1],
	[0, 0, 0, 1, 1, 0, 1],
];

var solutions = dlx.solve(problem);
// solutions is [[0, 3, 4]]
```

Run tests:
```
$ npm install
$ npm test
```

See more:

- [Dancing Links on Wikipedia](http://en.wikipedia.org/wiki/Dancing_Links)
- [Knuth's paper (PDF)](http://arxiv.org/pdf/cs.DS/0011047.pdf)
- [dlx-examples](https://github.com/jlaire/dlx-examples)
