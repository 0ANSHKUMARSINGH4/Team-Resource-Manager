package com.teamresource.manager.service;

import com.teamresource.manager.entity.Project;
import com.teamresource.manager.project.dto.ProjectRequest;
import com.teamresource.manager.project.dto.ProjectResponse;
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

    // --- Vaadin Methods ---

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

    // --- REST API Methods ---

    @Transactional(readOnly = true)
    public List<ProjectResponse> getAllProjects() {
        return projectRepository.findAllByOrderByCreatedAtDesc().stream()
                .map(this::mapToResponse)
                .toList();
    }

    @Transactional(readOnly = true)
    public ProjectResponse getProjectById(Long id) {
        Project project = projectRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Project not found with id: " + id));
        return mapToResponse(project);
    }

    @Transactional
    public ProjectResponse createProject(ProjectRequest request, Long userId) {
        String status = (request.getStatus() != null && !request.getStatus().isBlank())
                ? request.getStatus().toUpperCase().replace(" ", "_")
                : "TODO";

        Project project = Project.builder()
                .title(request.getTitle())
                .description(request.getDescription())
                .status(status)
                .startDate(request.getStartDate())
                .deadline(request.getDeadline())
                .budget(request.getBudget())
                .createdBy(userId)
                .build();

        Project saved = projectRepository.save(project);
        return mapToResponse(saved, request.getTeam());
    }

    @Transactional
    public ProjectResponse updateProject(Long id, ProjectRequest request) {
        Project project = projectRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Project not found with id: " + id));

        project.setTitle(request.getTitle());
        project.setDescription(request.getDescription());
        if (request.getStatus() != null && !request.getStatus().isBlank()) {
            project.setStatus(request.getStatus().toUpperCase().replace(" ", "_"));
        }
        if (request.getStartDate() != null) {
            project.setStartDate(request.getStartDate());
        }
        if (request.getDeadline() != null) {
            project.setDeadline(request.getDeadline());
        }
        if (request.getBudget() != null) {
            project.setBudget(request.getBudget());
        }

        Project saved = projectRepository.save(project);
        return mapToResponse(saved, request.getTeam());
    }

    @Transactional
    public ProjectResponse updateProjectStatus(Long id, String status) {
        Project project = projectRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Project not found with id: " + id));

        String normalized = status.toUpperCase().replace(" ", "_");
        project.setStatus(normalized);
        Project saved = projectRepository.save(project);
        return mapToResponse(saved);
    }

    @Transactional
    public void deleteProject(Long id) {
        if (!projectRepository.existsById(id)) {
            throw new IllegalArgumentException("Project not found with id: " + id);
        }
        projectRepository.deleteById(id);
    }

    private ProjectResponse mapToResponse(Project project) {
        return mapToResponse(project, null);
    }

    private ProjectResponse mapToResponse(Project project, Integer explicitTeam) {
        int teamSize = explicitTeam != null && explicitTeam > 0 ? explicitTeam : 4;

        return ProjectResponse.builder()
                .id(project.getId())
                .title(project.getTitle())
                .description(project.getDescription())
                .status(project.getStatus())
                .startDate(project.getStartDate())
                .deadline(project.getDeadline())
                .budget(project.getBudget())
                .team(teamSize)
                .createdBy(project.getCreatedBy())
                .createdAt(project.getCreatedAt())
                .updatedAt(project.getUpdatedAt())
                .build();
    }
}
