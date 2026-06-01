-- migrate:up

-- =====================================================
-- TABLE: students
-- Stores student profile and academic information
-- =====================================================

CREATE TABLE students (
    student_number VARCHAR(20) NOT NULL,

    program_id VARCHAR(10) NOT NULL,
    guardian_id VARCHAR(10) NOT NULL,

    full_name VARCHAR(100) NOT NULL,
    age INT,
    nationality VARCHAR(50),

    sex VARCHAR(20),

    birth_date DATE,

    school_email VARCHAR(100) UNIQUE,
    alternate_email VARCHAR(100),

    home_address TEXT,
    mobile_number VARCHAR(20),

    passport_number VARCHAR(50) UNIQUE,
    passport_issue_date DATE,
    passport_expiry_date DATE,

    year_level VARCHAR(20),

    cumulative_gwa DECIMAL(4,2),

    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        ON UPDATE CURRENT_TIMESTAMP,

    CONSTRAINT fk_students_programs
        FOREIGN KEY (program_id)
        REFERENCES programs(program_id)
        ON UPDATE CASCADE
        ON DELETE RESTRICT,

    CONSTRAINT fk_students_guardians
        FOREIGN KEY (guardian_id)
        REFERENCES guardians(guardian_id)
        ON UPDATE CASCADE
        ON DELETE RESTRICT,

    PRIMARY KEY (student_number)
);

CREATE INDEX idx_students_program_id
    ON students(program_id);

CREATE INDEX idx_students_guardian_id
    ON students(guardian_id);

-- migrate:down

DROP TABLE IF EXISTS students;
