/*
 * To understand this pretty data structure, read Knuth's paper.
 *
 * TODO: Provide a short explanation here.
 */

var convert = require("./convert.js");

function Node(x, y) {
	this.x = x;
	this.y = y;

	this.size = 0;

	this.l = this;
	this.r = this;
	this.u = this;
	this.d = this;
};

Node.prototype.hide_lr = function() {
	this.l.r = this.r;
	this.r.l = this.l;
};

Node.prototype.hide_ud = function() {
	this.u.d = this.d;
	this.d.u = this.u;
};

Node.prototype.show_lr = function() {
	this.l.r = this;
	this.r.l = this;
};

Node.prototype.show_ud = function() {
	this.u.d = this;
	this.d.u = this;
};

Node.prototype.set_l = function(l) {
	l.l = this.l;
	l.r = this;
	this.l.r = l;
	this.l = l;
};

Node.prototype.set_u = function(u) {
	u.u = this.u;
	u.d = this;
	this.u.d = u;
	this.u = u;
};

function LinkedMatrix() {
	this.root = new Node(-1, -1);
	this.cols = [];
};

LinkedMatrix.prototype.cover_column = function(col) {
	if (typeof col === 'number') {
		col = this.cols[col];
	}
	col.hide_lr();
	for (var row = col.d; row !== col; row = row.d) {
		for (var node = row.r; node !== row; node = node.r) {
			node.hide_ud();
			--this.cols[node.x].size;
		}
	}
};

LinkedMatrix.prototype.uncover_column = function(col) {
	if (typeof col === 'number') {
		col = this.cols[col];
	}
	col.show_lr();
	for (var row = col.u; row !== col; row = row.u) {
		for (var node = row.l; node !== row; node = node.l) {
			node.show_ud();
			++this.cols[node.x].size;
		}
	}
};

LinkedMatrix.prototype.to_sparse = function() {
	var sparse = [];
	var put = function(x, y) {
		while (sparse.length <= y) {
			sparse.push([]);
		}
		sparse[y].push(x);
	};
	for (var col = this.root.r; col !== this.root; col = col.r) {
		for (var row = col.d; row !== col; row = row.d) {
			put(col.x, row.y);
		}
	}
	for (var i = 0; i < sparse.length; ++i) {
		sparse[i].sort();
	}
	return sparse;
};

LinkedMatrix.from_sparse = function(sparse) {
	if (sparse == null) {
		return null;
	}
	var lm = new LinkedMatrix();
	var col = function(x) {
		while (lm.cols.length <= x) {
			var node = new Node(lm.cols.length, -1);
			lm.root.set_l(node);
			lm.cols.push(node);
		}
		return lm.cols[x];
	};
	for (var y = 0; y < sparse.length; ++y) {
		var row = new Node(-1, y);
		for (var i = 0; i < sparse[y].length; ++i) {
			var x = sparse[y][i];
			var node = new Node(x, y);
			col(x).set_u(node);
			++col(x).size;
			row.set_l(node);
		}
		row.hide_lr();
	}
	return lm;
};

LinkedMatrix.from_dense = function(dense) {
	return LinkedMatrix.from_sparse(convert.dense_to_sparse(dense));
};

module.exports = LinkedMatrix;
