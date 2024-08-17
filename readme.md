```
kubectl get pod
kubectl get pod -o wide
kubectl get secrets
kubectl get configmap
kubectl get scv # To get the services
# To add file
kubectl apply -f [yaml_file_name]

# To remove files
kubectl delete pods --all
kubectl delete deployment --all
kubectl delete service --all
kubectl delete secret --all
kubectl delete configmap --all

minikube ip
minikube service [service_name]
```

### Kubernetes Dashboard

```
# To run dashboard
kubectl proxy

# To access dashboard
http://localhost:8001/api/v1/namespaces/kubernetes-dashboard/services/https:kubernetes-dashboard:/proxy/#/login

```
- Create a sample user
- Create a file dashboard.yaml and run it using `kubectl apply -f dashboard.yaml`
```
apiVersion: v1
kind: ServiceAccount
metadata:
  name: admin-user
  namespace: kubernetes-dashboard

---
apiVersion: rbac.authorization.k8s.io/v1
kind: ClusterRoleBinding
metadata:
  name: admin-user
roleRef:
  apiGroup: rbac.authorization.k8s.io
  kind: ClusterRole
  name: cluster-admin
subjects:
  - kind: ServiceAccount
    name: admin-user
    namespace: kubernetes-dashboard

```

- Create a Bearer token with: `kubectl -n kubernetes-dashboard create token admin-user` and paste the token in dashbooard
