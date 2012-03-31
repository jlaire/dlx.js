var test = require("tap").test;
var dlx = require("../dlx");

console.log(Object.keys(dlx));

test("conversion between dense and sparse matrices", function(t) {
	t.plan(7);

	var F = false;
	var T = true;
	var dense = [
		[F,F,T,F,T,T,F],
		[T,F,F,T,F,F,T],
		[F,T,T,F,F,T,F],
		[T,F,F,T,F,F,F],
		[F,T,F,F,F,F,T],
		[F,F,F,T,T,F,T]
	];
	var sparse = [
		[2,4,5],
		[0,3,6],
		[1,2,5],
		[0,3],
		[1,6],
		[3,4,6]
	];

	t.ok(dlx, "dlx loaded");
	t.ok(dlx.dense_to_sparse, "dense_to_sparse() exists");
	t.ok(dlx.sparse_to_dense, "sparse_to_dense() exists");
	t.deepEqual(dlx.dense_to_sparse([]), [], "dense_to_sparse: empty matrix");
	t.deepEqual(dlx.dense_to_sparse(dense), sparse, "dense_to_sparse: Knuth's example");
	t.deepEqual(dlx.sparse_to_dense([]), [], "sparse_to_dense: empty matrix");
	t.deepEqual(dlx.sparse_to_dense(sparse), dense, "sparse_to_dense: Knuth's example");
	t.end();
});
