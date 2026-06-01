-- migrate:up

-- =====================================================
-- TABLE: events
-- Stores international or academic events
-- =====================================================

CREATE TABLE events (
    event_id VARCHAR(10) NOT NULL,
    event_name VARCHAR(150) NOT NULL,
    host_country VARCHAR(100),
    event_date DATE,

    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        ON UPDATE CURRENT_TIMESTAMP,

    PRIMARY KEY (event_id)
);

-- migrate:down

DROP TABLE IF EXISTS events;
