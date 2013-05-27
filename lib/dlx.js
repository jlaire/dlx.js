/*
 * The Dancing Links algorithm.
 */

var LinkedMatrix = require("./LinkedMatrix.js");

function solve_dense_matrix(dense) {
	return solve(LinkedMatrix.from_dense(dense));
}

function solve_sparse_matrix(sparse) {
	return solve(LinkedMatrix.from_sparse(sparse));
}

function solve(linkedMatrix) {
	if (!linkedMatrix instanceof LinkedMatrix) {
		throw new TypeError("Argument is not a LinkedMatrix");
	}
	return go(linkedMatrix, [], []);
}

function go(lm, stack, solutions) {
	if (lm == null) {
		return [];
	}
	if (lm.root.r === lm.root) {
		solutions.push([].concat(stack));
		return solutions;
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
	return solutions;
};

exports.solve_dense_matrix = solve_dense_matrix;
exports.solve_sparse_matrix = solve_sparse_matrix;
exports.solve = solve;
