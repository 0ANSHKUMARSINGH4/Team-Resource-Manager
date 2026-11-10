package com.teamresource.manager.employee;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.teamresource.manager.common.dto.PagedResponse;
import com.teamresource.manager.config.JwtAuthenticationFilter;
import com.teamresource.manager.employee.controller.EmployeeController;
import com.teamresource.manager.employee.dto.EmployeeRequest;
import com.teamresource.manager.employee.dto.EmployeeResponse;
import com.teamresource.manager.employee.exception.EmployeeNotFoundException;
import com.teamresource.manager.employee.service.EmployeeService;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.test.context.bean.override.mockito.MockitoBean;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.List;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.eq;
import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@WebMvcTest(EmployeeController.class)
@AutoConfigureMockMvc(addFilters = false)
class EmployeeControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private ObjectMapper objectMapper;

    @MockitoBean
    private EmployeeService employeeService;

    @MockitoBean
    private JwtAuthenticationFilter jwtAuthenticationFilter;

    @Test
    @DisplayName("GET /api/v1/employees returns 200 and paginated list")
    void getEmployees_Returns200() throws Exception {
        EmployeeResponse employee = EmployeeResponse.builder()
                .id(1L)
                .name("Sarah Connor")
                .email("sarah.connor@trm.com")
                .department("Engineering")
                .status("PERMANENT")
                .build();

        PagedResponse<EmployeeResponse> pagedResponse = PagedResponse.<EmployeeResponse>builder()
                .content(List.of(employee))
                .page(0)
                .size(10)
                .totalElements(1)
                .totalPages(1)
                .last(true)
                .build();

        when(employeeService.getEmployees(any(), any(), any(), any())).thenReturn(pagedResponse);

        mockMvc.perform(get("/api/v1/employees")
                        .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.content[0].name").value("Sarah Connor"))
                .andExpect(jsonPath("$.totalElements").value(1));
    }

    @Test
    @DisplayName("POST /api/v1/employees with valid data returns 201")
    void createEmployee_ValidData_Returns201() throws Exception {
        EmployeeRequest request = EmployeeRequest.builder()
                .name("John Doe")
                .email("john.doe@trm.com")
                .department("Engineering")
                .status("PERMANENT")
                .age(30)
                .salary(new BigDecimal("90000.00"))
                .joinDate(LocalDate.of(2023, 1, 1))
                .build();

        EmployeeResponse response = EmployeeResponse.builder()
                .id(2L)
                .name("John Doe")
                .email("john.doe@trm.com")
                .department("Engineering")
                .status("PERMANENT")
                .age(30)
                .salary(new BigDecimal("90000.00"))
                .joinDate(LocalDate.of(2023, 1, 1))
                .build();

        when(employeeService.createEmployee(any(EmployeeRequest.class))).thenReturn(response);

        mockMvc.perform(post("/api/v1/employees")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(request)))
                .andExpect(status().isCreated())
                .andExpect(jsonPath("$.id").value(2))
                .andExpect(jsonPath("$.name").value("John Doe"))
                .andExpect(jsonPath("$.email").value("john.doe@trm.com"));
    }

    @Test
    @DisplayName("POST /api/v1/employees with invalid data returns 400")
    void createEmployee_InvalidData_Returns400() throws Exception {
        EmployeeRequest invalidRequest = EmployeeRequest.builder()
                .name("") // Blank name
                .email("not-an-email") // Invalid email
                .department("") // Blank department
                .age(12) // Below min age 16
                .build();

        mockMvc.perform(post("/api/v1/employees")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(invalidRequest)))
                .andExpect(status().isBadRequest())
                .andExpect(jsonPath("$.status").value(400))
                .andExpect(jsonPath("$.errors").isArray());
    }

    @Test
    @DisplayName("GET /api/v1/employees/{id} with non-existent id returns 404")
    void getEmployeeById_NotFound_Returns404() throws Exception {
        when(employeeService.getEmployeeById(eq(999L)))
                .thenThrow(new EmployeeNotFoundException(999L));

        mockMvc.perform(get("/api/v1/employees/{id}", 999L)
                        .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isNotFound())
                .andExpect(jsonPath("$.status").value(404))
                .andExpect(jsonPath("$.message").value("Employee not found with id: 999"));
    }
}
