-- Mock users
INSERT INTO users (email, name, password_hash, salt, status, balance)
VALUES 
('joe@example.com', 'Joe Doe', '$2a$10$/okoksHczGPh4X22ngHcmOBtgJ8kobzOO2ofRxnGSyxtITWTGTqqG', 'salt123', 1, 100.00),
('jane@example.com', 'Jane Smith', '$2a$10$/okoksHczGPh4X22ngHcmOBtgJ8kobzOO2ofRxnGSyxtITWTGTqqG', 'salt456', 0, 500.00),
('hej@admin.com', 'Admin', '$2a$10$/okoksHczGPh4X22ngHcmOBtgJ8kobzOO2ofRxnGSyxtITWTGTqqG', 'salt789', 0, 0.00);
