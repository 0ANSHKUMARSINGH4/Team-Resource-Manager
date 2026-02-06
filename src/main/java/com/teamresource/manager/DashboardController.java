package com.teamresource.manager;

import org.springframework.web.bind.annotation.*;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "*") // Allow React to access this
public class DashboardController {

    private final EmployeeRepository employeeRepository;

    public DashboardController(EmployeeRepository employeeRepository) {
        this.employeeRepository = employeeRepository;
    }

    // Endpoint 1: Get all employees for the table
    @GetMapping("/employees")
    public List<Employee> getAllEmployees() {
        return employeeRepository.findAll();
    }

    // Endpoint 2: Get the "Top Card" stats
    @GetMapping("/stats")
    public Map<String, Object> getDashboardStats() {
        long totalEmployees = employeeRepository.count();
        long permanentCount = employeeRepository.findAll().stream()
                .filter(e -> "Permanent".equalsIgnoreCase(e.getStatus())).count();

        // Return a JSON map for the UI cards
        return Map.of(
                "totalEmployees", totalEmployees,
                "jobViews", 3342,      // Hardcoded for demo/UI match
                "jobApplied", 77,      // Hardcoded for demo/UI match
                "resigned", 17,        // Hardcoded for demo/UI match
                "permanentRate", (permanentCount * 100) / totalEmployees + "%"
        );
    }

    // Endpoint 3: Add a new employee
    @PostMapping("/employees")
    public Employee addEmployee(@RequestBody Employee employee) {
        return employeeRepository.save(employee);
    }

    // Endpoint 4: Delete an employee
    @DeleteMapping("/employees/{id}")
    public void deleteEmployee(@PathVariable Long id) {
        employeeRepository.deleteById(id);
    }
}