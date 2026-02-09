# 💸 Expense Tracker Platform

A microservices-based expense tracker web app to help users manage their income, expenses, savings, and budgets with AI-powered insights.

---

## 🛠️ Tech Stack

### Backend
- **Spring Boot (Microservices Architecture)**
- **MySQL** – Relational database
- **Swagger** – API documentation
- **Spring Security + JWT** – Authentication
- **Spring Cloud / Netflix OSS (optional)** – Service discovery, config, gateway

### Frontend
- **React.js**
- **Tailwind CSS**
- **Component Library** – TBD (e.g., ShadCN, Material UI, or Headless UI)
- **Axios** – API calls

### DevOps
- **Docker & Docker Compose**
- **GitHub Actions** – CI/CD
- **Postman** – API testing
- **Swagger UI** – API exploration

---

## 📌 Features Roadmap

### ✅ PHASE 1: MVP - Basic Expense Tracker

**Backend Microservices**:
- User Service (Auth, Profile)
- Transaction Service
- Category Service

**Frontend**:
- Login / Sign up
- Add/Edit/Delete Transactions
- Dashboard: Total income, expenses, balance
- Filters: By date, type, category
- Charts (Pie, Bar)

---

### ⏳ PHASE 2: Advanced Features

**Backend Microservices**:
- Budget Service
- Account Service (Cash, Bank, Wallet)
- Recurring Transaction Scheduler

**Frontend**:
- Budget Management UI
- Recurring payments interface
- Multi-account dashboard
- Export reports (CSV, PDF)
- Dark mode toggle

---

### 🤖 PHASE 3: AI & Insights

**AI Microservice**:
- Expense categorization using ML (e.g., Naive Bayes/NLP)
- Spending trend analysis
- Anomaly detection
- Monthly predictions

**Frontend**:
- Insight Cards ("You spent more than usual on Food")
- Forecast Charts
- Savings Suggestions UI

---

### 📦 PHASE 4: Scale & Polish

- Bank sync (via CSV or mock API)
- Admin dashboard
- Google Drive/Dropbox backup
- Email summaries & notifications
- Full mobile responsiveness (PWA)
- Dockerized services
- Centralized logging (ELK/Prometheus stack optional)

---

## 📂 API (Proposed)

- Swagger JSON - http://localhost:8080/v3/api-docs
- Swagger UI - http://localhost:8080/swagger-ui/index.html


## Base URL
```
https://api.financetracker.local/api/v1
```

## Authentication
All endpoints (except `/auth/login` and `/auth/register`) require:
```
Authorization: Bearer {access_token}
```

---

## Authentication Endpoints

### 1. Register User
**POST** `/auth/register`

**Request:**
```json
{
  "email": "user@example.com",
  "password": "SecurePassword123!",
  "firstName": "John",
  "lastName": "Doe"
}
```

**Response (201 Created):**
```json
{
  "success": true,
  "data": {
    "userId": "uuid-123",
    "email": "user@example.com",
    "firstName": "John",
    "lastName": "Doe"
  },
  "message": "User registered successfully"
}
```

**Error Response (400):**
```json
{
  "success": false,
  "error": "Email already exists",
  "code": "DUPLICATE_EMAIL"
}
```

---

### 2. Login User
**POST** `/auth/login`

**Request:**
```json
{
  "email": "user@example.com",
  "password": "SecurePassword123!"
}
```

**Response (200 OK):**
```json
{
  "success": true,
  "data": {
    "userId": "uuid-123",
    "email": "user@example.com",
    "firstName": "John",
    "lastName": "Doe",
    "accessToken": "eyJhbGciOiJIUzI1NiIs...",
    "refreshToken": "eyJhbGciOiJIUzI1NiIs...",
    "expiresIn": 3600
  },
  "message": "Login successful"
}
```

**Error Response (401):**
```json
{
  "success": false,
  "error": "Invalid email or password",
  "code": "INVALID_CREDENTIALS"
}
```

---

### 3. Logout User
**POST** `/auth/logout`

**Request:**
```json
{}
```

**Response (200 OK):**
```json
{
  "success": true,
  "message": "Logout successful"
}
```

---

### 4. Refresh Token
**POST** `/auth/refresh`

**Request:**
```json
{
  "refreshToken": "eyJhbGciOiJIUzI1NiIs..."
}
```

**Response (200 OK):**
```json
{
  "success": true,
  "data": {
    "accessToken": "eyJhbGciOiJIUzI1NiIs...",
    "expiresIn": 3600
  }
}
```

---

## User Endpoints

### 1. Get User Profile
**GET** `/users/profile`

**Response (200 OK):**
```json
{
  "success": true,
  "data": {
    "userId": "uuid-123",
    "email": "user@example.com",
    "firstName": "John",
    "lastName": "Doe",
    "createdAt": "2025-01-01T10:00:00Z",
    "updatedAt": "2025-01-15T15:30:00Z"
  }
}
```

---

### 2. Update User Profile
**PUT** `/users/profile`

**Request:**
```json
{
  "firstName": "Jonathan",
  "lastName": "Smith",
  "email": "jonathan@example.com"
}
```

**Response (200 OK):**
```json
{
  "success": true,
  "data": {
    "userId": "uuid-123",
    "email": "jonathan@example.com",
    "firstName": "Jonathan",
    "lastName": "Smith",
    "updatedAt": "2025-01-20T12:00:00Z"
  },
  "message": "Profile updated successfully"
}
```

---

## Transaction Endpoints

### 1. Get All Transactions
**GET** `/transactions?page=1&limit=20&category=all&type=all&startDate=2025-01-01&endDate=2025-12-31`

**Query Parameters:**
- `page` (optional): Page number, default 1
- `limit` (optional): Items per page, default 20
- `category` (optional): Filter by category
- `type` (optional): Filter by type (income/expense/transfer)
- `startDate` (optional): ISO 8601 format
- `endDate` (optional): ISO 8601 format

**Response (200 OK):**
```json
{
  "success": true,
  "data": {
    "transactions": [
      {
        "transactionId": "txn-123",
        "userId": "uuid-123",
        "type": "expense",
        "category": "food",
        "description": "Grocery shopping",
        "amount": 45.50,
        "currency": "USD",
        "date": "2025-01-15T10:30:00Z",
        "paymentMethod": "credit_card",
        "tags": ["groceries", "weekly"],
        "createdAt": "2025-01-15T10:30:00Z",
        "updatedAt": "2025-01-15T10:30:00Z"
      }
    ],
    "pagination": {
      "page": 1,
      "limit": 20,
      "total": 150,
      "totalPages": 8
    }
  }
}
```

---

### 2. Create Transaction
**POST** `/transactions`

**Request:**
```json
{
  "type": "expense",
  "category": "food",
  "description": "Lunch at restaurant",
  "amount": 25.00,
  "currency": "USD",
  "date": "2025-01-20T12:45:00Z",
  "paymentMethod": "credit_card",
  "tags": ["dining", "lunch"]
}
```

**Response (201 Created):**
```json
{
  "success": true,
  "data": {
    "transactionId": "txn-456",
    "userId": "uuid-123",
    "type": "expense",
    "category": "food",
    "description": "Lunch at restaurant",
    "amount": 25.00,
    "currency": "USD",
    "date": "2025-01-20T12:45:00Z",
    "paymentMethod": "credit_card",
    "tags": ["dining", "lunch"],
    "createdAt": "2025-01-20T12:45:00Z",
    "updatedAt": "2025-01-20T12:45:00Z"
  },
  "message": "Transaction created successfully"
}
```

---

### 3. Get Transaction by ID
**GET** `/transactions/{transactionId}`

**Response (200 OK):**
```json
{
  "success": true,
  "data": {
    "transactionId": "txn-123",
    "userId": "uuid-123",
    "type": "expense",
    "category": "food",
    "description": "Grocery shopping",
    "amount": 45.50,
    "currency": "USD",
    "date": "2025-01-15T10:30:00Z",
    "paymentMethod": "credit_card",
    "tags": ["groceries", "weekly"],
    "createdAt": "2025-01-15T10:30:00Z",
    "updatedAt": "2025-01-15T10:30:00Z"
  }
}
```

---

### 4. Update Transaction
**PUT** `/transactions/{transactionId}`

**Request:**
```json
{
  "category": "groceries",
  "description": "Weekly grocery shopping",
  "amount": 52.75,
  "date": "2025-01-15T10:30:00Z"
}
```

**Response (200 OK):**
```json
{
  "success": true,
  "data": {
    "transactionId": "txn-123",
    "userId": "uuid-123",
    "type": "expense",
    "category": "groceries",
    "description": "Weekly grocery shopping",
    "amount": 52.75,
    "currency": "USD",
    "date": "2025-01-15T10:30:00Z",
    "paymentMethod": "credit_card",
    "tags": ["groceries", "weekly"],
    "updatedAt": "2025-01-20T15:00:00Z"
  },
  "message": "Transaction updated successfully"
}
```

---

### 5. Delete Transaction
**DELETE** `/transactions/{transactionId}`

**Response (200 OK):**
```json
{
  "success": true,
  "message": "Transaction deleted successfully"
}
```

---

## Dashboard Endpoints

### 1. Get Dashboard Data
**GET** `/dashboard/summary?period=month`

**Query Parameters:**
- `period` (optional): day, week, month, year, custom
- `startDate` (optional): ISO 8601 format (required if period=custom)
- `endDate` (optional): ISO 8601 format (required if period=custom)

**Response (200 OK):**
```json
{
  "success": true,
  "data": {
    "totalIncome": 5000.00,
    "totalExpense": 2300.00,
    "netBalance": 2700.00,
    "currency": "USD",
    "period": "month",
    "categoryBreakdown": [
      {
        "category": "food",
        "amount": 450.00,
        "percentage": 19.57,
        "transactionCount": 15
      },
      {
        "category": "transportation",
        "amount": 200.00,
        "percentage": 8.70,
        "transactionCount": 5
      }
    ],
    "typeBreakdown": {
      "income": 5000.00,
      "expense": 2300.00,
      "transfer": 0.00
    },
    "topCategories": [
      {
        "category": "food",
        "amount": 450.00
      },
      {
        "category": "transportation",
        "amount": 200.00
      }
    ],
    "recentTransactions": [
      {
        "transactionId": "txn-123",
        "type": "expense",
        "category": "food",
        "description": "Grocery shopping",
        "amount": 45.50,
        "date": "2025-01-20T10:30:00Z"
      }
    ],
    "generatedAt": "2025-01-20T15:30:00Z"
  }
}
```

---

## Reports Endpoints

### 1. Get Report Summary
**GET** `/reports/summary?period=month&year=2025`

**Query Parameters:**
- `period` (optional): month, quarter, year
- `year` (required): 4-digit year
- `month` (optional): 1-12 (required if period=month)

**Response (200 OK):**
```json
{
  "success": true,
  "data": {
    "period": "month",
    "year": 2025,
    "month": 1,
    "totalIncome": 5000.00,
    "totalExpense": 2300.00,
    "netIncome": 2700.00,
    "savingsRate": 54.00,
    "averageExpensePerDay": 74.19,
    "largestExpense": {
      "description": "Grocery shopping",
      "amount": 200.00,
      "category": "food",
      "date": "2025-01-10T10:30:00Z"
    },
    "categoryTrends": [
      {
        "category": "food",
        "totalAmount": 450.00,
        "transactionCount": 15,
        "averageAmount": 30.00
      }
    ],
    "budgetStatus": [
      {
        "category": "food",
        "budgetLimit": 500.00,
        "spent": 450.00,
        "remaining": 50.00,
        "percentageUsed": 90.00
      }
    ]
  }
}
```

---

### 2. Get Detailed Report
**GET** `/reports/detailed?startDate=2025-01-01&endDate=2025-01-31&groupBy=category`

**Query Parameters:**
- `startDate` (required): ISO 8601 format
- `endDate` (required): ISO 8601 format
- `groupBy` (optional): category, type, date, paymentMethod

**Response (200 OK):**
```json
{
  "success": true,
  "data": {
    "period": {
      "startDate": "2025-01-01",
      "endDate": "2025-01-31"
    },
    "groupedData": {
      "food": {
        "totalAmount": 450.00,
        "transactionCount": 15,
        "averageAmount": 30.00,
        "transactions": [
          {
            "transactionId": "txn-123",
            "description": "Grocery shopping",
            "amount": 45.50,
            "date": "2025-01-15T10:30:00Z"
          }
        ]
      },
      "transportation": {
        "totalAmount": 200.00,
        "transactionCount": 5,
        "averageAmount": 40.00,
        "transactions": []
      }
    },
    "totalIncome": 5000.00,
    "totalExpense": 2300.00,
    "netIncome": 2700.00
  }
}
```

---

## Error Response Format

**Standard Error Response:**
```json
{
  "success": false,
  "error": "Error description",
  "code": "ERROR_CODE",
  "details": {
    "field": "Additional error details"
  }
}
```

**Common Status Codes:**
- `200`: OK
- `201`: Created
- `400`: Bad Request
- `401`: Unauthorized
- `403`: Forbidden
- `404`: Not Found
- `409`: Conflict
- `500`: Internal Server Error

---

## Common Error Codes

| Code | Status | Description |
|------|--------|-------------|
| INVALID_CREDENTIALS | 401 | Email or password is incorrect |
| DUPLICATE_EMAIL | 400 | Email already registered |
| INVALID_TOKEN | 401 | Access token is invalid or expired |
| NOT_FOUND | 404 | Resource not found |
| INSUFFICIENT_PERMISSIONS | 403 | User does not have permission |
| VALIDATION_ERROR | 400 | Request validation failed |
| SERVER_ERROR | 500 | Internal server error |

---

## Notes for Implementation

1. **Authentication**: Use JWT tokens with 1-hour expiration
2. **Rate Limiting**: Implement rate limiting (100 requests per minute per user)
3. **Pagination**: Default limit is 20, maximum limit is 100
4. **Timestamps**: All timestamps should be in ISO 8601 format with UTC timezone
5. **Currency**: Default currency is USD, but should support multi-currency
6. **Categories**: Predefined list (food, transportation, utilities, entertainment, health, education, shopping, entertainment, bills, other)
7. **Payment Methods**: credit_card, debit_card, cash, bank_transfer, digital_wallet, other
8. **Validation**: Email format, password strength, positive amounts, valid dates
9. **Soft Deletes**: Consider using soft deletes for transactions
10. **Audit Logging**: Log all modifications for compliance
