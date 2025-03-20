install: deps-install
	npm ci

deps-install:
	npm ci

deps-update:
	npx ncu -u

lint:
	npx eslint .
