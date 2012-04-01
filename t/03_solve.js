var tap = require("tap");
var dlx = require("../dlx");

tap.test("dlx.solve()", function(t) {
	t.plan(4);
	var solve_dense = function(dense) {
		return dlx.solve(dlx.LinkedMatrix.from_dense(dense));
	};
	t.deepEquals(solve_dense([]), [[]], "empty matrix has an empty solution");
	t.deepEquals(solve_dense([[1]]), [[0]], "trivial solvable case");
	t.deepEquals(solve_dense([[0]]), [], "trivial unsolvable case");
	var dense = [[0,0,1],[0,1,0],[0,1,1],[1,0,0],[1,0,1],[1,1,0],[1,1,1]];
	t.equals(solve_dense(dense).length, 5, "multiple solutions");
	t.end();
});
