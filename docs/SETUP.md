# Project Setup Guide

## Prerequisites

- Node.js 18.x or higher
- Python 3.10 or higher
- PostgreSQL 14 or higher
- Redis 7.x
- Docker & Docker Compose (optional but recommended)
- Git

## Quick Start with Docker

### 1. Clone Repository
```bash
git clone https://github.com/shiyapatel1404-max/project-loop.git
cd project-loop
```

### 2. Start Services
```bash
docker-compose up -d
```

This will start:
- PostgreSQL database
- Redis cache
- Elasticsearch
- Node.js backend
- React frontend
- Python AI engine
- Nginx reverse proxy

### 3. Initialize Database
```bash
docker-compose exec backend npm run migrate
docker-compose exec backend npm run seed
```

### 4. Access Application

- **Frontend**: http://localhost:5173
- **Backend API**: http://localhost:3000/api
- **AI Engine**: http://localhost:8000
- **Adminer** (DB GUI): http://localhost:8080

### 5. Login with Default Credentials

```
Email: admin@example.com
Password: password123
```

## Manual Setup (Without Docker)

### Backend Setup

```bash
cd backend

# Install dependencies
npm install

# Create .env file
cp .env.example .env

# Update .env with your database connection

# Run migrations
npm run migrate

# Seed database
npm run seed

# Start development server
npm run dev
```

### Frontend Setup

```bash
cd frontend

# Install dependencies
npm install

# Create .env file
cp .env.example .env

# Update VITE_API_URL if needed

# Start development server
npm run dev
```

### AI Engine Setup

```bash
cd ai-engine

# Create virtual environment
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate

# Install dependencies
pip install -r requirements.txt

# Start AI engine
python main.py
```

## Database Configuration

### Create PostgreSQL User and Database

```sql
-- Connect as postgres user
sudo -u postgres psql

-- Create user
CREATE USER project_loop_user WITH PASSWORD 'password';

-- Create database
CREATE DATABASE project_loop OWNER project_loop_user;

-- Grant privileges
GRANT ALL PRIVILEGES ON DATABASE project_loop TO project_loop_user;

-- Exit
\q
```

### Initialize Schema

```bash
psql -U project_loop_user -d project_loop < database/schema.sql
psql -U project_loop_user -d project_loop < database/seeds.sql
```

## Environment Configuration

Create `.env` files in backend, frontend, and ai-engine directories:

### Backend .env
```
NODE_ENV=development
PORT=3000
DATABASE_URL=postgresql://user:password@localhost:5432/project_loop
REDIS_URL=redis://localhost:6379
JWT_SECRET=your_secret_key_here
AI_ENGINE_URL=http://localhost:8000
```

### Frontend .env
```
VITE_API_URL=http://localhost:3000
```

### AI Engine .env
```
PORT=8000
ENVIRONMENT=development
```

## Running Tests

### Backend Tests
```bash
cd backend
npm test
npm run test:coverage
```

### Frontend Tests
```bash
cd frontend
npm test
npm run test:coverage
```

## Project Structure

```
project-loop/
├── backend/              # Node.js API server
│   ├── src/
│   │   ├── controllers/
│   │   ├── routes/
│   │   ├── services/
│   │   ├── models/
│   │   ├── middleware/
│   │   ├── config/
│   │   └── utils/
│   ├── tests/
│   └── package.json
├── frontend/             # React application
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── store/
│   │   ├── services/
│   │   ├── hooks/
│   │   ├── styles/
│   │   └── App.jsx
│   ├── public/
│   └── package.json
├── ai-engine/            # Python AI services
│   ├── routes/
│   ├── processors/
│   ├── models.py
│   ├── main.py
│   └── requirements.txt
├── database/             # Database schemas
│   ├── schema.sql
│   ├── seeds.sql
│   └── README.md
├── docs/                 # Documentation
├── infrastructure/       # DevOps configs
└── docker-compose.yml
```

## Troubleshooting

### Port Already in Use
```bash
# Kill process using port
lsof -ti:3000 | xargs kill -9
```

### Database Connection Issues
```bash
# Test PostgreSQL connection
psql -U postgres -h localhost -d project_loop
```

### Missing Dependencies
```bash
# Reinstall dependencies
rm -rf node_modules package-lock.json
npm install
```

## Next Steps

1. **Customize Configuration**: Update `.env` files for your environment
2. **Create Admin Account**: Set up your administrator account
3. **Add Teams**: Organize users into teams
4. **Connect Data Sources**: Integrate feedback channels
5. **Configure Reports**: Set up automated reporting

## Support

For issues or questions:
- Check [API Documentation](./API.md)
- Review [Architecture Guide](./ARCHITECTURE.md)
- Visit [GitHub Issues](https://github.com/shiyapatel1404-max/project-loop/issues)
