-- migrate:up

-- =====================================================
-- TABLE: university_choices
-- Stores ranked university choices per application
-- =====================================================

CREATE TABLE university_choices (
    application_id VARCHAR(10) NOT NULL,
    university_choice_rank INT NOT NULL,
    university_name VARCHAR(150) NOT NULL,

    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        ON UPDATE CURRENT_TIMESTAMP,

    PRIMARY KEY (application_id, university_choice_rank),

    CONSTRAINT fk_university_choices_applications
        FOREIGN KEY (application_id)
        REFERENCES applications(application_id)
        ON UPDATE CASCADE
        ON DELETE CASCADE
);

-- migrate:down

DROP TABLE IF EXISTS university_choices;
