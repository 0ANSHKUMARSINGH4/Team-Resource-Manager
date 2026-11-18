package com.teamresource.manager.service;

import com.teamresource.manager.entity.Employee;
import com.teamresource.manager.repository.EmployeeRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class EmployeeService {

    private final EmployeeRepository employeeRepository;

    @Transactional(readOnly = true)
    public List<Employee> findAll(String filterText, String departmentFilter) {
        if ((filterText == null || filterText.isBlank()) && (departmentFilter == null || departmentFilter.isBlank() || "All".equalsIgnoreCase(departmentFilter))) {
            return employeeRepository.findAll();
        }
        String dept = ("All".equalsIgnoreCase(departmentFilter)) ? "" : departmentFilter;
        return employeeRepository.searchEmployees(filterText, dept);
    }

    @Transactional(readOnly = true)
    public Optional<Employee> findById(Long id) {
        return employeeRepository.findById(id);
    }

    @Transactional(readOnly = true)
    public List<String> getDepartments() {
        return employeeRepository.findAllDepartments();
    }

    @Transactional(readOnly = true)
    public long count() {
        return employeeRepository.count();
    }

    @Transactional
    public Employee save(Employee employee) {
        return employeeRepository.save(employee);
    }

    @Transactional
    public void delete(Employee employee) {
        employeeRepository.delete(employee);
    }
}
