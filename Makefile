test:
	prove -e './node_modules/.bin/tap --tap' --ext .js
.PHONY: test

vtest:
	prove -ve './node_modules/.bin/tap --tap' --ext .js
.PHONY: vtest
