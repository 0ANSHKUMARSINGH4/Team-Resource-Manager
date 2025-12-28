package com.teamresourcemanager.backend.repository;

import com.teamresourcemanager.backend.model.Assignment;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface AssignmentRepository extends JpaRepository<Assignment, Long> {

    List<Assignment> findByDeveloperId(Long developerId);

    void deleteByDeveloperId(Long developerId);
}