package com.teamresource.manager.service;

import com.teamresource.manager.entity.Project;
import com.teamresource.manager.repository.ProjectRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class ProjectService {

    private final ProjectRepository projectRepository;

    @Transactional(readOnly = true)
    public List<Project> findAll() {
        return projectRepository.findAllByOrderByCreatedAtDesc();
    }

    @Transactional(readOnly = true)
    public List<Project> findByStatus(String status) {
        return projectRepository.findByStatus(status);
    }

    @Transactional(readOnly = true)
    public Optional<Project> findById(Long id) {
        return projectRepository.findById(id);
    }

    @Transactional(readOnly = true)
    public long count() {
        return projectRepository.count();
    }

    @Transactional
    public Project save(Project project) {
        return projectRepository.save(project);
    }

    @Transactional
    public void updateStatus(Long projectId, String newStatus) {
        projectRepository.findById(projectId).ifPresent(p -> {
            p.setStatus(newStatus);
            projectRepository.save(p);
        });
    }

    @Transactional
    public void delete(Project project) {
        projectRepository.delete(project);
    }
}
