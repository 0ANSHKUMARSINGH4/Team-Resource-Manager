package com.teamresourcemanager.backend.controller;

import com.teamresourcemanager.backend.model.Developer;
import com.teamresourcemanager.backend.service.DeveloperService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/developers")
@RequiredArgsConstructor
@CrossOrigin(origins = "*")
public class DeveloperController {

    private final DeveloperService developerService;

    @GetMapping
    public List<Developer> getAll() {
        return developerService.getAll();
    }

    @PostMapping
    public Developer create(@RequestBody Developer developer) {
        return developerService.create(developer);
    }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable Long id) {
        developerService.delete(id);
    }
}