package com.teamresource.manager;

import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;

@Entity
@Data // Generates Getters, Setters, toString automatically (Lombok)
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "employees")
public class Employee {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;
    private String department; // Marketing, Finance, R&D
    private int age;
    private int disciplineScore; // Maps to "+100%", "+95%" in UI
    private String status; // Permanent, Contract

    // Constructor for easy data seeding
    public Employee(String name, String department, int age, int disciplineScore, String status) {
        this.name = name;
        this.department = department;
        this.age = age;
        this.disciplineScore = disciplineScore;
        this.status = status;
    }

    // Manual Getter to fix the error
    public String getStatus() {
        return this.status;
    }
}