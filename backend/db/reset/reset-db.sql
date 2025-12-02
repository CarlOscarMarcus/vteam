-- ===========================
-- RESET DATABASE SCRIPT
-- ===========================

-- Drop tables in reverse dependency order
DROP TABLE IF EXISTS repair CASCADE;
DROP TABLE IF EXISTS receipt CASCADE;
DROP TABLE IF EXISTS scooter CASCADE;
DROP TABLE IF EXISTS users CASCADE;

-- ==================================
-- CREATE TABLES
-- ==================================
\i tables/01-users.sql
\i tables/02-scooter.sql
\i tables/03-receipt.sql
\i tables/04-repair.sql

-- ==================================
-- INSERT MOCK DATA
-- ==================================
\i mock/01-users.sql
\i mock/02-scooter.sql
\i mock/03-receipt.sql
\i mock/04-repair.sql
