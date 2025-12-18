-- Mock scooters
INSERT INTO scooter (battery, position_lat, position_long, status, user_id)
VALUES
(85, '59.33258', '18.0649', 1, 1),   -- Joe (Stockholm)
(40, '59.3311', '18.0662', 0, 2),    -- Jane (Stockholm)
(50, '55.6050', '13.0000', 1, 1),    -- Joe (Malmö)
(35, '55.6070', '12.9950', 0, 2),    -- Jane (Malmö)
(90, '57.7089', '11.9746', 1, 1),    -- Joe (Göteborg)
(70, '57.7060', '11.9700', 0, 2),    -- Jane (Göteborg)
(100, '59.3340', '18.0650', 1, null); -- unassigned (Stockholm)
