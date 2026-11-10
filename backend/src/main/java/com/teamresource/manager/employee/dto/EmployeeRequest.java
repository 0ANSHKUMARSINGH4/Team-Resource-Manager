package com.teamresource.manager.employee.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.time.LocalDate;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class EmployeeRequest {

    @NotBlank(message = "Name is required")
    private String name;

    @NotBlank(message = "Email is required")
    @Email(message = "Invalid email format")
    private String email;

    @NotBlank(message = "Department is required")
    private String department;

    private String designation;

    @Min(value = 16, message = "Age must be at least 16")
    @Max(value = 100, message = "Age must be at most 100")
    private Integer age;

    private String phone;

    @NotBlank(message = "Status is required")
    @Builder.Default
    private String status = "PERMANENT";

    @Builder.Default
    private String workMode = "ON_SITE";

    @Builder.Default
    private Integer disciplineScore = 100;

    private LocalDate joinDate;

    private BigDecimal salary;

    private Long managerId;

    private String avatarUrl;
}
