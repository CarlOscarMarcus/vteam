-- Mock scooters
INSERT INTO scooter (battery, position_lat, position_long, status, user_id)
VALUES
(85, '59.3310', '18.0611', 1, 1),   -- belongs to Joe
(40, '59.3213', '18.0622', 0, 2),  -- belongs to Jane
(100, '59.5074', '18.0678', 1, null);   -- unassigned
