package com.teamresource.manager.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Table;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.math.BigDecimal;
import java.time.LocalDate;

@Entity
@Table(name = "employees")
@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
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

    private Integer age;

    private String phone;

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

    @Column(precision = 12, scale = 2)
    private BigDecimal salary;

    @Column(name = "manager_id")
    private Long managerId;

    @Column(name = "avatar_url", length = 500)
    private String avatarUrl;
}
