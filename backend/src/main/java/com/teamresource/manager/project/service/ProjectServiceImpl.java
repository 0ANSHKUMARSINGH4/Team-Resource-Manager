package com.teamresource.manager.project.service;

import com.teamresource.manager.project.dto.ProjectRequest;
import com.teamresource.manager.project.dto.ProjectResponse;
import com.teamresource.manager.project.entity.Project;
import com.teamresource.manager.project.repository.ProjectRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
public class ProjectServiceImpl implements ProjectService {

    private final ProjectRepository projectRepository;

    @Override
    @Transactional(readOnly = true)
    public List<ProjectResponse> getAllProjects() {
        return projectRepository.findAll().stream()
                .map(this::mapToResponse)
                .toList();
    }

    @Override
    @Transactional(readOnly = true)
    public ProjectResponse getProjectById(Long id) {
        Project project = projectRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Project not found with id: " + id));
        return mapToResponse(project);
    }

    @Override
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

    @Override
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

    @Override
    @Transactional
    public ProjectResponse updateProjectStatus(Long id, String status) {
        Project project = projectRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Project not found with id: " + id));

        String normalized = status.toUpperCase().replace(" ", "_");
        project.setStatus(normalized);
        Project saved = projectRepository.save(project);
        return mapToResponse(saved);
    }

    @Override
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
