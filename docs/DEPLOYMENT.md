# Deployment Guide

## Local Development

### Prerequisites
- Docker & Docker Compose
- Node.js 18+
- Python 3.10+
- PostgreSQL 14+

### Setup

1. **Clone Repository**
```bash
git clone https://github.com/shiyapatel1404-max/project-loop.git
cd project-loop
```

2. **Configure Environment**
```bash
cp .env.example .env
# Edit .env with your settings
```

3. **Start Services**
```bash
docker-compose up -d
```

4. **Initialize Database**
```bash
cd backend
npm run migrate
npm run seed
```

5. **Access Application**
- Frontend: http://localhost:5173
- Backend API: http://localhost:3000/api
- AI Engine: http://localhost:8000

## Production Deployment

### Docker Build

```bash
# Build images
docker-compose -f docker-compose.prod.yml build

# Push to registry
docker tag project-loop-backend:latest your-registry/project-loop-backend:latest
docker push your-registry/project-loop-backend:latest
```

### Kubernetes Deployment

1. **Create Secrets**
```bash
kubectl create secret generic project-loop-secrets \
  --from-literal=DATABASE_URL=postgresql://... \
  --from-literal=JWT_SECRET=your_secret_key \
  --from-literal=OPENAI_API_KEY=your_key
```

2. **Deploy Services**
```bash
kubectl apply -f infrastructure/kubernetes/
```

3. **Verify Deployment**
```bash
kubectl get pods
kubectl get services
kubectl logs deployment/project-loop-backend
```

### Cloud Deployment (AWS)

1. **Setup AWS Resources**
```bash
terraform init
terraform plan
terraform apply
```

2. **Deploy to ECS**
```bash
aws ecs create-service \
  --cluster project-loop \
  --service-name backend \
  --task-definition project-loop-backend:1
```

3. **Setup RDS Database**
```bash
aws rds create-db-instance \
  --db-instance-identifier project-loop \
  --db-instance-class db.t3.micro \
  --engine postgres
```

## Monitoring

### Prometheus
```bash
kubectl port-forward svc/prometheus 9090:9090
# Visit http://localhost:9090
```

### Grafana
```bash
kubectl port-forward svc/grafana 3000:3000
# Default credentials: admin/admin
```

### Logs
```bash
# View logs
kubectl logs -f deployment/project-loop-backend

# Stream logs from all pods
kubectl logs -f -l app=project-loop
```

## Scaling

### Horizontal Scaling
```bash
kubectl scale deployment project-loop-backend --replicas=3
```

### Auto-scaling
```bash
kubectl autoscale deployment project-loop-backend \
  --min=2 \
  --max=10 \
  --cpu-percent=80
```

## Backup & Recovery

### Database Backup
```bash
pg_dump -U postgres project_loop > backup.sql
```

### Restore Database
```bash
psql -U postgres project_loop < backup.sql
```

## Troubleshooting

### Check Service Status
```bash
docker-compose ps
kubectl get all
```

### View Logs
```bash
docker-compose logs -f backend
kubectl logs deployment/project-loop-backend -f
```

### Reset Database
```bash
cd backend
npm run migrate:reset
npm run seed
```
