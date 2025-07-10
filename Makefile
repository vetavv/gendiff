install: deps-install
	npm link

uninstall:
	npm unlink gendiff -g

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
