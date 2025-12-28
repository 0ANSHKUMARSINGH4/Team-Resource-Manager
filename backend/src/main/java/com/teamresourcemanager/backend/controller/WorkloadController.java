package com.teamresourcemanager.backend.controller;

import com.teamresourcemanager.backend.service.WorkloadService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/workload")
@RequiredArgsConstructor
@CrossOrigin
public class WorkloadController {

    private final WorkloadService workloadService;

    @GetMapping
    public Map<String, Object> getWorkload() {
        return workloadService.getWorkload();
    }
}
