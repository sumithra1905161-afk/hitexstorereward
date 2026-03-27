# API Reference - Hitex Spares Loyalty

## Base URL
```
Production: https://your-domain.com/api
Development: http://localhost:8001/api
```

## Authentication
Currently using mock authentication. JWT-based auth planned for production.

---

## Endpoints

### Health Check
```http
GET /api/
```
**Response:**
```json
{
  "status": "healthy",
  "timestamp": "2024-03-27T18:30:00Z"
}
```

---

### Users

#### Get All Users
```http
GET /api/users
```

#### Get User by ID
```http
GET /api/users/{user_id}
```

#### Create User
```http
POST /api/users
Content-Type: application/json

{
  "mobile_no": "+919876543210",
  "full_name": "Rajesh Kumar",
  "upi_id": "rajesh@paytm"
}
```

#### Update User
```http
PUT /api/users/{user_id}
Content-Type: application/json

{
  "full_name": "Rajesh Kumar",
  "upi_id": "rajesh@paytm",
  "balance_diamonds": 50000
}
```

---

### Transactions

#### Get All Transactions
```http
GET /api/transactions
GET /api/transactions?status=pending
GET /api/transactions?type=purchase
```

#### Create Transaction
```http
POST /api/transactions
Content-Type: application/json

{
  "user_id": "user-1",
  "store_id": "store-1",
  "storekeeper_id": "sk-1",
  "bill_no": "MG-2024-001234",
  "amount": 50000,
  "mill_name": "Delhi Textile Mills"
}
```

#### Approve Transaction
```http
PUT /api/transactions/{transaction_id}/approve
```

#### Reject Transaction
```http
PUT /api/transactions/{transaction_id}/reject
Content-Type: application/json

{
  "reason": "Duplicate entry"
}
```

---

### Withdrawals

#### Get All Withdrawals
```http
GET /api/withdrawals
GET /api/withdrawals?status=pending
```

#### Create Withdrawal Request
```http
POST /api/withdrawals
Content-Type: application/json

{
  "user_id": "user-1",
  "diamonds": 25000,
  "upi_id": "rajesh@paytm"
}
```

**Response:**
```json
{
  "id": "wd-001",
  "user_id": "user-1",
  "diamonds": 25000,
  "inr_amount": 5000,
  "upi_id": "rajesh@paytm",
  "status": "pending",
  "created_at": "2024-03-27T18:30:00Z"
}
```

#### Complete Withdrawal
```http
PUT /api/withdrawals/{withdrawal_id}/complete
Content-Type: application/json

{
  "transaction_id": "UPI-REF-123456"
}
```

---

### Stores

#### Get All Stores
```http
GET /api/stores
```

#### Create Store
```http
POST /api/stores
Content-Type: application/json

{
  "name": "MG Road Store",
  "address": "123 MG Road, Bangalore",
  "maps_link": "https://maps.google.com/..."
}
```

---

### Storekeepers

#### Get All Storekeepers
```http
GET /api/storekeepers
```

#### Create Storekeeper
```http
POST /api/storekeepers
Content-Type: application/json

{
  "full_name": "Amit Singh",
  "mobile_no": "+919876543230",
  "store_id": "store-1"
}
```

---

### Settings

#### Get Settings
```http
GET /api/settings
```

**Response:**
```json
{
  "scratch_card": {
    "min_purchase_amount": 25000,
    "min_reward": 250,
    "max_reward": 1000,
    "jackpot_reward": 2000,
    "jackpot_probability": 5
  },
  "referral": {
    "direct_percent": 3,
    "indirect_percent": 2
  }
}
```

#### Update Settings
```http
PUT /api/settings
Content-Type: application/json

{
  "scratch_card": {
    "min_purchase_amount": 30000,
    "min_reward": 300,
    "max_reward": 1500,
    "jackpot_reward": 2500,
    "jackpot_probability": 3
  }
}
```

---

### Scratch Cards

#### Get User Scratch Cards
```http
GET /api/scratch-cards?user_id={user_id}
```

#### Scratch Card
```http
POST /api/scratch-cards/{card_id}/scratch
```

**Response:**
```json
{
  "id": "sc-001",
  "reward_amount": 500,
  "reward_type": "bonus",
  "scratched_at": "2024-03-27T18:30:00Z"
}
```

---

### Leaderboard

#### Get Monthly Leaderboard
```http
GET /api/leaderboard
GET /api/leaderboard?month=2024-03
```

**Response:**
```json
{
  "month": "2024-03",
  "rankings": [
    {
      "rank": 1,
      "user_id": "user-2",
      "full_name": "Suresh Reddy",
      "monthly_volume": 550000,
      "location": "Hyderabad"
    }
  ],
  "prizes": [
    {
      "rank": 1,
      "title": "MacBook Air M3",
      "image_url": "..."
    }
  ]
}
```

---

## Error Responses

### 400 Bad Request
```json
{
  "error": "validation_error",
  "message": "Invalid mobile number format",
  "field": "mobile_no"
}
```

### 401 Unauthorized
```json
{
  "error": "unauthorized",
  "message": "Invalid or expired token"
}
```

### 404 Not Found
```json
{
  "error": "not_found",
  "message": "User not found"
}
```

### 500 Internal Server Error
```json
{
  "error": "internal_error",
  "message": "An unexpected error occurred"
}
```

---

## Rate Limits

| Endpoint | Limit |
|----------|-------|
| General | 100 req/min |
| Auth | 10 req/min |
| Withdrawals | 5 req/min |

---

## Webhooks (Planned)

### Transaction Approved
```json
{
  "event": "transaction.approved",
  "data": {
    "transaction_id": "txn-001",
    "user_id": "user-1",
    "diamonds_credited": 7500
  }
}
```

### Withdrawal Completed
```json
{
  "event": "withdrawal.completed",
  "data": {
    "withdrawal_id": "wd-001",
    "user_id": "user-1",
    "amount_inr": 5000
  }
}
```

---

*API Version: 1.0.0*
