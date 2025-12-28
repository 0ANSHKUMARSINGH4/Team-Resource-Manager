package com.teamresourcemanager.backend.model;

import jakarta.persistence.*;
import lombok.Data;

@Data
@Entity
public class WorkloadCache {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private Long developerId;
    private String developerName;

    private int capacity;
    private int used;
    private int remaining;
    private int utilizationPercent;
}
