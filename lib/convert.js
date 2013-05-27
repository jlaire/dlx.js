/*
 * We use three different ways to represent a boolean matrix.
 *
 * 1) Dense representation
 *
 * This one is the easiest to visualize, it's simply a 2D array of 0s and 1s.
 *
 * Example:
 * var dense_matrix = [
 *     [0, 0, 1, 0, 1, 1, 0],
 *     [1, 0, 0, 1, 0, 0, 1],
 *     [0, 1, 1, 0, 0, 1, 0],
 *     [1, 0, 0, 1, 0, 0, 0],
 *     [0, 1, 0, 0, 0, 0, 1],
 *     [0, 0, 0, 1, 1, 0, 1],
 * ];
 *
 * 2) Sparse representation
 *
 * This one is also a 2D array, but instead of explicitly listing all 0s and 1s,
 * it only stores the indices of 1s on each row.
 *
 * Example:
 * var sparse_matrix = [
 *     [2, 4, 5],
 *     [0, 3, 6],
 *     [1, 2, 5],
 *     [0, 3],
 *     [1, 6],
 *     [3, 4, 6],
 * ];
 *
 * 3) Linked representation
 *
 * The algorithm works with a very interesting 2D linked list internally. See
 * LinkedMatrix.js for details.
 */

/*
 * The sparse representation doesn't store trailing zeros or the width of the
 * matrix expliclty. It's assumed that at least one row has a 1 in the
 * right-most column so that no information is lost.
 *
 * If a matrix has all 0s in the right-most column, it can't be converted to
 * sparse representation.
 */
function representable_as_sparse(dense) {
	var max = [-1, -1];
	for (var y = 0; y < dense.length; ++y) {
		for (var x = 0; x < dense[y].length; ++x) {
			var bit = +!!dense[y][x];
			if (x > max[bit]) {
				max[bit] = x;
			}
		}
	}
	return max[1] >= max[0];
};

function dense_to_sparse(dense) {
	if (!representable_as_sparse(dense)) {
		return null;
	}
	var sparse = [];
	for (var y = 0; y < dense.length; ++y) {
		var xs = [];
		for (var x = 0; x < dense[y].length; ++x) {
			if (dense[y][x]){
				xs.push(x);
			}
		}
		sparse.push(xs);
	}
	return sparse;
};

function sparse_to_dense(sparse) {
	var dense = [];
	var width = 0;
	for (var y = 0; y < sparse.length; ++y) {
		var bools = [];
		var x = 0;
		for (var i = 0; i < sparse[y].length; ++i) {
			while (x < sparse[y][i]) {
				bools.push(false);
				++x;
			}
			bools.push(true);
			++x;
		}
		if (bools.length > width) {
			width = bools.length;
		}
		dense.push(bools);
	}
	for (var i = 0; i < dense.length; ++i) {
		while (dense[i].length < width) {
			dense[i].push(false);
		}
	}
	return dense;
};

exports.dense_to_sparse = dense_to_sparse;
exports.sparse_to_dense = sparse_to_dense;
