package com.teamresourcemanager.backend.controller;

import com.teamresourcemanager.backend.model.Task;
import com.teamresourcemanager.backend.service.TaskService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/tasks")
@RequiredArgsConstructor
public class TaskController {

    private final TaskService taskService;

    // GET /api/tasks
    @GetMapping
    public List<Task> getAllTasks() {
        return taskService.getAllTasks();
    }

    // POST /api/tasks
    @PostMapping
    public Task createTask(@RequestBody Task task) {
        return taskService.createTask(task);
    }

    // PUT /api/tasks/{id}/complete
    @PutMapping("/{id}/complete")
    public Task markCompleted(@PathVariable Long id) {
        return taskService.markCompleted(id);
    }
}
