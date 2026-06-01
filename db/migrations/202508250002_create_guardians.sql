-- migrate:up

-- =====================================================
-- TABLE: guardians
-- Stores guardian information of students
-- =====================================================

CREATE TABLE guardians (
    guardian_id VARCHAR(10) NOT NULL,
    guardian_name VARCHAR(100) NOT NULL,
    relation_to_student VARCHAR(50),
    guardian_address TEXT,
    guardian_contact_number VARCHAR(20),
    guardian_email VARCHAR(100),

    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        ON UPDATE CURRENT_TIMESTAMP,

    PRIMARY KEY (guardian_id)
);

-- migrate:down

DROP TABLE IF EXISTS guardians;
