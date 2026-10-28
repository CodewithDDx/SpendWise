# SpendWise Backend API

Production-ready REST API for the **SpendWise** Personal Expense Tracker & Financial Planner.

## Features
- **User Profile & Settings**: Salary, name, base monthly savings, privacy masking
- **Transactions Management (Full CRUD)**: Filter by category, search by merchant, auto-confidence scoring
- **Recurring Expenses Engine**: Subscriptions and recurring bill detection and tracking
- **Savings Goals Planner**: Interactive timelines, monthly required savings calculation
- **Intelligent Statement Analysis**: Auto-categorization, spending patterns, customized savings tips
- **Data Backup & Restore**: Full JSON import/export
- **Zero-Dependency Persistent Database**: File-based transactional data store (`spendwise_data.json`)

## Quick Start
```bash
cd backend
npm install
npm start
```
Default URL: `http://localhost:5000`

## API Endpoints Reference

### Health Check
- `GET /api/health`

### Profile & Settings
- `GET /api/profile` - Fetch current user profile & salary
- `PUT /api/profile` - Update user name, salary, base savings, or mask state

### Transactions
- `GET /api/transactions?category=Food&search=swiggy` - Get transactions (optional category & search filter)
- `POST /api/transactions` - Add new transaction:
  ```json
  {
    "merchant": "Zomato",
    "category": "Food",
    "amount": 450,
    "source": "UPI",
    "date": "Oct 28"
  }
  ```
- `PUT /api/transactions/:id` - Update transaction (e.g. modify category or amount)
- `DELETE /api/transactions/:id` - Delete a transaction

### Recurring Subscriptions & Bills
- `GET /api/recurring` - List all recurring expenses
- `POST /api/recurring` - Add new recurring expense
- `PUT /api/recurring/:id` - Update recurring item
- `DELETE /api/recurring/:id` - Delete recurring item

### Savings Goals
- `GET /api/goals` - List all savings goals
- `POST /api/goals` - Add goal `{ "name": "iPhone 16", "emoji": "📱", "target": 80000, "saved": 20000, "months": 6 }`
- `PUT /api/goals/:id` - Update goal target, saved amount, or timeline
- `DELETE /api/goals/:id` - Remove a goal

### Analytics & Insights
- `GET /api/analytics` - Consolidated dashboard KPIs, category spending distribution, savings rate
- `GET /api/suggestions` - Actionable savings tips
- `POST /api/suggestions/:id/toggle` - Toggle suggestion state

### Statement Analysis
- `POST /api/statement/analyze` - Parses transaction rows, calculates savings rate, detects recurring charges, and generates personalized saving recommendations

### Backup & Restore
- `GET /api/export` - Export full database
- `POST /api/import` - Restore database from backup
