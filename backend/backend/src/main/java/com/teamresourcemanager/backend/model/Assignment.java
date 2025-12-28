package com.teamresourcemanager.backend.model;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "assignments")
@Getter @Setter
@NoArgsConstructor
@AllArgsConstructor
public class Assignment {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "developer_id", nullable = false)
    private Developer developer;

    @ManyToOne
    @JoinColumn(name = "task_id", nullable = false)
    private Task task;

    @Column(name = "assigned_hours", nullable = false)
    private int assignedHours;

    private boolean completed;
}
