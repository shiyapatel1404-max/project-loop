# Project LOOP API Documentation

## Base URL
```
http://localhost:3000/api
```

## Authentication

All requests require JWT token in Authorization header:
```
Authorization: Bearer <token>
```

## Authentication Endpoints

### Register
```http
POST /auth/register
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "password123",
  "firstName": "John",
  "lastName": "Doe"
}

Response: 201 Created
{
  "message": "User registered successfully",
  "user": {...},
  "token": "jwt_token"
}
```

### Login
```http
POST /auth/login
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "password123"
}

Response: 200 OK
{
  "message": "Login successful",
  "user": {...},
  "token": "jwt_token"
}
```

## Feedback Endpoints

### List Feedback
```http
GET /feedback?page=1&limit=20&sentiment=positive&status=new

Response: 200 OK
{
  "feedback": [...],
  "total": 100,
  "page": 1,
  "limit": 20
}
```

### Create Feedback
```http
POST /feedback
Content-Type: application/json

{
  "content": "Great product!",
  "source": "email",
  "customerId": "cust_123",
  "metadata": {}
}

Response: 201 Created
{
  "message": "Feedback created successfully",
  "feedback": {...}
}
```

### Get Feedback
```http
GET /feedback/:id

Response: 200 OK
{...feedback object...}
```

### Update Feedback
```http
PUT /feedback/:id
Content-Type: application/json

{
  "status": "resolved",
  "notes": "Issue fixed"
}

Response: 200 OK
{...updated feedback...}
```

### Delete Feedback
```http
DELETE /feedback/:id

Response: 200 OK
{"message": "Feedback deleted successfully"}
```

## Analytics Endpoints

### Sentiment Analytics
```http
GET /analytics/sentiment?startDate=2024-01-01&endDate=2024-12-31

Response: 200 OK
{
  "sentimentDistribution": [
    {"sentiment": "positive", "count": 150},
    {"sentiment": "negative", "count": 45},
    {"sentiment": "neutral", "count": 105}
  ],
  "total": 300
}
```

### Theme Analytics
```http
GET /analytics/themes

Response: 200 OK
{
  "themes": [
    {"theme": "Product Quality", "frequency": 45},
    {"theme": "Customer Service", "frequency": 38}
  ]
}
```

### Dashboard Data
```http
GET /analytics/dashboard

Response: 200 OK
{
  "totalFeedback": 300,
  "sentimentDistribution": [...],
  "recentFeedback": [...]
}
```

## Reports Endpoints

### List Reports
```http
GET /reports

Response: 200 OK
{
  "reports": [...]
}
```

### Create Report
```http
POST /reports
Content-Type: application/json

{
  "name": "Monthly Report",
  "type": "voc",
  "filters": {"dateRange": "month"},
  "schedule": "monthly"
}

Response: 201 Created
{...report object...}
```

### Generate Report
```http
POST /reports/:id/generate

Response: 200 OK
{"message": "Report generated successfully"}
```

### Email Report
```http
POST /reports/:id/email
Content-Type: application/json

{
  "recipients": ["user@example.com"]
}

Response: 200 OK
{"message": "Report emailed successfully"}
```

## Error Responses

All errors follow this format:
```json
{
  "error": "Error message",
  "status": 400
}
```

### Common Status Codes
- 200: OK
- 201: Created
- 400: Bad Request
- 401: Unauthorized
- 403: Forbidden
- 404: Not Found
- 500: Internal Server Error
