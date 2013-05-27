var tap = require("tap");
var convert = require("../lib/convert.js");

tap.test("convert.js: conversion between dense and sparse matrices", function(t) {
	t.plan(5);

	var dense = [
		[0,0,1,0,1,1,0],
		[1,0,0,1,0,0,1],
		[0,1,1,0,0,1,0],
		[1,0,0,1,0,0,0],
		[0,1,0,0,0,0,1],
		[0,0,0,1,1,0,1]
	];
	var sparse = [
		[2,4,5],
		[0,3,6],
		[1,2,5],
		[0,3],
		[1,6],
		[3,4,6]
	];
	t.deepEqual(convert.dense_to_sparse([]), [], "dense_to_sparse: empty matrix");
	t.deepEqual(convert.dense_to_sparse(dense), sparse, "dense_to_sparse: Knuth's example");
	t.deepEqual(convert.sparse_to_dense([]), [], "sparse_to_dense: empty matrix");
	t.deepEqual(convert.sparse_to_dense(sparse), dense, "sparse_to_dense: Knuth's example");
	t.equal(convert.dense_to_sparse([[0]]), null, "dense_to_sparse: all-zeros right-most column");
	t.end();
});
