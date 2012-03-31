var dlx = (function() {
	var dense_to_sparse = function(dense) {
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

	return {
		'dense_to_sparse': dense_to_sparse,
		'sparse_to_dense': sparse_to_dense
	};
})();

Object.keys(dlx).forEach(function(key) {
	exports[key] = dlx[key];
});
