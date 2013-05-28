/*
 * The Dancing Links algorithm.
 */

var _ = require("underscore");
var LinkedMatrix = require("./LinkedMatrix.js");

function solve(dense) {
	return solve_linked_matrix(LinkedMatrix.from_dense(dense));
}

function solve_sparse_matrix(sparse) {
	return solve_linked_matrix(LinkedMatrix.from_sparse(sparse));
}

function solve_linked_matrix(linkedMatrix) {
	if (!linkedMatrix instanceof LinkedMatrix) {
		throw new TypeError("Argument is not a LinkedMatrix");
	}
	var solutions = [];
	go(linkedMatrix, [], solutions);
	return solutions.sort();
}

function solve_tagged_matrix(tagged) {
	var matrix = convert_tagged_columns_to_numbers(tagged);
	var row_ids = Object.keys(matrix);
	var sparse_matrix = row_ids.map(function (id) {
		return matrix[id];
	});

	return solve_sparse_matrix(sparse_matrix).map(function (solution) {
		return solution.map(function (row) {
			return row_ids[row];
		});
	});
}

function convert_tagged_columns_to_numbers(tagged) {
	var cols = {};
	_.flatten(_.values(tagged)).forEach(function (col) {
		cols[col] = true;
	});
	cols = _.keys(cols).sort();

	return _.reduce(_.keys(tagged), function (acc, key) {
		acc[key] = tagged[key].map(function (tag) {
			return cols.indexOf(tag);
		});
		return acc;
	}, {});
}

function go(lm, stack, solutions) {
	if (lm == null) {
		return [];
	}
	if (lm.root.r === lm.root) {
		solutions.push([].concat(stack).sort());
		return;
	}

	var best_col = lm.root.r;
	for (var col = best_col.r; col !== lm.root; col = col.r) {
		if (col.size < best_col) {
			best_col = col;
		}
	}
	if (best_col.size < 1) {
		return solutions;
	}
	lm.cover_column(best_col);
	for (var row = best_col.d; row !== best_col; row = row.d) {
		stack.push(row.y);
		for (var node = row.r; node !== row; node = node.r) {
			lm.cover_column(node.x);
		}
		go(lm, stack, solutions);
		for (var node = row.l; node !== row; node = node.l) {
			lm.uncover_column(node.x);
		}
		stack.pop();
	}
	lm.uncover_column(best_col);
};

exports.solve = solve;
exports.solve_sparse_matrix = solve_sparse_matrix;
exports.solve_tagged_matrix = solve_tagged_matrix;
