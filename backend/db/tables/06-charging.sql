CREATE TABLE IF NOT EXISTS charging (
    id SERIAL PRIMARY KEY,
    position_lat VARCHAR(255),
    position_long VARCHAR(255),
    status INT DEFAULT 1   -- 1 = aktiv, 0 = underhåll
);