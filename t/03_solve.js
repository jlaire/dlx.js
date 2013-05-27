var tap = require("tap");
var dlx = require("../");

tap.test("dlx.solve()", function(t) {
	t.plan(4);
	t.deepEquals(dlx.solve_dense_matrix([]), [[]], "empty matrix has an empty solution");
	t.deepEquals(dlx.solve_dense_matrix([[1]]), [[0]], "trivial solvable case");
	t.deepEquals(dlx.solve_dense_matrix([[0]]), [], "trivial unsolvable case");
	var dense = [[0,0,1],[0,1,0],[0,1,1],[1,0,0],[1,0,1],[1,1,0],[1,1,1]];
	t.equals(dlx.solve_dense_matrix(dense).length, 5, "multiple solutions");
	t.end();
});
