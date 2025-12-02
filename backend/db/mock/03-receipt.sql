-- Mock receipts
INSERT INTO receipt (user_id, cost, payment)
VALUES
(1, 50, 50),
(2, 30, 20);  -- partial payment, due_date defaults to 14 days from now
