CREATE TABLE IF NOT EXISTS rental (
    id SERIAL PRIMARY KEY,
    user_id INT NOT NULL,
    scooter_id INT NOT NULL,
    start_time TIMESTAMP DEFAULT NOW(),
    end_time TIMESTAMP,
    active BOOLEAN DEFAULT true,

    CONSTRAINT fk_rental_user
        FOREIGN KEY (user_id)
        REFERENCES users (id)
        ON DELETE CASCADE,

    CONSTRAINT fk_rental_scooter
        FOREIGN KEY (scooter_id)
        REFERENCES scooter (id)
        ON DELETE CASCADE
);
