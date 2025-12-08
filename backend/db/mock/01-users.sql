-- Mock users
INSERT INTO users (email, name, password_hash, salt, status)
VALUES 
('joe@example.com', 'Joe Doe', '$2a$10$/okoksHczGPh4X22ngHcmOBtgJ8kobzOO2ofRxnGSyxtITWTGTqqG', 'salt123', 1),
('jane@example.com', 'Jane Smith', '$2a$10$/okoksHczGPh4X22ngHcmOBtgJ8kobzOO2ofRxnGSyxtITWTGTqqG', 'salt456', 0);
