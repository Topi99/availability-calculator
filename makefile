all: install start-server start-web test-app

install:
	cd webapp && yarn install

start-server:
	lein run -p 8080
	
start-web:
	cd webapp && yarn start

test-app:
	lein eftest
