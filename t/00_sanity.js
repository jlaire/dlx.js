var tap = require("tap");
var convert = require("../lib/convert.js");
var LinkedMatrix = require("../lib/LinkedMatrix.js");
var dlx = require("../");

tap.test("all files loaded", function(t) {
	t.plan(10);

	t.ok(convert, "lib/convert.js exists");
	t.ok(LinkedMatrix, "lib/LinkedMatrix.js exists");
	t.ok(dlx, "index.js exists");

	t.ok(convert.dense_to_sparse, "convert.dense_to_sparse exists");
	t.ok(convert.sparse_to_dense, "convert.sparse_to_dense exists");
	t.ok(LinkedMatrix.from_dense, "LinkedMatrix.from_dense exists");
	t.ok(LinkedMatrix.from_sparse, "LinkedMatrix.from_sparse exists");
	t.ok(dlx.solve_dense_matrix, "dlx.solve_dense_matrix exists");
	t.ok(dlx.solve_sparse_matrix, "dlx.solve_sparse_matrix exists");
	t.ok(dlx.solve, "dlx.solve exists");

	t.end();
});
