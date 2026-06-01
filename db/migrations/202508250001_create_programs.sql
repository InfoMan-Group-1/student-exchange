-- migrate:up

-- =====================================================
-- TABLE: programs
-- Stores academic programs and their colleges
-- Must run before students (FK dependency)
-- =====================================================

CREATE TABLE programs (
    program_id VARCHAR(10) NOT NULL,
    program_name VARCHAR(100) NOT NULL,
    college_name VARCHAR(100) NOT NULL,

    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        ON UPDATE CURRENT_TIMESTAMP,

    PRIMARY KEY (program_id)
);

-- migrate:down

DROP TABLE IF EXISTS programs;
