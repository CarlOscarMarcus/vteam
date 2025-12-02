CREATE TABLE IF NOT EXISTS receipt (
    id SERIAL PRIMARY KEY,
    user_id INT NOT NULL,
    cost INT NOT NULL,
    payment INT NOT NULL,
    due_date TIMESTAMP DEFAULT (CURRENT_TIMESTAMP + INTERVAL '14 days'),
    CONSTRAINT fk_receipt_user
        FOREIGN KEY (user_id)
        REFERENCES users (id)
        ON DELETE CASCADE
);
