-- migrate:up

-- =====================================================
-- TABLE: student_languages
-- Stores languages spoken by students
-- =====================================================

CREATE TABLE student_languages (
    student_number VARCHAR(20) NOT NULL,
    language_name VARCHAR(50) NOT NULL,
    proficiency_level VARCHAR(50),

    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    PRIMARY KEY (student_number, language_name),

    CONSTRAINT fk_student_languages_students
        FOREIGN KEY (student_number)
        REFERENCES students(student_number)
        ON UPDATE CASCADE
        ON DELETE CASCADE
);

-- migrate:down

DROP TABLE IF EXISTS student_languages;