.PHONY: default
default: install

.PHONY: install
install:
	npm i

.PHONY: setup
setup:
	cp .env.sample .env.local

.PHONY: start
start:
	npm start

.PHONY: test
test:
	npm run test
