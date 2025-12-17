DROP TABLE IF EXISTS repair CASCADE;
DROP TABLE IF EXISTS receipt CASCADE;
DROP TABLE IF EXISTS scooter CASCADE;
DROP TABLE IF EXISTS users CASCADE;
DROP TABLE IF EXISTS parking CASCADE;
DROP TABLE IF EXISTS charging CASCADE;

\i /docker-entrypoint-initdb.d/tables/01-users.sql
\i /docker-entrypoint-initdb.d/tables/02-scooter.sql
\i /docker-entrypoint-initdb.d/tables/03-receipt.sql
\i /docker-entrypoint-initdb.d/tables/04-repair.sql
\i /docker-entrypoint-initdb.d/tables/05-parking.sql
\i /docker-entrypoint-initdb.d/tables/06-charging.sql

\i /docker-entrypoint-initdb.d/mock/01-users.sql
\i /docker-entrypoint-initdb.d/mock/02-scooter.sql
\i /docker-entrypoint-initdb.d/mock/03-receipt.sql
\i /docker-entrypoint-initdb.d/mock/04-repair.sql
\i /docker-entrypoint-initdb.d/mock/05-parking.sql
\i /docker-entrypoint-initdb.d/mock/06-charging.sql
