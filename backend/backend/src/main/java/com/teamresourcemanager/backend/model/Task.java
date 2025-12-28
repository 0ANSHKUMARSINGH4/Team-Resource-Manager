package com.teamresourcemanager.backend.model;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "task")
@Getter @Setter
@NoArgsConstructor
@AllArgsConstructor
public class Task {

    public enum Status {
        TODO,
        IN_PROGRESS,
        DONE
    }

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String title;

    @Column(name = "estimated_hours", nullable = false)
    private int estimatedHours;

    @Enumerated(EnumType.STRING)
    private Status status;

    @Column(nullable = false)
    private int progress;
}
