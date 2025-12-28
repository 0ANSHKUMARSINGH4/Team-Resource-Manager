package com.teamresourcemanager.backend.controller;

import com.teamresourcemanager.backend.model.Assignment;
import com.teamresourcemanager.backend.service.AssignmentService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/assignments")
@RequiredArgsConstructor
@CrossOrigin
public class AssignmentController {

    private final AssignmentService assignmentService;

    @PostMapping
    public Assignment assign(@RequestBody Map<String, Long> payload) {
        return assignmentService.assignTask(
                payload.get("developerId"),
                payload.get("taskId")
        );
    }

    @GetMapping
    public List<Assignment> getAll() {
        return assignmentService.getAllAssignments();
    }

    @DeleteMapping("/{id}")
    public void unassign(@PathVariable Long id) {
        assignmentService.unassign(id);
    }
}
