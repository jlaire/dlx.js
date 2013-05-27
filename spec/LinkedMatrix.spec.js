describe("LinkedMatrix.js", function () {
	var LinkedMatrix = require("../lib/LinkedMatrix.js");

	it("loads successfully", function () {
		expect(LinkedMatrix).toBeTruthy();
		expect(typeof LinkedMatrix).toEqual("function");
		expect(LinkedMatrix.from_dense).toBeTruthy();
		expect(LinkedMatrix.from_sparse).toBeTruthy();
	});

	describe("constructor", function () {
		it("creates an empty matrix", function () {
			var lm = new LinkedMatrix();
			expect(lm.cols).toEqual([]);
		});
	});

	var get_ys = function (col) {
		var ys = [];
		for (var node = col.d; node !== col; node = node.d) {
			ys.push(node.y);
		}
		return ys;
	};

	describe("LinkedMatrix.from_dense()", function () {
		it("returns null when conversion is impossible", function () {
			expect(LinkedMatrix.from_dense([[0]])).toEqual(null);
		});

		it("works", function () {
			var lm = LinkedMatrix.from_dense([
				[0,0,1],
				[0,1,0],
				[0,1,1],
				[1,0,0],
				[1,0,1],
				[1,1,0],
				[1,1,1]
			]);

			expect(lm instanceof LinkedMatrix).toBe(true);
			expect(lm.cols.length).toEqual(3);
			expect(lm.cols[0].x).toEqual(0);
			expect(lm.cols[1].x).toEqual(1);
			expect(lm.cols[2].x).toEqual(2);

			expect(get_ys(lm.cols[0])).toEqual([3,4,5,6]);
			expect(get_ys(lm.cols[1])).toEqual([1,2,5,6]);
			expect(get_ys(lm.cols[2])).toEqual([0,2,4,6]);
		});
	});

	describe("LinketMatrix#to_sparse()", function () {
		var sparse = [[3],[1,4],[1,5,9],[2,6],[5],[3,5,8,9],[7,9],[3]];
		it("works", function () {
			expect(LinkedMatrix.from_sparse(sparse).to_sparse()).toEqual(sparse);
		});
	});
});
