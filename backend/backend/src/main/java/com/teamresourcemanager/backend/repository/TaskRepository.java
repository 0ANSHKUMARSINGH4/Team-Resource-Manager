package com.teamresourcemanager.backend.repository;

import com.teamresourcemanager.backend.model.Task;
import org.springframework.data.jpa.repository.JpaRepository;

public interface TaskRepository extends JpaRepository<Task, Long> {
}
