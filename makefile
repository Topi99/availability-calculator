all: start test

start-server:
	lein run -p 8080
	
start-web:
	cd webapp && yarn start
