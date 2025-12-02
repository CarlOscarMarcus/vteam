-- Mock repairs
INSERT INTO repair (scooter_id, estimated_repair, work_done, status)
VALUES
(3, CURRENT_TIMESTAMP + INTERVAL '5 days', CURRENT_TIMESTAMP, 1);
