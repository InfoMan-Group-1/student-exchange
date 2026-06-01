-- migrate:up

-- =====================================================
-- TABLE: events_attended
-- Junction table for students and events
-- =====================================================

CREATE TABLE events_attended (
    student_number VARCHAR(20) NOT NULL,
    event_id VARCHAR(10) NOT NULL,

    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    PRIMARY KEY (student_number, event_id),

    CONSTRAINT fk_events_attended_students
        FOREIGN KEY (student_number)
        REFERENCES students(student_number)
        ON UPDATE CASCADE
        ON DELETE CASCADE,

    CONSTRAINT fk_events_attended_events
        FOREIGN KEY (event_id)
        REFERENCES events(event_id)
        ON UPDATE CASCADE
        ON DELETE CASCADE
);

CREATE INDEX idx_events_attended_event_id
    ON events_attended(event_id);

-- migrate:down

DROP TABLE IF EXISTS events_attended;
