# 🚀 Hitex Spares - Complete Deployment Guide

## 📋 Table of Contents
1. [Supabase Setup](#supabase-setup)
2. [Netlify Deployment](#netlify-deployment)
3. [Cloudflare R2/Images Setup](#cloudflare-setup)
4. [Environment Variables](#environment-variables)
5. [Database Schema](#database-schema)
6. [API Endpoints](#api-endpoints)

---

## 🗄️ SUPABASE SETUP

### Step 1: Create Supabase Project

1. Go to [https://supabase.com](https://supabase.com)
2. Click "Start your project"
3. Create new organization (if needed)
4. Click "New Project"
   - **Project Name:** `hitex-spares-production`
   - **Database Password:** (Generate strong password - SAVE THIS!)
   - **Region:** Choose closest to your users (e.g., Mumbai for India)
   - **Pricing Plan:** Free tier is sufficient to start
5. Wait 2-3 minutes for project provisioning

### Step 2: Get API Keys

1. In your Supabase dashboard, go to **Settings** → **API**
2. Copy these values:
   ```
   Project URL: https://xxxxx.supabase.co
   anon/public key: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
   service_role key: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9... (KEEP SECRET!)
   ```

### Step 3: Create Database Tables

1. Go to **SQL Editor** in Supabase dashboard
2. Click "New Query"
3. Copy and paste the schema from `SUPABASE_SCHEMA.sql` (see below)
4. Click "Run"

---

## 📊 DATABASE SCHEMA

Create this file: `SUPABASE_SCHEMA.sql`

```sql
-- =====================================================
-- HITEX SPARES DATABASE SCHEMA
-- Diamond System: 5 Diamonds = ₹1
-- Direct Purchase: 15% diamonds
-- Indirect Purchase (Referrals): 10% diamonds
-- =====================================================

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- =====================================================
-- USERS TABLE
-- =====================================================
CREATE TABLE users (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    mobile_no VARCHAR(15) UNIQUE NOT NULL,
    full_name VARCHAR(100) NOT NULL,
    avatar_url TEXT,
    upi_id VARCHAR(100),
    referred_by UUID REFERENCES users(id),
    balance_diamonds INTEGER DEFAULT 0,
    total_earned_diamonds INTEGER DEFAULT 0,
    monthly_volume DECIMAL(12,2) DEFAULT 0,
    daily_streak INTEGER DEFAULT 0,
    last_login TIMESTAMP WITH TIME ZONE,
    tier VARCHAR(20) DEFAULT 'bronze', -- bronze, silver, gold, platinum
    referral_code VARCHAR(20) UNIQUE NOT NULL,
    achievements JSONB DEFAULT '[]',
    notifications_unread INTEGER DEFAULT 0,
    onboarding_completed BOOLEAN DEFAULT FALSE,
    bank_account_number VARCHAR(50),
    bank_ifsc_code VARCHAR(20),
    bank_account_holder VARCHAR(100),
    status VARCHAR(20) DEFAULT 'active', -- active, suspended, inactive
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Index for faster queries
CREATE INDEX idx_users_mobile ON users(mobile_no);
CREATE INDEX idx_users_referral_code ON users(referral_code);
CREATE INDEX idx_users_tier ON users(tier);

-- =====================================================
-- STORES TABLE
-- =====================================================
CREATE TABLE stores (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(200) NOT NULL,
    location VARCHAR(100) NOT NULL,
    address TEXT,
    contact_person VARCHAR(100),
    contact_mobile VARCHAR(15),
    status VARCHAR(20) DEFAULT 'active',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- =====================================================
-- STOREKEEPERS TABLE
-- =====================================================
CREATE TABLE storekeepers (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    store_id UUID REFERENCES stores(id) ON DELETE CASCADE,
    mobile_no VARCHAR(15) UNIQUE NOT NULL,
    full_name VARCHAR(100) NOT NULL,
    status VARCHAR(20) DEFAULT 'active',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- =====================================================
-- TRANSACTIONS TABLE
-- =====================================================
CREATE TABLE transactions (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    store_id UUID REFERENCES stores(id),
    storekeeper_id UUID REFERENCES storekeepers(id),
    transaction_type VARCHAR(30) NOT NULL, -- purchase_direct, purchase_referral, withdrawal, scratch_win, bonus
    purchase_amount DECIMAL(12,2), -- Purchase amount in INR
    diamonds_credited INTEGER DEFAULT 0,
    diamonds_debited INTEGER DEFAULT 0,
    balance_after INTEGER,
    description TEXT,
    status VARCHAR(20) DEFAULT 'completed', -- pending, completed, failed
    transaction_date TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Indexes
CREATE INDEX idx_transactions_user ON transactions(user_id);
CREATE INDEX idx_transactions_date ON transactions(transaction_date DESC);
CREATE INDEX idx_transactions_type ON transactions(transaction_type);

-- =====================================================
-- WITHDRAWALS TABLE
-- =====================================================
CREATE TABLE withdrawals (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    diamonds_amount INTEGER NOT NULL,
    inr_amount DECIMAL(10,2) NOT NULL,
    upi_id VARCHAR(100) NOT NULL,
    status VARCHAR(30) DEFAULT 'pending', -- pending, under_review, processing_payment, completed, failed
    transaction_id VARCHAR(100),
    requested_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    processed_at TIMESTAMP WITH TIME ZONE,
    admin_notes TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Indexes
CREATE INDEX idx_withdrawals_user ON withdrawals(user_id);
CREATE INDEX idx_withdrawals_status ON withdrawals(status);

-- =====================================================
-- ACHIEVEMENTS TABLE
-- =====================================================
CREATE TABLE achievements (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    code VARCHAR(50) UNIQUE NOT NULL,
    name VARCHAR(100) NOT NULL,
    name_hi VARCHAR(100),
    description TEXT,
    description_hi TEXT,
    criteria JSONB, -- e.g., {"type": "total_earned", "threshold": 250000}
    icon VARCHAR(50),
    color VARCHAR(20),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- =====================================================
-- USER_ACHIEVEMENTS TABLE
-- =====================================================
CREATE TABLE user_achievements (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    achievement_id UUID REFERENCES achievements(id) ON DELETE CASCADE,
    unlocked_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    UNIQUE(user_id, achievement_id)
);

-- =====================================================
-- NOTIFICATIONS TABLE
-- =====================================================
CREATE TABLE notifications (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    type VARCHAR(50) NOT NULL,
    title VARCHAR(200) NOT NULL,
    title_hi VARCHAR(200),
    message TEXT NOT NULL,
    message_hi TEXT,
    read BOOLEAN DEFAULT FALSE,
    icon VARCHAR(50),
    color VARCHAR(20),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Index
CREATE INDEX idx_notifications_user ON notifications(user_id, read);

-- =====================================================
-- SCRATCH_CARDS TABLE
-- =====================================================
CREATE TABLE scratch_cards (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    diamonds_won INTEGER,
    scratched BOOLEAN DEFAULT FALSE,
    scratched_at TIMESTAMP WITH TIME ZONE,
    expires_at TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- =====================================================
-- REFERRALS TABLE
-- =====================================================
CREATE TABLE referrals (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    referrer_id UUID REFERENCES users(id) ON DELETE CASCADE,
    referred_id UUID REFERENCES users(id) ON DELETE CASCADE,
    total_diamonds_earned INTEGER DEFAULT 0,
    status VARCHAR(20) DEFAULT 'active',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    UNIQUE(referrer_id, referred_id)
);

-- =====================================================
-- TIER_BENEFITS TABLE
-- =====================================================
CREATE TABLE tier_benefits (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    tier_name VARCHAR(20) UNIQUE NOT NULL,
    min_volume DECIMAL(12,2) NOT NULL,
    max_volume DECIMAL(12,2),
    cashback_percentage DECIMAL(5,2) NOT NULL,
    benefits JSONB,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Insert default tiers
INSERT INTO tier_benefits (tier_name, min_volume, max_volume, cashback_percentage) VALUES
('bronze', 0, 100000, 3.0),
('silver', 100000, 300000, 3.5),
('gold', 300000, 500000, 4.0),
('platinum', 500000, NULL, 4.5);

-- =====================================================
-- FUNCTIONS & TRIGGERS
-- =====================================================

-- Function to update user balance after transaction
CREATE OR REPLACE FUNCTION update_user_balance()
RETURNS TRIGGER AS $$
BEGIN
    UPDATE users 
    SET 
        balance_diamonds = balance_diamonds + COALESCE(NEW.diamonds_credited, 0) - COALESCE(NEW.diamonds_debited, 0),
        total_earned_diamonds = total_earned_diamonds + COALESCE(NEW.diamonds_credited, 0),
        updated_at = NOW()
    WHERE id = NEW.user_id;
    
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger to automatically update balance
CREATE TRIGGER trigger_update_balance
AFTER INSERT ON transactions
FOR EACH ROW
EXECUTE FUNCTION update_user_balance();

-- Function to calculate referral commission
CREATE OR REPLACE FUNCTION calculate_referral_commission()
RETURNS TRIGGER AS $$
DECLARE
    referrer_user_id UUID;
    commission_diamonds INTEGER;
BEGIN
    -- Only for direct purchases
    IF NEW.transaction_type = 'purchase_direct' THEN
        -- Get referrer
        SELECT referred_by INTO referrer_user_id
        FROM users
        WHERE id = NEW.user_id AND referred_by IS NOT NULL;
        
        IF referrer_user_id IS NOT NULL THEN
            -- Calculate 10% commission (indirect purchase rate)
            commission_diamonds := FLOOR(NEW.purchase_amount * 0.10 * 5);
            
            -- Insert commission transaction
            INSERT INTO transactions (
                user_id,
                transaction_type,
                purchase_amount,
                diamonds_credited,
                description
            ) VALUES (
                referrer_user_id,
                'purchase_referral',
                NEW.purchase_amount,
                commission_diamonds,
                'Referral commission from ' || (SELECT full_name FROM users WHERE id = NEW.user_id)
            );
            
            -- Update referral stats
            UPDATE referrals
            SET total_diamonds_earned = total_diamonds_earned + commission_diamonds
            WHERE referrer_id = referrer_user_id AND referred_id = NEW.user_id;
        END IF;
    END IF;
    
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger for referral commission
CREATE TRIGGER trigger_referral_commission
AFTER INSERT ON transactions
FOR EACH ROW
EXECUTE FUNCTION calculate_referral_commission();

-- Function to update tier based on monthly volume
CREATE OR REPLACE FUNCTION update_user_tier(user_uuid UUID)
RETURNS VARCHAR AS $$
DECLARE
    current_volume DECIMAL;
    new_tier VARCHAR;
BEGIN
    SELECT monthly_volume INTO current_volume
    FROM users WHERE id = user_uuid;
    
    SELECT tier_name INTO new_tier
    FROM tier_benefits
    WHERE current_volume >= min_volume 
    AND (max_volume IS NULL OR current_volume < max_volume)
    ORDER BY min_volume DESC
    LIMIT 1;
    
    UPDATE users SET tier = new_tier WHERE id = user_uuid;
    
    RETURN new_tier;
END;
$$ LANGUAGE plpgsql;

-- =====================================================
-- ROW LEVEL SECURITY (RLS)
-- =====================================================

-- Enable RLS on all tables
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE transactions ENABLE ROW LEVEL SECURITY;
ALTER TABLE withdrawals ENABLE ROW LEVEL SECURITY;
ALTER TABLE notifications ENABLE ROW LEVEL SECURITY;
ALTER TABLE scratch_cards ENABLE ROW LEVEL SECURITY;

-- Users can only see their own data
CREATE POLICY "Users can view own profile"
    ON users FOR SELECT
    USING (auth.uid()::text = id::text);

CREATE POLICY "Users can update own profile"
    ON users FOR UPDATE
    USING (auth.uid()::text = id::text);

-- Transactions policy
CREATE POLICY "Users can view own transactions"
    ON transactions FOR SELECT
    USING (auth.uid()::text = user_id::text);

-- Withdrawals policy
CREATE POLICY "Users can view own withdrawals"
    ON withdrawals FOR SELECT
    USING (auth.uid()::text = user_id::text);

CREATE POLICY "Users can create own withdrawals"
    ON withdrawals FOR INSERT
    WITH CHECK (auth.uid()::text = user_id::text);

-- =====================================================
-- SEED DATA (Optional - for testing)
-- =====================================================

-- Insert sample stores
INSERT INTO stores (name, location, address) VALUES
('MG Road Textiles', 'Bangalore', 'MG Road, Bangalore - 560001'),
('Brigade Road Fabrics', 'Bangalore', 'Brigade Road, Bangalore - 560001'),
('Textile Hub Mumbai', 'Mumbai', 'Dadar, Mumbai - 400014');

-- Insert sample achievements
INSERT INTO achievements (code, name, name_hi, description, description_hi, icon, color) VALUES
('first_purchase', 'First Steps', 'पहला कदम', 'Made your first purchase', 'अपनी पहली खरीद की', 'ShoppingCart', '#10B981'),
('purchases_10', 'Regular Customer', 'नियमित ग्राहक', 'Completed 10 purchases', '10 खरीदारी पूरी की', 'Package', '#3B82F6'),
('top_10', 'Top Performer', 'शीर्ष प्रदर्शनकर्ता', 'Reached Top 10 in leaderboard', 'लीडरबोर्ड में शीर्ष 10 में पहुंचे', 'Trophy', '#F59E0B');
```

Save this and run it in Supabase SQL Editor.

---

## 🔐 ENVIRONMENT VARIABLES

### Backend (.env)
```bash
# Supabase
SUPABASE_URL=https://xxxxx.supabase.co
SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
SUPABASE_SERVICE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...

# App Config
APP_NAME=Hitex Spares
ENVIRONMENT=production
SECRET_KEY=your-super-secret-key-here

# Diamond System
DIAMOND_CONVERSION_RATE=5
DIRECT_PURCHASE_RATE=0.15
INDIRECT_PURCHASE_RATE=0.10

# Cloudflare (for images)
CLOUDFLARE_ACCOUNT_ID=your-account-id
CLOUDFLARE_R2_ACCESS_KEY_ID=your-access-key
CLOUDFLARE_R2_SECRET_ACCESS_KEY=your-secret-key
CLOUDFLARE_R2_BUCKET_NAME=hitex-spares-uploads
CLOUDFLARE_R2_PUBLIC_URL=https://uploads.hitexspares.com

# CORS
CORS_ORIGINS=https://your-frontend-domain.netlify.app,https://hitexspares.com
```

### Frontend (.env)
```bash
REACT_APP_BACKEND_URL=https://your-backend-api.com
REACT_APP_SUPABASE_URL=https://xxxxx.supabase.co
REACT_APP_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

---

**Continue to:** `NETLIFY_DEPLOYMENT.md` and `CLOUDFLARE_SETUP.md`
