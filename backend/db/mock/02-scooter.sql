-- Mock scooters
INSERT INTO scooter (battery, position_lat, position_long, status, user_id)
VALUES
(85, '59.3310', '18.0611', 1, 1),   -- belongs to Joe (sthlm)
(40, '59.3213', '18.0622', 0, 2),  -- belongs to Jane (sthlm)
(50, '55.3436', '12.5939', 1, 1),   -- belongs to Joe (malmö)
(35, '55.3313', '12.6002', 0, 2),  -- belongs to Jane (malmö)
(90, '57.4255', '11.5910', 1, 1),   -- belongs to Joe (gtb)
(70, '57.4180', '11.5980', 0, 2),  -- belongs to Jane (gtb)
(100, '59.5074', '18.0678', 1, null);   -- unassigned
