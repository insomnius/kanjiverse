TIMESTAMP := $(shell date +%Y%m%d_%H%M%S)

docker:
	docker context use default
	docker build -t registry.gitlab.com/alianarib/monorepo/kanjiverse:$(TIMESTAMP) .
	docker push registry.gitlab.com/alianarib/monorepo/kanjiverse:$(TIMESTAMP)
