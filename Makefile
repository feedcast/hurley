.PHONY: default
default: install

.PHONY: install
install:
	npm i

.PHONY: start
start:
	npm start

.PHONY: test
test:
	npm run test
