var tap = require("tap");
var dlx = require("../dlx");

tap.test("conversion between dense and sparse matrices", function(t) {
	t.plan(5);

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
	t.deepEqual(dlx.dense_to_sparse([]), [], "dense_to_sparse: empty matrix");
	t.deepEqual(dlx.dense_to_sparse(dense), sparse, "dense_to_sparse: Knuth's example");
	t.deepEqual(dlx.sparse_to_dense([]), [], "sparse_to_dense: empty matrix");
	t.deepEqual(dlx.sparse_to_dense(sparse), dense, "sparse_to_dense: Knuth's example");
	t.equal(dlx.dense_to_sparse([[F]]), null, "dense_to_sparse: all-zeros rightmost col");
	t.end();
});
