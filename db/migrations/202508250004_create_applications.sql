-- migrate:up

-- =====================================================
-- TABLE: applications
-- Stores student exchange application details
-- =====================================================

CREATE TABLE applications (
    application_id INT AUTO_INCREMENT PRIMARY KEY,

    student_number VARCHAR(20) NOT NULL,

    semester_preference VARCHAR(50),
    duration_preference VARCHAR(50),

    has_application_form BOOLEAN DEFAULT FALSE,
    has_cv BOOLEAN DEFAULT FALSE,
    has_tor BOOLEAN DEFAULT FALSE,
    has_recommendation_letter BOOLEAN DEFAULT FALSE,
    has_essay BOOLEAN DEFAULT FALSE,
    has_form_5 BOOLEAN DEFAULT FALSE,
    has_valid_passport BOOLEAN DEFAULT FALSE,
    has_online_application_form BOOLEAN DEFAULT FALSE,

    is_complete BOOLEAN DEFAULT FALSE,

    program_advisor VARCHAR(100),
    department_chair VARCHAR(100),
    college_secretary VARCHAR(100),
    dean_name VARCHAR(100),

    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        ON UPDATE CURRENT_TIMESTAMP,

    CONSTRAINT fk_applications_students
        FOREIGN KEY (student_number)
        REFERENCES students(student_number)
        ON UPDATE CASCADE
        ON DELETE CASCADE
);

CREATE INDEX idx_applications_student_number
    ON applications(student_number);

-- migrate:down

DROP TABLE IF EXISTS applications;