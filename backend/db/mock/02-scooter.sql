-- Mock scooters
INSERT INTO scooter (battery, position_lat, position_long, status, user_id)
VALUES
(85, '40.7128', '-74.0060', 1, 1),   -- belongs to Joe
(40, '34.0522', '-118.2437', 0, 2),  -- belongs to Jane
(100, '51.5074', '-0.1278', 1, null);   -- unassigned
