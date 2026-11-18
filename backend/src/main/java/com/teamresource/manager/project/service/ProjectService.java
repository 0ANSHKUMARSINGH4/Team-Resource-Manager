package com.teamresource.manager.project.service;

import com.teamresource.manager.project.dto.ProjectRequest;
import com.teamresource.manager.project.dto.ProjectResponse;

import java.util.List;

public interface ProjectService {

    List<ProjectResponse> getAllProjects();

    ProjectResponse getProjectById(Long id);

    ProjectResponse createProject(ProjectRequest request, Long userId);

    ProjectResponse updateProject(Long id, ProjectRequest request);

    ProjectResponse updateProjectStatus(Long id, String status);

    void deleteProject(Long id);
}
