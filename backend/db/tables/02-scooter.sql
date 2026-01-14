CREATE TABLE IF NOT EXISTS scooter (
    id SERIAL PRIMARY KEY,
    battery INT NOT NULL DEFAULT 0,
    position_lat DECIMAL(9,6) NOT NULL,
    position_long DECIMAL(9,6) NOT NULL,
    status TEXT DEFAULT 'ok',
    is_available BOOLEAN DEFAULT true
);
