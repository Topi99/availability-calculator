all: install start-server start-web test

install:
	cd webapp && yarn install

start-server:
	lein run -p 8080
	
start-web:
	cd webapp && yarn start

test:
	lein eftest
