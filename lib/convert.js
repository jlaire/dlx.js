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

var _ = require("underscore");

/*
 * The sparse representation doesn't store trailing zeros or the width of the
 * matrix expliclty. It's assumed that at least one row has a 1 in the
 * right-most column so that no information is lost.
 *
 * If a matrix has all 0s in the right-most column, it can't be converted to
 * sparse representation.
 */
function representable_as_sparse(dense) {
	return dense.length === 0 || _.some(_.map(dense, _.last));
};

function dense_to_sparse(dense) {
	if (!representable_as_sparse(dense)) {
		return null;
	}
	return _.map(dense, function (row) {
		return _.reduce(row, function (xs, bool, x) {
			if (bool) {
				xs.push(x);
			}
			return xs;
		}, []);
	});
};

function sparse_to_dense(sparse) {
	var dense = [];
	var width = _.max(_.flatten([0, sparse])) + 1;
	return _.map(sparse, function (row) {
		var bools = [];
		while (bools.length < width) {
			bools.push(0);
		}
		_.each(row, function (x) {
			bools[x] = 1;
		});
		return bools;
	});
};

exports.dense_to_sparse = dense_to_sparse;
exports.sparse_to_dense = sparse_to_dense;
