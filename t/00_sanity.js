var tap = require("tap");
var dlx = require("../dlx");

tap.test("dlx loaded", function(t) {
	t.plan(4);
	t.ok(dlx, "dlx exists");
	t.ok(dlx.dense_to_sparse, "dlx.dense_to_sparse exists");
	t.ok(dlx.sparse_to_dense, "dlx.sparse_to_dense exists");
	t.ok(dlx.LinkedMatrix, "dlx.LinkedMatrix exists");
	t.end();
});
