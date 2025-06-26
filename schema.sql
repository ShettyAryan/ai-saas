CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- USERS TABLE
CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),      -- Internal UUID
  clerk_user_id VARCHAR(255) UNIQUE ,          -- Clerk ID (e.g., user_abc123)
  email VARCHAR(255) UNIQUE,
  full_name VARCHAR(255),
  customer_id VARCHAR(255) UNIQUE,                     -- Stripe Customer ID
  price_id VARCHAR(255),                               -- Stripe Price ID
  status VARCHAR(50) DEFAULT 'inactive',
  created_at TIMESTAMPTZ DEFAULT current_timestamp,
  updated_at TIMESTAMPTZ DEFAULT current_timestamp
);

-- PDF_SUMMARIES TABLE
CREATE TABLE pdf_summaries (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL,                               -- FK to users.id (UUID)
  original_file_url TEXT NOT NULL,
  summary_text TEXT NOT NULL,
  status VARCHAR(50) DEFAULT 'completed',
  title TEXT,
  file_name TEXT,
  created_at TIMESTAMPTZ DEFAULT current_timestamp,
  updated_at TIMESTAMPTZ DEFAULT current_timestamp,
  FOREIGN KEY (user_id) REFERENCES users(id)
);

-- PAYMENTS TABLE
CREATE TABLE payments (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  amount INTEGER NOT NULL,
  status VARCHAR(50) NOT NULL,
  stripe_payment_id VARCHAR(255) UNIQUE NOT NULL,
  price_id VARCHAR(255) NOT NULL,
  user_email VARCHAR(255) NOT NULL REFERENCES users(email),
  created_at TIMESTAMPTZ DEFAULT current_timestamp,
  updated_at TIMESTAMPTZ DEFAULT current_timestamp
);

-- TRIGGER FUNCTION: Auto-update 'updated_at'
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at := current_timestamp;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- TRIGGERS
CREATE TRIGGER update_users_updated_at
BEFORE UPDATE ON users
FOR EACH ROW
EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_pdf_summaries_updated_at
BEFORE UPDATE ON pdf_summaries
FOR EACH ROW
EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_payments_updated_at
BEFORE UPDATE ON payments
FOR EACH ROW
EXECUTE FUNCTION update_updated_at_column();
