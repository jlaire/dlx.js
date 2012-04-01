var dlx = (function() {
	var representable_as_sparse = function(dense) {
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

	var dense_to_sparse = function(dense) {
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

	var sparse_to_dense = function(sparse) {
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

	var Node = function(x, y) {
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

	var LinkedMatrix = function() {
		this.root = new Node(-1, -1);
		this.cols = [];
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
		return LinkedMatrix.from_sparse(dense_to_sparse(dense));
	};

	return {
		'LinkedMatrix': LinkedMatrix,
		'dense_to_sparse': dense_to_sparse,
		'sparse_to_dense': sparse_to_dense
	};
})();

Object.keys(dlx).forEach(function(key) {
	exports[key] = dlx[key];
});
