package com.teamresource.manager.service;

import com.teamresource.manager.entity.Employee;
import com.teamresource.manager.repository.EmployeeRepository;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.math.BigDecimal;
import java.util.List;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

@ExtendWith(MockitoExtension.class)
class EmployeeServiceTest {

    @Mock
    private EmployeeRepository employeeRepository;

    @InjectMocks
    private EmployeeService employeeService;

    @Test
    void testFindAllReturnsList() {
        Employee emp = Employee.builder()
                .name("Alice Smith")
                .email("alice@trm.com")
                .department("Engineering")
                .salary(new BigDecimal("100000.00"))
                .build();

        when(employeeRepository.findAll()).thenReturn(List.of(emp));

        List<Employee> result = employeeService.findAll(null, null);
        assertNotNull(result);
        assertEquals(1, result.size());
        assertEquals("Alice Smith", result.get(0).getName());
    }

    @Test
    void testSaveEmployee() {
        Employee emp = Employee.builder()
                .name("Bob Stone")
                .email("bob@trm.com")
                .department("Design")
                .build();

        when(employeeRepository.save(any(Employee.class))).thenReturn(emp);

        Employee saved = employeeService.save(emp);
        assertNotNull(saved);
        assertEquals("Bob Stone", saved.getName());
        verify(employeeRepository).save(emp);
    }
}
