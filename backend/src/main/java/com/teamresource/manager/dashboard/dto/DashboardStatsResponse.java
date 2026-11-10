package com.teamresource.manager.dashboard.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Map;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class DashboardStatsResponse {

    private long totalEmployees;
    private Map<String, Long> byDepartment;
    private Map<String, Long> byStatus;
    private Map<String, Long> byWorkMode;
    private double permanentRate;
    private double averageDisciplineScore;
}
