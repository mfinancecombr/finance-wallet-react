setup:
	@yarn

run:
	@PORT=8080 yarn start

clean:
	@find . -name "*.swp" -delete
