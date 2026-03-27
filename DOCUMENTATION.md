# Hitex Spares Loyalty App - Complete Documentation

## 📋 Table of Contents
1. [Project Overview](#project-overview)
2. [Tech Stack](#tech-stack)
3. [Diamond System](#diamond-system)
4. [Portal Overview](#portal-overview)
5. [Page Routes](#page-routes)
6. [Features by Portal](#features-by-portal)
7. [File Structure](#file-structure)
8. [Components](#components)
9. [Utilities & Helpers](#utilities--helpers)
10. [Mock Data Structure](#mock-data-structure)
11. [Translations (i18n)](#translations-i18n)
12. [Styling & Design System](#styling--design-system)
13. [Setup & Installation](#setup--installation)
14. [Test Credentials](#test-credentials)
15. [API Endpoints](#api-endpoints)

---

## 🎯 Project Overview

**Hitex Spares Loyalty Micro SaaS** is a comprehensive loyalty rewards platform designed for the textile recycling industry. It enables businesses to reward customers with diamonds (💎) for their purchases, which can be converted to INR and withdrawn via UPI.

### Key Features:
- **Diamond-based Rewards System** (5 💎 = ₹1)
- **Multi-Portal Architecture** (User, Admin, Storekeeper)
- **QR Code-based Customer Identification**
- **Referral Program** with multi-level commissions
- **Scratch Card Bonuses**
- **Monthly Leaderboard** with prizes
- **Bilingual Support** (English & Hindi)
- **PWA Support** for mobile installation

---

## 🛠 Tech Stack

### Frontend
| Technology | Purpose |
|------------|---------|
| React 18 | UI Framework |
| React Router v6 | Client-side routing |
| Tailwind CSS | Styling |
| Shadcn/ui | UI Components |
| Lucide React | Icons |
| QRCode.react | QR Code generation |
| Sonner | Toast notifications |
| Recharts | Charts & graphs |

### Backend
| Technology | Purpose |
|------------|---------|
| FastAPI | Python web framework |
| MongoDB | Database |
| Motor | Async MongoDB driver |
| Pydantic | Data validation |

### Design System
- **Primary Color**: Emerald Green `#10B981`
- **Background**: Black `#000000`, Dark Gray `#09090B`
- **Border Color**: `#222222`
- **Text Colors**: White `#FFFFFF`, Gray `#A1A1AA`, `#71717A`
- **Error Color**: Red `#EF4444`
- **Warning Color**: Amber `#F59E0B`
- **Info Color**: Blue `#3B82F6`

---

## 💎 Diamond System

### Conversion Rate
```
5 Diamonds (💎) = ₹1 INR
1 Diamond (💎) = ₹0.20 INR
```

### Earning Rates
| Type | Rate | Example |
|------|------|---------|
| Direct Purchase | 15% | ₹10,000 purchase = 7,500 💎 (worth ₹1,500) |
| Referral Commission | 10% | Referral's ₹10,000 purchase = 5,000 💎 (worth ₹1,000) |
| Scratch Card Bonus | Variable | 500 💎 to 25,000 💎 |

### Withdrawal Limits
- **Minimum**: 2,500 💎 (₹500)
- **Maximum**: 250,000 💎 (₹50,000) per transaction

### Diamond Utility Functions (`/frontend/src/lib/diamondUtils.js`)
```javascript
// Convert diamonds to INR
diamondsToINR(diamonds) → number

// Convert INR to diamonds  
inrToDiamonds(inr) → number

// Format diamonds with emoji
formatDiamonds(diamonds, showIcon = true) → string  // "7,500 💎"

// Format with both diamond and INR
formatDiamondsWithINR(diamonds) → { diamonds, inr, formatted, inrFormatted }

// Calculate direct purchase diamonds
calculateDirectPurchaseDiamonds(purchaseAmount) → number

// Calculate referral commission diamonds
calculateIndirectPurchaseDiamonds(purchaseAmount) → number
```

---

## 🚪 Portal Overview

### 1. User Portal (`/user`)
Mobile-first interface for customers to:
- View diamond balance and earnings
- Withdraw to UPI
- Share referral links
- Scratch bonus cards
- View transaction history
- Check leaderboard rankings

### 2. Admin Portal (`/admin`)
Desktop interface for administrators to:
- Approve/reject transactions
- Manage users and storekeepers
- Process payouts
- Configure reward settings
- Manage stores and prizes

### 3. Storekeeper Portal (`/storekeeper`)
Tablet-optimized interface for store staff to:
- Scan customer QR codes
- Enter purchase transactions
- Verify customer identity

---

## 🗺 Page Routes

### Public Routes
| Route | Component | Description |
|-------|-----------|-------------|
| `/` | LandingPage | Marketing landing page |
| `/auth/user` | UserAuthPage | User login via OTP |
| `/auth/admin` | AdminAuthPage | Admin login |
| `/auth/storekeeper` | StorekeeperAuthPage | Storekeeper login |

### User Portal Routes
| Route | Component | Description |
|-------|-----------|-------------|
| `/user` | HomePage | Dashboard with balance & quick actions |
| `/user/passbook` | PassbookPage | Transaction history |
| `/user/referrals` | ReferralsPage | Referral link & crew |
| `/user/scratch-cards` | ScratchCardsPage | Bonus scratch cards |
| `/user/leaderboard` | LeaderboardPage | Monthly rankings |
| `/user/profile` | ProfilePage | User settings |
| `/user/achievements` | AchievementsPage | Badges & achievements |
| `/user/withdrawal-history` | WithdrawalHistoryPage | Withdrawal records |

### Admin Portal Routes
| Route | Component | Description |
|-------|-----------|-------------|
| `/admin/approvals` | AdminApprovalsPage | Transaction approvals |
| `/admin/users` | AdminUsersPage | User management |
| `/admin/storekeepers` | AdminStorekeepersPage | Storekeeper management |
| `/admin/payouts` | AdminPayoutsPage | Payout processing |
| `/admin/stores` | AdminStoresPage | Store locations |
| `/admin/gifts` | AdminGiftsPage | Prize management |
| `/admin/settings` | AdminSettingsPage | System configuration |

### Storekeeper Portal Routes
| Route | Component | Description |
|-------|-----------|-------------|
| `/storekeeper` | StorekeeperPage | Transaction entry |

---

## ✨ Features by Portal

### User Portal Features

#### Home Page
- **Balance Display**: Shows total diamonds with INR equivalent
- **Withdraw to UPI**: Modal for withdrawal requests
- **Show QR**: Branded QR code for store identification
- **Quick Stats**: Total earned, monthly volume, referral earnings, scratch wins
- **Daily Streak**: Login streak tracker
- **Activity Feed**: Recent transactions
- **Progress to Rank**: Leaderboard position tracker

#### Passbook
- **Summary Cards**: Total earned (💎), Total withdrawn (₹), Current balance (💎)
- **Transaction Filter**: Filter by type (All, Purchases, Referrals, Scratch, Withdrawals)
- **Transaction List**: Detailed history with credits/debits

#### Referrals
- **Referral Link**: Unique shareable link
- **Copy Button**: One-click copy to clipboard
- **WhatsApp Share**: Direct share to WhatsApp
- **Crew List**: All referred users with lifetime earnings

#### Scratch Cards
- **Available Cards**: Unscratched cards from qualifying purchases
- **Scratch Animation**: Interactive canvas-based scratching
- **Reward Reveal**: Diamond bonus with celebration animation
- **History**: Previously scratched cards

#### Leaderboard
- **Monthly Prizes**: Top 3 winner prizes display
- **Top 10 Rankings**: User rankings by monthly volume
- **Location Display**: Shows city instead of phone numbers

#### Profile
- **User Info**: Avatar, name, mobile number
- **Tier Status**: Current tier with benefits
- **Account Details**: UPI ID, balance, volume
- **Mill List**: Associated textile mills
- **Actions**: Edit profile, Update UPI, Withdraw

### Admin Portal Features

#### Transaction Approvals
- **Pending Queue**: Transactions awaiting approval
- **Keyboard Shortcuts**: A to Approve, R to Reject
- **Buyer Details**: Name, mobile, mill, amount, store
- **Processed List**: Recently approved/rejected

#### User Management
- **Search**: Find users by name or mobile
- **User List**: All registered users with details
- **Edit Modal**: Modify user information
- **Block/Unblock**: Account status control
- **Balance Display**: Shows diamonds (💎)

#### Storekeeper Management
- **Add Storekeeper**: Register new staff
- **Store Assignment**: Link to specific store
- **Activate/Deactivate**: Control access
- **Search**: Find by name, mobile, or store

#### Payout Management
- **Pending Payouts**: Withdrawal requests queue
- **User Details**: Name, mobile, UPI ID, amount
- **Mark Complete**: Process payout confirmation
- **Completed List**: Processed payouts

#### Store Management
- **Add Store**: Register new locations
- **Store Details**: Name, address, Google Maps link
- **Navigate Button**: Open in Google Maps
- **Delete Store**: Remove location

#### Prize Management
- **Prize Grid**: Top 3 monthly prizes
- **Image Upload**: Change prize images
- **Edit Details**: Modify title and description
- **Delete Prize**: Remove from display

#### System Settings
- **Scratch Card Config**:
  - Minimum purchase amount (₹)
  - Minimum/Maximum reward (💎)
  - Jackpot reward (💎)
  - Jackpot probability (%)
- **Referral Config**:
  - Direct referral percentage
  - Indirect referral percentage
  - Example calculation display

### Storekeeper Portal Features

#### Transaction Entry
- **Store Info**: Current store name and address
- **Customer Search**: Find by mobile number
- **QR Scanner**: Scan customer QR code
- **User Verification**: Display verified customer info
- **Transaction Form**: Bill amount (₹) and mill selection
- **Submit**: Record transaction for approval

---

## 📁 File Structure

```
/app
├── backend/
│   ├── server.py              # FastAPI main server
│   └── requirements.txt       # Python dependencies
│
├── frontend/
│   ├── public/
│   │   ├── index.html
│   │   └── manifest.json      # PWA manifest
│   │
│   ├── src/
│   │   ├── components/
│   │   │   ├── ui/            # Shadcn UI components
│   │   │   ├── Layout.js      # Portal layouts
│   │   │   ├── AppHeader.js   # Main header
│   │   │   ├── ActivityFeed.js
│   │   │   ├── BadgeDisplay.js
│   │   │   ├── FAQSection.js
│   │   │   ├── ProgressToRank.js
│   │   │   ├── PWAInstallModal.js
│   │   │   ├── QuickStats.js
│   │   │   ├── ScratchCardModal.js
│   │   │   ├── StreakCounter.js
│   │   │   ├── TestimonialsSection.js
│   │   │   ├── TierStatus.js
│   │   │   └── TrustIndicators.js
│   │   │
│   │   ├── lib/
│   │   │   ├── diamondUtils.js      # Diamond conversion utilities
│   │   │   ├── mockData.js          # Main mock data
│   │   │   ├── mockDataEnhanced.js  # Extended mock data
│   │   │   ├── translations.js       # Base translations
│   │   │   ├── translationsEnhanced.js  # Extended translations
│   │   │   ├── LanguageContext.js   # i18n context
│   │   │   └── utils.js             # General utilities
│   │   │
│   │   ├── pages/
│   │   │   ├── LandingPage.js
│   │   │   ├── auth/
│   │   │   │   ├── AdminAuthPage.js
│   │   │   │   ├── StorekeeperAuthPage.js
│   │   │   │   └── UserAuthPage.js
│   │   │   ├── admin/
│   │   │   │   ├── AdminApprovalsPage.js
│   │   │   │   ├── AdminGiftsPage.js
│   │   │   │   ├── AdminPayoutsPage.js
│   │   │   │   ├── AdminSettingsPage.js
│   │   │   │   ├── AdminStorekeepersPage.js
│   │   │   │   ├── AdminStoresPage.js
│   │   │   │   └── AdminUsersPage.js
│   │   │   ├── storekeeper/
│   │   │   │   └── StorekeeperPage.js
│   │   │   └── user/
│   │   │       ├── AchievementsPage.js
│   │   │       ├── HomePage.js
│   │   │       ├── LeaderboardPage.js
│   │   │       ├── PassbookPage.js
│   │   │       ├── ProfilePage.js
│   │   │       ├── ReferralsPage.js
│   │   │       ├── ScratchCardsPage.js
│   │   │       └── WithdrawalHistoryPage.js
│   │   │
│   │   ├── App.js             # Main app with routes
│   │   └── index.js           # Entry point
│   │
│   ├── package.json
│   ├── tailwind.config.js
│   └── craco.config.js
│
├── memory/
│   └── test_credentials.md    # Test login credentials
│
├── test_result.md             # Testing documentation
├── DOCUMENTATION.md           # This file
└── README.md                  # Basic readme
```

---

## 🧩 Components

### Layout Components

#### `Layout.js`
Provides three layout wrappers:
- `UserLayout` - Mobile-first with bottom navigation
- `AdminLayout` - Desktop sidebar navigation
- `StorekeeperLayout` - Tablet-optimized layout

#### `AppHeader.js`
- Logo display
- Language toggle (EN/हिंदी)
- Notification bell
- PWA install button

### Feature Components

| Component | Purpose |
|-----------|---------|
| `ActivityFeed` | Recent transaction list |
| `BadgeDisplay` | Achievement badges |
| `FAQSection` | Collapsible FAQ with categories |
| `ProgressToRank` | Leaderboard progress bar |
| `PWAInstallModal` | App installation prompt |
| `QuickStats` | Dashboard stat cards |
| `ScratchCardModal` | Interactive scratch animation |
| `StreakCounter` | Daily login streak |
| `TestimonialsSection` | User testimonials |
| `TierStatus` | Membership tier display |
| `TrustIndicators` | Platform stats |

### UI Components (Shadcn)
Located in `/components/ui/`:
- Button, Input, Label
- Dialog, Select
- Tabs, Card
- Toast (Sonner)

---

## 🔧 Utilities & Helpers

### `utils.js`
```javascript
// Tailwind class merger
cn(...inputs) → string

// Format INR currency
formatCurrency(amount) → "₹1,234.56"

// Format mobile number
formatMobileNumber(mobile) → "+91 98765 43210"

// Format date
formatDate(dateString) → "27 Mar 2024, 02:30 pm"

// Generate referral link
generateReferralLink(mobileNo) → URL

// Share on WhatsApp
shareOnWhatsApp(referralLink, userName) → void
```

### `diamondUtils.js`
```javascript
DIAMOND_TO_INR_RATE = 5

diamondsToINR(diamonds) → number
inrToDiamonds(inr) → number
formatDiamonds(diamonds, showIcon) → "7,500 💎"
formatDiamondsWithINR(diamonds) → object
calculateDirectPurchaseDiamonds(amount) → number
calculateIndirectPurchaseDiamonds(amount) → number
```

### `LanguageContext.js`
```javascript
// Provider
<LanguageProvider>

// Hook usage
const { lang, setLang, t } = useLanguage();

// Translation access
t('home.balance') → "Available Balance"
```

---

## 📊 Mock Data Structure

### `mockUser`
```javascript
{
  id: 'user-1',
  mobile_no: '+919876543210',
  full_name: 'Rajesh Kumar',
  avatar_url: 'https://...',
  upi_id: 'rajesh@paytm',
  balance_diamonds: 62252,
  monthly_volume: 415016.67,
  daily_streak: 7,
  tier: 'silver',
  total_earned_diamonds: 226253,
  referral_code: 'RAJESH2024',
  achievements: ['first_purchase', 'top_10'],
  notifications_unread: 3
}
```

### `mockPassbookTransactions`
```javascript
{
  id: 'txn-001',
  type: 'purchase', // purchase, referral_commission, scratch_bonus, withdrawal
  bill_no: 'MG-2024-001234',
  description: 'Purchase at MG Road Store',
  mill_name: 'Delhi Textile Mills',
  amount_purchased: 50000,
  points_credited: 1500,
  points_debited: 0,
  balance_after: 12450.50,
  date: '2024-01-20T14:30:00Z'
}
```

### `mockLeaderboard`
```javascript
{
  id: 'user-2',
  rank: 1,
  full_name: 'Suresh Reddy',
  avatar_url: 'https://...',
  monthly_volume: 550000,
  location: 'Hyderabad'
}
```

### `mockScratchCards`
```javascript
{
  id: 'scratch-1',
  purchase_amount: 75000,
  bill_no: 'MG-2024-001234',
  earned_date: '2024-01-20T14:30:00Z',
  scratched: false,
  reward_amount: 500,
  reward_type: 'bonus' // or 'jackpot'
}
```

### `tierBenefits`
```javascript
{
  bronze: {
    name: 'Bronze',
    nameHi: 'ब्रॉन्ज',
    minVolume: 0,
    maxVolume: 100000,
    cashback: 3,
    color: '#CD7F32',
    benefits: ['3% cashback on purchases', ...],
    benefitsHi: ['खरीद पर 3% कैशबैक', ...]
  },
  silver: { ... },
  gold: { ... },
  platinum: { ... }
}
```

---

## 🌐 Translations (i18n)

### Supported Languages
- English (`en`)
- Hindi (`hi`)

### Translation Structure
```javascript
// translations.js - Base translations
{
  common: { balance, volume, ... },
  home: { availableDiamonds, withdrawToUpi, ... },
  passbook: { title, totalEarned, ... },
  referrals: { title, yourCrew, ... },
  leaderboard: { title, top10, ... },
  profile: { editProfile, updateUpi, ... },
  scratch: { title, scratchNow, ... }
}

// translationsEnhanced.js - Extended translations
{
  trust: { distributed, activeUsers, ... },
  achievements: { title, unlocked, ... },
  streak: { title, keepItGoing, ... },
  activity: { title, today, ... },
  tier: { currentTier, progress, ... },
  faq: { title, categories, ... },
  withdrawalHistory: { title, minAmount, ... }
}
```

### Usage
```jsx
const { t, lang } = useLanguage();

// Basic translation
<p>{t('home.balance')}</p>

// Enhanced translation
const te = lang === 'hi' ? enhancements_hi : enhancements_en;
<p>{te.achievements.title}</p>

// Conditional rendering
<p>{lang === 'hi' ? item.nameHi : item.name}</p>
```

---

## 🎨 Styling & Design System

### Color Palette
```css
/* Primary */
--emerald-500: #10B981;
--emerald-600: #059669;

/* Backgrounds */
--black: #000000;
--dark-gray: #09090B;

/* Borders */
--border: #222222;
--border-hover: #10B981;

/* Text */
--white: #FFFFFF;
--gray-400: #A1A1AA;
--gray-500: #71717A;

/* Status */
--success: #10B981;
--error: #EF4444;
--warning: #F59E0B;
--info: #3B82F6;
```

### Typography
```css
/* Headings */
font-family: 'Inter', sans-serif;
font-weight: 900; /* font-black */
letter-spacing: -0.05em; /* tracking-tighter */

/* Labels */
font-size: 0.75rem; /* text-xs */
letter-spacing: 0.2em; /* tracking-[0.2em] */
text-transform: uppercase;

/* Monospace (numbers) */
font-family: monospace;
font-weight: 700; /* font-bold */
```

### Common Patterns
```jsx
// Card with hover effect
<div className="bg-transparent border border-[#222222] rounded-lg p-6 hover:border-[#10B981] transition-colors">

// Primary button
<button className="bg-[#10B981] text-black hover:bg-[#059669] font-bold uppercase tracking-wide">

// Outlined button
<button className="bg-transparent border border-[#10B981] text-[#10B981] hover:bg-[#10B981] hover:text-black">

// Section label
<p className="text-xs tracking-[0.2em] uppercase text-[#A1A1AA] font-bold">

// Glow effect
<div className="shadow-[0_0_15px_rgba(16,185,129,0.3)]">
```

---

## 🚀 Setup & Installation

### Prerequisites
- Node.js 18+
- Python 3.11+
- MongoDB

### Frontend Setup
```bash
cd /app/frontend
yarn install
yarn start
```

### Backend Setup
```bash
cd /app/backend
pip install -r requirements.txt
uvicorn server:app --host 0.0.0.0 --port 8001
```

### Environment Variables

#### Frontend (`.env`)
```
REACT_APP_BACKEND_URL=http://localhost:8001
```

#### Backend (`.env`)
```
MONGO_URL=mongodb://localhost:27017/hitex_spares
```

### Running with Supervisor
```bash
sudo supervisorctl restart all
sudo supervisorctl status
```

---

## 🔑 Test Credentials

### User Portal
- **Mobile**: +91 98765 43210
- **OTP**: 123456 (mock)

### Storekeeper Portal
- **Mobile**: +91 98765 43230
- **Password**: storekeeper123 (mock)

### Admin Portal
- **Email**: admin@hitexspares.com
- **Password**: admin123 (mock)

> **Note**: All authentication is currently mocked in the frontend. Navigate directly to portal URLs to access.

---

## 🔌 API Endpoints

### Backend Base URL
```
http://localhost:8001/api
```

### Health Check
```
GET /api/
Response: { "status": "healthy" }
```

### Users (Planned)
```
GET    /api/users
GET    /api/users/{id}
POST   /api/users
PUT    /api/users/{id}
DELETE /api/users/{id}
```

### Transactions (Planned)
```
GET    /api/transactions
POST   /api/transactions
PUT    /api/transactions/{id}/approve
PUT    /api/transactions/{id}/reject
```

### Withdrawals (Planned)
```
GET    /api/withdrawals
POST   /api/withdrawals
PUT    /api/withdrawals/{id}/complete
```

> **Note**: Backend is currently a basic FastAPI setup. Full API implementation pending.

---

## 📱 PWA Support

### Manifest (`public/manifest.json`)
```json
{
  "name": "Hitex Spares Rewards",
  "short_name": "Hitex Rewards",
  "start_url": "/user",
  "display": "standalone",
  "theme_color": "#10B981",
  "background_color": "#000000"
}
```

### Install Prompt
- Triggered via `beforeinstallprompt` event
- Custom modal with app benefits
- Works on Chrome, Edge, Samsung Internet

---

## 📄 License

Proprietary - Hitex Spares Rewards

---

## 📞 Support

For technical support, contact the development team.

---

*Documentation last updated: March 2024*
*App Version: 1.0.0*
