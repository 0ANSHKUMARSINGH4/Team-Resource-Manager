CREATE TABLE transactions (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    description VARCHAR(500),
    amount DECIMAL(12, 2) NOT NULL,
    type VARCHAR(50) NOT NULL,
    category VARCHAR(100),
    transaction_date DATE,
    recorded_by BIGINT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT fk_transaction_recorder FOREIGN KEY (recorded_by) REFERENCES users(id)
);

CREATE TABLE events (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    start_time TIMESTAMP,
    end_time TIMESTAMP,
    type VARCHAR(50),
    project_id BIGINT,
    created_by BIGINT,
    CONSTRAINT fk_event_project FOREIGN KEY (project_id) REFERENCES projects(id),
    CONSTRAINT fk_event_creator FOREIGN KEY (created_by) REFERENCES users(id)
);

CREATE TABLE activity_log (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    action VARCHAR(50) NOT NULL,
    entity_type VARCHAR(100),
    entity_id BIGINT,
    performed_by BIGINT,
    performed_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT fk_activity_performer FOREIGN KEY (performed_by) REFERENCES users(id)
);
