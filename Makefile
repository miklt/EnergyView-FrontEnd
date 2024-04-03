docker-build:
	#git checkout main && git pull && \
	docker image build -f src/build/docker/Dockerfile -t containerregistry.uspdigital.usp.br/michelet/imagens/garsoft/energyview-frontend:latest .
	#docker image push containerregistry.uspdigital.usp.br/michelet/imagens/garsoft/energyview-frontend:latest
	docker push containerregistry.uspdigital.usp.br/michelet/imagens/garsoft/energyview-frontend:latest
	docker image prune -f

docker-deploy:
	docker container stop frontend && docker container rm frontend && docker rmi containerregistry.uspdigital.usp.br/michelet/imagens/garsoft/energyview-frontend:latest \
	docker container run -p 8002:8002 -d --network energyview-net --name frontend containerregistry.uspdigital.usp.br/michelet/imagens/garsoft/energyview-frontend:latest