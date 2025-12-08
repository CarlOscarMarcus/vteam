DROP TABLE IF EXISTS repair CASCADE;
DROP TABLE IF EXISTS receipt CASCADE;
DROP TABLE IF EXISTS scooter CASCADE;
DROP TABLE IF EXISTS users CASCADE;

\i /docker-entrypoint-initdb.d/tables/01-users.sql
\i /docker-entrypoint-initdb.d/tables/02-scooter.sql
\i /docker-entrypoint-initdb.d/tables/03-receipt.sql
\i /docker-entrypoint-initdb.d/tables/04-repair.sql

\i /docker-entrypoint-initdb.d/mock/01-users.sql
\i /docker-entrypoint-initdb.d/mock/02-scooter.sql
\i /docker-entrypoint-initdb.d/mock/03-receipt.sql
\i /docker-entrypoint-initdb.d/mock/04-repair.sql
