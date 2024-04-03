docker-build:	
	docker image build -f src/build/docker/Dockerfile.v2 -t containerregistry.uspdigital.usp.br/michelet/imagens/garsoft/energyview-frontend:latest .	
	docker push containerregistry.uspdigital.usp.br/michelet/imagens/garsoft/energyview-frontend:latest	

docker-deploy:
	docker container stop frontend && docker container rm frontend && docker rmi containerregistry.uspdigital.usp.br/michelet/imagens/garsoft/energyview-frontend:latest \
	docker container run -p 8002:4200 -d --network energyview-net --name frontend containerregistry.uspdigital.usp.br/michelet/imagens/garsoft/energyview-frontend:latest