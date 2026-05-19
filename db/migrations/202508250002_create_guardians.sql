-- migrate:up

-- =====================================================
-- TABLE: guardians
-- Stores guardian information of students
-- =====================================================

CREATE TABLE guardians (
    guardian_id INT AUTO_INCREMENT PRIMARY KEY,
    guardian_name VARCHAR(100) NOT NULL,
    relationship_to_student VARCHAR(50),
    address TEXT,
    contact_number VARCHAR(20),
    email_address VARCHAR(100),

    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        ON UPDATE CURRENT_TIMESTAMP
);

-- migrate:down

DROP TABLE IF EXISTS guardians;