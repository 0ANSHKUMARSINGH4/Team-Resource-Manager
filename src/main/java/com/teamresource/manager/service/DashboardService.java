package com.teamresource.manager.service;

import com.teamresource.manager.entity.ActivityLog;
import com.teamresource.manager.repository.ActivityLogRepository;
import com.teamresource.manager.repository.EmployeeRepository;
import com.teamresource.manager.repository.ProjectRepository;
import com.teamresource.manager.repository.TransactionRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.util.List;

@Service
@RequiredArgsConstructor
public class DashboardService {

    private final EmployeeRepository employeeRepository;
    private final ProjectRepository projectRepository;
    private final TransactionRepository transactionRepository;
    private final ActivityLogRepository activityLogRepository;

    @Transactional(readOnly = true)
    public long getEmployeeCount() {
        return employeeRepository.count();
    }

    @Transactional(readOnly = true)
    public long getActiveProjectCount() {
        return projectRepository.findByStatus("IN_PROGRESS").size() + projectRepository.findByStatus("TODO").size();
    }

    @Transactional(readOnly = true)
    public BigDecimal getTotalIncome() {
        BigDecimal sum = transactionRepository.sumTotalIncome();
        return sum != null ? sum : BigDecimal.ZERO;
    }

    @Transactional(readOnly = true)
    public BigDecimal getTotalExpenses() {
        BigDecimal sum = transactionRepository.sumTotalExpense();
        return sum != null ? sum : BigDecimal.ZERO;
    }

    @Transactional(readOnly = true)
    public List<ActivityLog> getRecentActivities() {
        return activityLogRepository.findTop10ByOrderByPerformedAtDesc();
    }
}
