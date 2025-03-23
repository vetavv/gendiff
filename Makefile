install: deps-install
	npm ci

deps-install:
	npm ci

deps-update:
	npx ncu -u

lint:
	npx eslint .

lint-fix:
	npx eslint . --fix

test:
	npm test

debug:
	npm run debug:jest
