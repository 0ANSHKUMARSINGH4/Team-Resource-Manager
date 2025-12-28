package com.teamresourcemanager.backend.service;

import com.teamresourcemanager.backend.model.*;
import com.teamresourcemanager.backend.repository.*;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.*;

@Service
@RequiredArgsConstructor
public class WorkloadService {

    private final DeveloperRepository developerRepository;
    private final AssignmentRepository assignmentRepository;

    public Map<String, Object> getWorkload() {

        List<Developer> developers = developerRepository.findAll();
        List<Assignment> assignments = assignmentRepository.findAll();

        int totalCapacity = 0;
        int totalUsed = 0;

        List<Map<String, Object>> devStats = new ArrayList<>();

        for (Developer dev : developers) {

            int capacity = dev.getCapacity();

            int used = assignments.stream()
                    .filter(a -> a.getDeveloper().getId().equals(dev.getId()))
                    .filter(a -> !a.isCompleted())
                    .mapToInt(Assignment::getAssignedHours)
                    .sum();

            int remaining = Math.max(capacity - used, 0);
            int utilization = capacity == 0 ? 0 : (used * 100 / capacity);

            totalCapacity += capacity;
            totalUsed += used;

            Map<String, Object> map = new HashMap<>();
            map.put("developerId", dev.getId());
            map.put("name", dev.getName());
            map.put("capacity", capacity);
            map.put("used", used);
            map.put("remaining", remaining);
            map.put("utilizationPercent", utilization);

            devStats.add(map);
        }

        Map<String, Object> overall = new HashMap<>();
        overall.put("totalCapacity", totalCapacity);
        overall.put("totalUsed", totalUsed);
        overall.put("totalRemaining", Math.max(totalCapacity - totalUsed, 0));
        overall.put("utilizationPercent",
                totalCapacity == 0 ? 0 : (totalUsed * 100 / totalCapacity));

        Map<String, Object> response = new HashMap<>();
        response.put("developers", devStats);
        response.put("overall", overall);

        return response;
    }
}
