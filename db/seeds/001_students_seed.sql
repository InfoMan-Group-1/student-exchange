INSERT INTO students (full_name, email, destination_country)
VALUES
  ('Alice Johnson', 'alice.johnson@example.com', 'Japan'),
  ('Ben Carter', 'ben.carter@example.com', 'South Korea'),
  ('Chloe Tan', 'chloe.tan@example.com', 'Germany')
ON DUPLICATE KEY UPDATE
  destination_country = VALUES(destination_country);
