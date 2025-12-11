-- Mock scooters
INSERT INTO scooter (battery, position_lat, position_long, status, user_id)
VALUES
(85, '59.3312', '18.0611', 1, 1),   -- belongs to Joe
(40, '59.3205', '18.0621', 0, 2),  -- belongs to Jane
(100, '51.5074', '-0.1278', 1, null);   -- unassigned
