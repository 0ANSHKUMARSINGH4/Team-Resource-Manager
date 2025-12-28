package com.teamresourcemanager.backend.repository;

import com.teamresourcemanager.backend.model.WorkloadCache;
import org.springframework.data.jpa.repository.JpaRepository;

public interface WorkloadCacheRepository extends JpaRepository<WorkloadCache, Long> {
    void deleteAll();
}
