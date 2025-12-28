package com.teamresourcemanager.backend.model;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "developers")
@Getter @Setter
@NoArgsConstructor
@AllArgsConstructor
public class Developer {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;
    private String role;

    @Column(name = "weekly_capacity", nullable = false)
    private int capacity;
}
