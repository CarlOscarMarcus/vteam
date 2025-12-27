-- Mock receipts
INSERT INTO receipt (user_id, cost, payment)
VALUES
(1, 52, 52),  --Completed payment
(1, 50, 25),  -- partial payment, due_date defaults to 14 days from now
(1, 65, 0),
(1, 90, 90),
(1, 47, 25),
(1, 20, 0),
(1, 70, 50),
(2, 50, 50),
(2, 90, 60),
(2, 10, 10),
(2, 30, 20);
