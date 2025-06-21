create extension if not exists "uuid-ossp";

-- Fix: Missing table name before amp
create table users (
  id varchar(255) primary key,
  email varchar(255) unique,
  full_name varchar(255),
  customer_id varchar(255) unique,
  price_id varchar(255),
  status varchar(50) default 'inactive',
  created_at timestamp with time zone default current_timestamp,
  updated_at timestamp with time zone default current_timestamp
);

-- Table: pdf_summaries
create table pdf_summaries (
  id UUID primary key default uuid_generate_v4(),
  user_id varchar(255) not null,
  original_file_url text not null,
  summary_text text not null,
  status varchar(50) default 'completed',
  title text,
  file_name text,
  created_at timestamp with time zone default current_timestamp,
  updated_at timestamp with time zone default current_timestamp,
  foreign key (user_id) references users(id)
);

-- Table: payments
create table payments (
  id UUID primary key default uuid_generate_v4(),
  amount integer not null,
  status varchar(50) not null,
  stripe_payment_id varchar(255) unique not null,
  price_id varchar(255) not null,
  user_email varchar(255) not null references users(email),
  created_at timestamp with time zone default current_timestamp,
  updated_at timestamp with time zone default current_timestamp
);

-- Trigger function for automatic updated_at
create or replace function update_updated_at_column()
returns trigger as $$
begin
  new.updated_at = current_timestamp;
  return new;
end;
$$ language plpgsql;

-- Triggers
create trigger update_users_updated_at
before update on users
for each row
execute function update_updated_at_column();

create trigger update_pdf_summaries_updated_at
before update on pdf_summaries
for each row
execute function update_updated_at_column();

create trigger update_payments_updated_at
before update on payments
for each row
execute function update_updated_at_column();


