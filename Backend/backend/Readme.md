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

