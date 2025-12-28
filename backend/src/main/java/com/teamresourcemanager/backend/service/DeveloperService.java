package com.teamresourcemanager.backend.service;

import com.teamresourcemanager.backend.model.Developer;
import com.teamresourcemanager.backend.repository.DeveloperRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class DeveloperService {

    private final DeveloperRepository repository;

    public Developer create(Developer dev) {
        // capacity is primitive → always exists
        return repository.save(dev);
    }

    public List<Developer> getAll() {
        return repository.findAll();
    }

    public void delete(Long id) {
        repository.deleteById(id);
    }
}
