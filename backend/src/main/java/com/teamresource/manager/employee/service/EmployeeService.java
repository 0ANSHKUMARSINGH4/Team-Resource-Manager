package com.teamresource.manager.employee.service;

import com.teamresource.manager.common.dto.PagedResponse;
import com.teamresource.manager.employee.dto.EmployeeRequest;
import com.teamresource.manager.employee.dto.EmployeeResponse;
import org.springframework.data.domain.Pageable;

public interface EmployeeService {

    PagedResponse<EmployeeResponse> getEmployees(String search, String department, String status, Pageable pageable);

    EmployeeResponse getEmployeeById(Long id);

    EmployeeResponse createEmployee(EmployeeRequest request);

    EmployeeResponse updateEmployee(Long id, EmployeeRequest request);

    void deleteEmployee(Long id);
}
