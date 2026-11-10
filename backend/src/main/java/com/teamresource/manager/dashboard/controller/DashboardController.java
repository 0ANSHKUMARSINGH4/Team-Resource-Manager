package com.teamresource.manager.dashboard.controller;

import com.teamresource.manager.dashboard.dto.DashboardStatsResponse;
import com.teamresource.manager.employee.repository.EmployeeRepository;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/v1/dashboard")
@RequiredArgsConstructor
@Tag(name = "Dashboard", description = "Dashboard analytics and overview statistics")
public class DashboardController {

    private final EmployeeRepository employeeRepository;

    @GetMapping("/overview")
    @Operation(summary = "Get dashboard overview", description = "Aggregated employee statistics by department, status, and work mode")
    public ResponseEntity<DashboardStatsResponse> getOverview() {
        long totalEmployees = employeeRepository.count();

        Map<String, Long> byDepartment = toMap(employeeRepository.countEmployeesByDepartment());
        Map<String, Long> byStatus = toMap(employeeRepository.countEmployeesByStatus());
        Map<String, Long> byWorkMode = toMap(employeeRepository.countEmployeesByWorkMode());

        long permanentCount = byStatus.getOrDefault("PERMANENT", 0L);
        double permanentRate = totalEmployees > 0
                ? Math.round(((double) permanentCount * 100.0 / totalEmployees) * 10.0) / 10.0
                : 0.0;

        Double avgDiscipline = employeeRepository.getAverageDisciplineScore();
        double averageDisciplineScore = avgDiscipline != null
                ? Math.round(avgDiscipline * 10.0) / 10.0
                : 0.0;

        DashboardStatsResponse response = DashboardStatsResponse.builder()
                .totalEmployees(totalEmployees)
                .byDepartment(byDepartment)
                .byStatus(byStatus)
                .byWorkMode(byWorkMode)
                .permanentRate(permanentRate)
                .averageDisciplineScore(averageDisciplineScore)
                .build();

        return ResponseEntity.ok(response);
    }

    private Map<String, Long> toMap(List<Object[]> rows) {
        Map<String, Long> map = new HashMap<>();
        if (rows != null) {
            for (Object[] row : rows) {
                if (row != null && row.length >= 2 && row[0] != null && row[1] != null) {
                    map.put(row[0].toString(), ((Number) row[1]).longValue());
                }
            }
        }
        return map;
    }
}
