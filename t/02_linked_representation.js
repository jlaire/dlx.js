var tap = require("tap");
var LinkedMatrix = require("../lib/LinkedMatrix.js");

tap.test("LinkedMatrix.from_dense()", function(t) {
	t.plan(8);
	var lm = LinkedMatrix.from_dense([
		[0,0,1],
		[0,1,0],
		[0,1,1],
		[1,0,0],
		[1,0,1],
		[1,1,0],
		[1,1,1]
	]);
	t.ok(lm instanceof LinkedMatrix, "returned a LinkedMatrix");
	t.equal(lm.cols.length, 3, "correct number of columns");
	t.equal(lm.cols[0].x, 0, "first column has x=0");
	t.equal(lm.cols[1].x, 1, "second column has x=1");
	t.equal(lm.cols[2].x, 2, "third column has x=2");
	var ys = function(col) {
		var out = [];
		for (var node = col.d; node !== col; node = node.d) {
			out.push(node.y);
		}
		return out;
	};
	t.deepEqual(ys(lm.cols[0]), [3,4,5,6], "first column has correct ys");
	t.deepEqual(ys(lm.cols[1]), [1,2,5,6], "second column has correct ys");
	t.deepEqual(ys(lm.cols[2]), [0,2,4,6], "third column has correct ys");
	t.end();
});

tap.test("LinkedMatrix#to_sparse()", function(t) {
	t.plan(1);
	var sparse = [[3],[1,4],[1,5,9],[2,6],[5],[3,5,8,9],[7,9],[3]];
	t.deepEqual(LinkedMatrix.from_sparse(sparse).to_sparse(), sparse, "it works");
	t.end();
});
