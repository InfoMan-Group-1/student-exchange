-- migrate:up

-- =====================================================
-- TABLE: events
-- Stores international or academic events
-- =====================================================

CREATE TABLE events (
    event_id INT AUTO_INCREMENT PRIMARY KEY,
    event_title VARCHAR(150) NOT NULL,
    host_country VARCHAR(100),
    event_date DATE,

    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        ON UPDATE CURRENT_TIMESTAMP
);

-- migrate:down

DROP TABLE IF EXISTS events;