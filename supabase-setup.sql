-- ============================================
-- BENGKEL PRO - Supabase Setup SQL
-- ============================================

-- 1. CREATE USER TABLE (untuk login)
CREATE TABLE IF NOT EXISTS "user" (
  id bigint PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  name text NOT NULL,
  email text NOT NULL UNIQUE,
  password text NOT NULL,
  created_at timestamp with time zone DEFAULT now()
);

-- Disable RLS untuk user table (jika ada)
-- Note: RLS perlu diatur di UI Supabase atau run ini terpisah

-- ============================================
-- 2. CREATE CUSTOMERS TABLE
CREATE TABLE IF NOT EXISTS customers (
  id bigint PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  name text NOT NULL,
  email text,
  phone text,
  address text,
  city text,
  status text DEFAULT 'active',
  created_at timestamp with time zone DEFAULT now(),
  updated_at timestamp with time zone DEFAULT now()
);

-- ALTER TABLE customers DISABLE ROW LEVEL SECURITY;

-- ============================================
-- 3. CREATE VEHICLES TABLE
CREATE TABLE IF NOT EXISTS vehicles (
  id bigint PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  customer_id bigint NOT NULL REFERENCES customers(id) ON DELETE CASCADE,
  license_plate text NOT NULL UNIQUE,
  brand text NOT NULL,
  model text NOT NULL,
  year integer,
  color text,
  engine_number text,
  chassis_number text,
  status text DEFAULT 'active',
  created_at timestamp with time zone DEFAULT now(),
  updated_at timestamp with time zone DEFAULT now()
);

-- ALTER TABLE vehicles DISABLE ROW LEVEL SECURITY;

-- ============================================
-- 4. CREATE MEKANIKS TABLE (Teknisi/Mekanik)
CREATE TABLE IF NOT EXISTS mekaniks (
  id bigint PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  name text NOT NULL,
  email text UNIQUE,
  phone text,
  specialization text,
  experience_years integer,
  salary numeric,
  status text DEFAULT 'active',
  created_at timestamp with time zone DEFAULT now(),
  updated_at timestamp with time zone DEFAULT now()
);

-- ALTER TABLE mekaniks DISABLE ROW LEVEL SECURITY;

-- ============================================
-- 5. CREATE SPAREPARTS TABLE
CREATE TABLE IF NOT EXISTS spareparts (
  id bigint PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  name text NOT NULL,
  part_number text NOT NULL UNIQUE,
  category text,
  brand text,
  price numeric NOT NULL,
  stock integer DEFAULT 0,
  description text,
  status text DEFAULT 'available',
  created_at timestamp with time zone DEFAULT now(),
  updated_at timestamp with time zone DEFAULT now()
);

-- ALTER TABLE spareparts DISABLE ROW LEVEL SECURITY;

-- ============================================
-- 6. CREATE BOOKINGS TABLE (Pemesanan/Reservasi)
CREATE TABLE IF NOT EXISTS bookings (
  id bigint PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  customer_id bigint NOT NULL REFERENCES customers(id) ON DELETE CASCADE,
  vehicle_id bigint NOT NULL REFERENCES vehicles(id) ON DELETE CASCADE,
  booking_date timestamp with time zone NOT NULL,
  service_type text,
  notes text,
  status text DEFAULT 'pending',
  created_at timestamp with time zone DEFAULT now(),
  updated_at timestamp with time zone DEFAULT now()
);

-- ALTER TABLE bookings DISABLE ROW LEVEL SECURITY;

-- ============================================
-- 7. CREATE ORDERS TABLE (Pesanan Layanan)
CREATE TABLE IF NOT EXISTS orders (
  id bigint PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  booking_id bigint REFERENCES bookings(id) ON DELETE CASCADE,
  customer_id bigint NOT NULL REFERENCES customers(id) ON DELETE CASCADE,
  vehicle_id bigint NOT NULL REFERENCES vehicles(id) ON DELETE CASCADE,
  mekanik_id bigint REFERENCES mekaniks(id) ON DELETE SET NULL,
  order_date timestamp with time zone DEFAULT now(),
  service_description text,
  total_amount numeric,
  status text DEFAULT 'pending',
  completion_date timestamp with time zone,
  created_at timestamp with time zone DEFAULT now(),
  updated_at timestamp with time zone DEFAULT now()
);

-- ALTER TABLE orders DISABLE ROW LEVEL SECURITY;

-- ============================================
-- 8. CREATE ORDER_ITEMS TABLE (Detail Pesanan)
CREATE TABLE IF NOT EXISTS order_items (
  id bigint PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  order_id bigint NOT NULL REFERENCES orders(id) ON DELETE CASCADE,
  sparepart_id bigint REFERENCES spareparts(id) ON DELETE SET NULL,
  description text,
  quantity integer NOT NULL DEFAULT 1,
  unit_price numeric NOT NULL,
  total_price numeric NOT NULL,
  created_at timestamp with time zone DEFAULT now()
);

-- ALTER TABLE order_items DISABLE ROW LEVEL SECURITY;

-- ============================================
-- 9. CREATE INVOICES TABLE (Invoice/Tagihan)
CREATE TABLE IF NOT EXISTS invoices (
  id bigint PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  order_id bigint NOT NULL REFERENCES orders(id) ON DELETE CASCADE,
  invoice_number text NOT NULL UNIQUE,
  customer_id bigint NOT NULL REFERENCES customers(id) ON DELETE CASCADE,
  invoice_date timestamp with time zone DEFAULT now(),
  due_date timestamp with time zone,
  subtotal numeric,
  tax numeric DEFAULT 0,
  total_amount numeric,
  status text DEFAULT 'unpaid',
  paid_date timestamp with time zone,
  payment_method text,
  created_at timestamp with time zone DEFAULT now(),
  updated_at timestamp with time zone DEFAULT now()
);

-- ALTER TABLE invoices DISABLE ROW LEVEL SECURITY;

-- ============================================
-- 10. CREATE ANALYTICS TABLE (untuk tracking)
CREATE TABLE IF NOT EXISTS analytics (
  id bigint PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  event_type text NOT NULL,
  user_id bigint REFERENCES "user"(id) ON DELETE SET NULL,
  description text,
  metadata jsonb,
  created_at timestamp with time zone DEFAULT now()
);

-- ALTER TABLE analytics DISABLE ROW LEVEL SECURITY;

-- ============================================
-- INDEXES (untuk performa query)
-- ============================================

CREATE INDEX IF NOT EXISTS idx_customers_email ON customers(email);
CREATE INDEX IF NOT EXISTS idx_vehicles_customer_id ON vehicles(customer_id);
CREATE INDEX IF NOT EXISTS idx_vehicles_license_plate ON vehicles(license_plate);
CREATE INDEX IF NOT EXISTS idx_bookings_customer_id ON bookings(customer_id);
CREATE INDEX IF NOT EXISTS idx_bookings_vehicle_id ON bookings(vehicle_id);
CREATE INDEX IF NOT EXISTS idx_orders_customer_id ON orders(customer_id);
CREATE INDEX IF NOT EXISTS idx_orders_mekanik_id ON orders(mekanik_id);
CREATE INDEX IF NOT EXISTS idx_orders_status ON orders(status);
CREATE INDEX IF NOT EXISTS idx_order_items_order_id ON order_items(order_id);
CREATE INDEX IF NOT EXISTS idx_invoices_order_id ON invoices(order_id);
CREATE INDEX IF NOT EXISTS idx_invoices_status ON invoices(status);

-- ============================================
-- SAMPLE DATA (opsional - untuk testing)
-- ============================================

-- Insert sample user
INSERT INTO "user" (name, email, password) VALUES
  ('Mido Herdiansyah', 'mido24si@mahasiswa.pcr.ac.id', 'mido123')
ON CONFLICT (email) DO NOTHING;

-- Insert sample customers
INSERT INTO customers (name, email, phone, address, city, status) VALUES
  ('Budi Santoso', 'budi@example.com', '081234567890', 'Jl. Merdeka 123', 'Jakarta', 'active'),
  ('Siti Nurhaliza', 'siti@example.com', '082345678901', 'Jl. Sudirman 456', 'Bandung', 'active'),
  ('Ahmad Wijaya', 'ahmad@example.com', '083456789012', 'Jl. Gatot Subroto 789', 'Surabaya', 'active')
ON CONFLICT DO NOTHING;

-- Insert sample mekaniks
INSERT INTO mekaniks (name, email, phone, specialization, experience_years, salary, status) VALUES
  ('Pak Joni', 'joni@bengkel.com', '081111111111', 'Engine Repair', 10, 5000000, 'active'),
  ('Pak Rudi', 'rudi@bengkel.com', '082222222222', 'Transmission', 8, 4500000, 'active'),
  ('Pak Bambang', 'bambang@bengkel.com', '083333333333', 'Electrical', 6, 4000000, 'active')
ON CONFLICT DO NOTHING;

-- Insert sample spareparts
INSERT INTO spareparts (name, part_number, category, brand, price, stock, status) VALUES
  ('Oil Filter', 'OIL-001', 'Filters', 'Bosch', 75000, 50, 'available'),
  ('Air Filter', 'AIR-001', 'Filters', 'Bosch', 120000, 40, 'available'),
  ('Spark Plug Set', 'PLUG-001', 'Ignition', 'NGK', 350000, 30, 'available'),
  ('Brake Pad', 'BRAKE-001', 'Brake', 'Brembo', 450000, 25, 'available')
ON CONFLICT DO NOTHING;

-- ============================================
-- DONE!
-- ============================================

-- ⚠️ IMPORTANT: Disable RLS untuk semua tabel
-- Jalankan perintah ini SETELAH create tables berhasil:
-- 
-- ALTER TABLE "user" DISABLE ROW LEVEL SECURITY;
-- ALTER TABLE customers DISABLE ROW LEVEL SECURITY;
-- ALTER TABLE vehicles DISABLE ROW LEVEL SECURITY;
-- ALTER TABLE mekaniks DISABLE ROW LEVEL SECURITY;
-- ALTER TABLE spareparts DISABLE ROW LEVEL SECURITY;
-- ALTER TABLE bookings DISABLE ROW LEVEL SECURITY;
-- ALTER TABLE orders DISABLE ROW LEVEL SECURITY;
-- ALTER TABLE order_items DISABLE ROW LEVEL SECURITY;
-- ALTER TABLE invoices DISABLE ROW LEVEL SECURITY;
-- ALTER TABLE analytics DISABLE ROW LEVEL SECURITY;
--
-- Atau lebih mudah: Buka setiap tabel di Supabase UI → Authentication → toggle RLS OFF
