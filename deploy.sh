docker build -t calvinyhu/docker-kubernetes-complex-client:latest -t calvinyhu/docker-kubernetes-complex-client:$SHA -f ./client/Dockerfile ./client
docker build -t calvinyhu/docker-kubernetes-complex-server:latest -t calvinyhu/docker-kubernetes-complex-server:$SHA -f ./server/Dockerfile ./server
docker build -t calvinyhu/docker-kubernetes-complex-worker:latest -t calvinyhu/docker-kubernetes-complex-worker:$SHA -f ./worker/Dockerfile ./worker

docker push calvinyhu/docker-kubernetes-complex-client:latest
docker push calvinyhu/docker-kubernetes-complex-server:latest
docker push calvinyhu/docker-kubernetes-complex-worker:latest

docker push calvinyhu/docker-kubernetes-complex-client:$SHA
docker push calvinyhu/docker-kubernetes-complex-server:$SHA
docker push calvinyhu/docker-kubernetes-complex-worker:$SHA

kubectl apply -f k8s

kubectl set image deployment/client-deployment client=calvinyhu/docker-kubernetes-complex-client:$SHA
kubectl set image deployment/server-deployment server=calvinyhu/docker-kubernetes-complex-server:$SHA
kubectl set image deployment/worker-deployment worker=calvinyhu/docker-kubernetes-complex-worker:$SHA
