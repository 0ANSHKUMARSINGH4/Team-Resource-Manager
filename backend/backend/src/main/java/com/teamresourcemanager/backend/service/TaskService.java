package com.teamresourcemanager.backend.service;

import com.teamresourcemanager.backend.model.Task;
import com.teamresourcemanager.backend.repository.TaskRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class TaskService {

    private final TaskRepository taskRepository;

    public List<Task> getAllTasks() {
        return taskRepository.findAll();
    }

    public Task createTask(Task task) {
        task.setStatus(Task.Status.TODO);
        task.setProgress(0);
        return taskRepository.save(task);
    }

    public Task markCompleted(Long id) {
        Task task = taskRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Task not found"));

        task.setStatus(Task.Status.DONE);
        task.setProgress(100);
        return taskRepository.save(task);
    }
}
