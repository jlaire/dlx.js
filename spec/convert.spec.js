describe("convert.js", function () {
	var convert = require("../lib/convert.js");

	it("loads successfully", function () {
		expect(convert).toBeTruthy();
		expect(convert.dense_to_sparse).toBeTruthy();
		expect(convert.sparse_to_dense).toBeTruthy();
	});

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

	describe("dense_to_sparse()", function () {
		it("works with an empty matrix", function () {
			expect(convert.dense_to_sparse([])).toEqual([]);
		});

		it("returns null when conversion is impossible", function () {
			expect(convert.dense_to_sparse([[0]])).toEqual(null);
		});

		it("works with Knuth's example matrix", function () {
			expect(convert.dense_to_sparse(dense)).toEqual(sparse);
		});
	});

	describe("sparse_to_dense()", function () {
		it("works with an empty matrix", function () {
			expect(convert.sparse_to_dense([])).toEqual([]);
		});

		it("works with a simple case", function () {
			expect(convert.sparse_to_dense([[0]])).toEqual([[1]]);
		});

		it("works with Knuth's example matrix", function () {
			expect(convert.sparse_to_dense(sparse)).toEqual(dense);
		});
	});
});
