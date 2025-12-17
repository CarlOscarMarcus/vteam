CREATE TABLE IF NOT EXISTS parking (
    id SERIAL PRIMARY KEY,
    position_lat VARCHAR(255),
    position_long VARCHAR(255),
    status INT DEFAULT 0
);
