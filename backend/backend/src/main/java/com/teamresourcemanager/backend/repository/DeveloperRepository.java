package com.teamresourcemanager.backend.repository;

import com.teamresourcemanager.backend.model.Developer;
import org.springframework.data.jpa.repository.JpaRepository;

public interface DeveloperRepository extends JpaRepository<Developer, Long> {
}