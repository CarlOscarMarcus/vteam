CREATE TABLE IF NOT EXISTS history (
    id SERIAL PRIMARY KEY,
    date TIMESTAMP DEFAULT (CURRENT_TIMESTAMP),
    start_location VARCHAR(255),
    end_location VARCHAR(255),
    user_id INT,
    CONSTRAINT fk_history_user
        FOREIGN KEY (user_id)
        REFERENCES users (id)
        ON DELETE CASCADE
);