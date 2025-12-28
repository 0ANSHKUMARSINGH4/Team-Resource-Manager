package com.teamresourcemanager.backend.service;

import com.teamresourcemanager.backend.model.*;
import com.teamresourcemanager.backend.repository.*;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class AssignmentService {

    private final AssignmentRepository assignmentRepository;
    private final DeveloperRepository developerRepository;
    private final TaskRepository taskRepository;

    public Assignment assignTask(Long developerId, Long taskId) {

        Developer developer = developerRepository.findById(developerId)
                .orElseThrow(() -> new RuntimeException("Developer not found"));

        Task task = taskRepository.findById(taskId)
                .orElseThrow(() -> new RuntimeException("Task not found"));

        Assignment assignment = new Assignment();
        assignment.setDeveloper(developer);
        assignment.setTask(task);
        assignment.setAssignedHours(task.getEstimatedHours());
        assignment.setCompleted(false);

        task.setStatus(Task.Status.IN_PROGRESS);
        taskRepository.save(task);

        return assignmentRepository.save(assignment);
    }

    public List<Assignment> getAllAssignments() {
        return assignmentRepository.findAll();
    }

    public void unassign(Long id) {
        assignmentRepository.deleteById(id);
    }
}
