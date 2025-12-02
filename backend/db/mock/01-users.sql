-- Mock users
INSERT INTO users (email, name, password_hash, salt, status)
VALUES 
('joe@example.com', 'Joe Doe', 'hashedpassword123', 'salt123', 1),
('jane@example.com', 'Jane Smith', 'hashedpassword456', 'salt456', 0);
