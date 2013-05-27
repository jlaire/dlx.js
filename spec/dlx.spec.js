describe("dlx", function () {
	var dlx = require("../");

	it("loads successfully", function () {
		expect(dlx).toBeTruthy();
		expect(dlx.solve).toBeTruthy();
		expect(dlx.solve_sparse_matrix).toBeTruthy();
	})
	
	describe("dlx.solve()", function () {
		it("works in simple cases", function () {
			// empty matrix has an empty solution
			expect(dlx.solve([])).toEqual([[]]);

			// trivially solvable case
			expect(dlx.solve([[1]])).toEqual([[0]]);

			// unsolvable case
			expect(dlx.solve([[0]])).toEqual([]);
		});

		it("finds all solutions", function () {
			var dense = [[0,0,1],[0,1,0],[0,1,1],[1,0,0],[1,0,1],[1,1,0],[1,1,1]];
			expect(dlx.solve(dense).length).toEqual(5);
		});

		it("returns sorted solutions", function () {
			var dense = [[0,1],[1,0]];
			expect(dlx.solve(dense)).toEqual([[0,1]]);
		});

		it("sorts the solutions", function () {
			var dense = [[0,1],[1,1],[1,0]];
			expect(dlx.solve(dense)).toEqual([[0,2],[1]]);
		});
	});

	describe("dlx.solve_sparse_matrix", function () {
		it("works in simple cases", function () {
			expect(dlx.solve_sparse_matrix([])).toEqual([[]]);
			expect(dlx.solve_sparse_matrix([[0]])).toEqual([[0]]);
			expect(dlx.solve_sparse_matrix([[1]])).toEqual([]);
			expect(dlx.solve_sparse_matrix([[0],[1]])).toEqual([[0,1]]);
		});
	});
});
