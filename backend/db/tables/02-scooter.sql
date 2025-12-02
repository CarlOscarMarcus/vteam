CREATE TABLE IF NOT EXISTS scooter (
    id SERIAL PRIMARY KEY,
    battery INT DEFAULT 0,
    position_lat VARCHAR(255),
    position_long VARCHAR(255),
    status INT DEFAULT 0,
    user_id INT NOT NULL,
    CONSTRAINT fk_scooter_user
        FOREIGN KEY (user_id)
        REFERENCES users (id)
        ON DELETE SET CASCADE
);