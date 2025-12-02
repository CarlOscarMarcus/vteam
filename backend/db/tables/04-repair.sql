CREATE TABLE IF NOT EXISTS repair (
    id SERIAL PRIMARY KEY,
    scooter_id INT NOT NULL,
    start_day TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    estimated_repair TIMESTAMP NOT NULL,
    work_done TIMESTAMP,
    status INT DEFAULT 0,
    CONSTRAINT fk_repair_scooter
        FOREIGN KEY (scooter_id)
        REFERENCES scooter (id)
        ON DELETE CASCADE
);
