# Docker Complex

Workspace for Udemy

## Notes

```json
{
  "AWSEBDockerrunVersion": 2,
  "containerDefinitions": [
    {
      "name": "client",
      "image": "calvinyhu/docker-kubernetes-complex-client",
      "hostname": "client" # can be the same as whatever is in the docker-compose.yml services list
    }
  ]
}
```

Add a secret imperatively to Kubernetes.

```bash
kubectl create secret generic <secret_name> --from-literal <key=value>
```
