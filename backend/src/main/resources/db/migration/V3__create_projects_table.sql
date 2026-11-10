CREATE TABLE projects (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    description CLOB,
    status VARCHAR(50) DEFAULT 'TODO',
    start_date DATE,
    deadline DATE,
    budget DECIMAL(12, 2),
    created_by BIGINT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT fk_project_creator FOREIGN KEY (created_by) REFERENCES users(id)
);

CREATE TABLE project_members (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    project_id BIGINT NOT NULL,
    employee_id BIGINT NOT NULL,
    role VARCHAR(50) DEFAULT 'MEMBER',
    CONSTRAINT fk_pm_project FOREIGN KEY (project_id) REFERENCES projects(id) ON DELETE CASCADE,
    CONSTRAINT fk_pm_employee FOREIGN KEY (employee_id) REFERENCES employees(id) ON DELETE CASCADE
);
