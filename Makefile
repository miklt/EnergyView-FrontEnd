docker-build:
	git checkout main && git pull && \
	docker image build -f src/build/docker/Dockerfile -t garsoft/energyview-frontend:latest .
	docker image push garsoft/energyview-frontend:latest
	docker image prune -f

docker-deploy:
	docker container stop frontend && docker container rm frontend && \
	docker container run -p 80:80 -d --network energyview-net --name frontend garsoft/energyview-frontend:latest
