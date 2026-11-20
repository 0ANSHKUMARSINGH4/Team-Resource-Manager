package com.teamresource.manager.service;

import com.teamresource.manager.common.dto.PagedResponse;
import com.teamresource.manager.employee.dto.EmployeeRequest;
import com.teamresource.manager.employee.dto.EmployeeResponse;
import com.teamresource.manager.employee.exception.EmployeeNotFoundException;
import com.teamresource.manager.entity.Employee;
import com.teamresource.manager.repository.EmployeeRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class EmployeeService {

    private final EmployeeRepository employeeRepository;

    // --- Vaadin Methods ---

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

    // --- REST API Methods ---

    @Transactional(readOnly = true)
    public PagedResponse<EmployeeResponse> getEmployees(
            String search,
            String department,
            String status,
            Pageable pageable
    ) {
        Specification<Employee> spec = (root, query, cb) -> cb.conjunction();

        if (search != null && !search.trim().isEmpty()) {
            String pattern = "%" + search.trim().toLowerCase() + "%";
            spec = spec.and((root, query, cb) -> cb.or(
                    cb.like(cb.lower(root.get("name")), pattern),
                    cb.like(cb.lower(root.get("department")), pattern),
                    cb.like(cb.lower(root.get("email")), pattern),
                    cb.like(cb.lower(root.get("designation")), pattern)
            ));
        }

        if (department != null && !department.trim().isEmpty() && !"All".equalsIgnoreCase(department.trim())) {
            spec = spec.and((root, query, cb) ->
                    cb.equal(cb.lower(root.get("department")), department.trim().toLowerCase()));
        }

        if (status != null && !status.trim().isEmpty() && !"All".equalsIgnoreCase(status.trim())) {
            spec = spec.and((root, query, cb) ->
                    cb.equal(cb.upper(root.get("status")), status.trim().toUpperCase()));
        }

        Page<Employee> page = employeeRepository.findAll(spec, pageable);
        List<EmployeeResponse> responses = page.getContent().stream()
                .map(this::mapToResponse)
                .toList();

        return PagedResponse.<EmployeeResponse>builder()
                .content(responses)
                .page(page.getNumber())
                .size(page.getSize())
                .totalElements(page.getTotalElements())
                .totalPages(page.getTotalPages())
                .last(page.isLast())
                .build();
    }

    @Transactional(readOnly = true)
    public EmployeeResponse getEmployeeById(Long id) {
        return employeeRepository.findById(id)
                .map(this::mapToResponse)
                .orElseThrow(() -> new EmployeeNotFoundException(id));
    }

    @Transactional
    public EmployeeResponse createEmployee(EmployeeRequest request) {
        if (employeeRepository.existsByEmail(request.getEmail())) {
            throw new DataIntegrityViolationException("Email already in use: " + request.getEmail());
        }

        Employee employee = Employee.builder()
                .name(request.getName())
                .email(request.getEmail())
                .department(request.getDepartment())
                .designation(request.getDesignation())
                .age(request.getAge())
                .phone(request.getPhone())
                .status(request.getStatus() != null ? request.getStatus() : "PERMANENT")
                .workMode(request.getWorkMode() != null ? request.getWorkMode() : "ON_SITE")
                .disciplineScore(request.getDisciplineScore() != null ? request.getDisciplineScore() : 100)
                .joinDate(request.getJoinDate())
                .salary(request.getSalary())
                .managerId(request.getManagerId())
                .avatarUrl(request.getAvatarUrl())
                .build();

        Employee saved = employeeRepository.save(employee);
        return mapToResponse(saved);
    }

    @Transactional
    public EmployeeResponse updateEmployee(Long id, EmployeeRequest request) {
        Employee existing = employeeRepository.findById(id)
                .orElseThrow(() -> new EmployeeNotFoundException(id));

        if (employeeRepository.existsByEmailAndIdNot(request.getEmail(), id)) {
            throw new DataIntegrityViolationException("Email already in use: " + request.getEmail());
        }

        existing.setName(request.getName());
        existing.setEmail(request.getEmail());
        existing.setDepartment(request.getDepartment());
        existing.setDesignation(request.getDesignation());
        existing.setAge(request.getAge());
        existing.setPhone(request.getPhone());
        if (request.getStatus() != null) {
            existing.setStatus(request.getStatus());
        }
        if (request.getWorkMode() != null) {
            existing.setWorkMode(request.getWorkMode());
        }
        if (request.getDisciplineScore() != null) {
            existing.setDisciplineScore(request.getDisciplineScore());
        }
        existing.setJoinDate(request.getJoinDate());
        existing.setSalary(request.getSalary());
        existing.setManagerId(request.getManagerId());
        existing.setAvatarUrl(request.getAvatarUrl());

        Employee updated = employeeRepository.save(existing);
        return mapToResponse(updated);
    }

    @Transactional
    public void deleteEmployee(Long id) {
        Employee employee = employeeRepository.findById(id)
                .orElseThrow(() -> new EmployeeNotFoundException(id));
        employeeRepository.delete(employee);
    }

    public EmployeeResponse mapToResponse(Employee employee) {
        return EmployeeResponse.builder()
                .id(employee.getId())
                .name(employee.getName())
                .email(employee.getEmail())
                .department(employee.getDepartment())
                .designation(employee.getDesignation())
                .age(employee.getAge())
                .phone(employee.getPhone())
                .status(employee.getStatus())
                .workMode(employee.getWorkMode())
                .disciplineScore(employee.getDisciplineScore())
                .joinDate(employee.getJoinDate())
                .salary(employee.getSalary())
                .managerId(employee.getManagerId())
                .avatarUrl(employee.getAvatarUrl())
                .createdAt(employee.getCreatedAt())
                .updatedAt(employee.getUpdatedAt())
                .build();
    }
}
