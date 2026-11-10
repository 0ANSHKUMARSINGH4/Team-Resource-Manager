package com.teamresource.manager.employee.entity;

import com.teamresource.manager.common.entity.BaseEntity;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Table;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.time.LocalDate;

@Entity
@Table(name = "employees")
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@EqualsAndHashCode(callSuper = true)
public class Employee extends BaseEntity {

    @NotBlank(message = "Name is required")
    @Column(nullable = false)
    private String name;

    @NotBlank(message = "Email is required")
    @Email(message = "Invalid email format")
    @Column(nullable = false, unique = true)
    private String email;

    @NotBlank(message = "Department is required")
    @Column(nullable = false)
    private String department;

    private String designation;

    @Min(value = 16, message = "Age must be at least 16")
    @Max(value = 100, message = "Age must be at most 100")
    private Integer age;

    private String phone;

    @NotBlank(message = "Status is required")
    @Column(nullable = false)
    @Builder.Default
    private String status = "PERMANENT";

    @Column(name = "work_mode")
    @Builder.Default
    private String workMode = "ON_SITE";

    @Column(name = "discipline_score")
    @Builder.Default
    private Integer disciplineScore = 100;

    @Column(name = "join_date")
    private LocalDate joinDate;

    private BigDecimal salary;

    @Column(name = "manager_id")
    private Long managerId;

    @Column(name = "avatar_url", length = 500)
    private String avatarUrl;
}
