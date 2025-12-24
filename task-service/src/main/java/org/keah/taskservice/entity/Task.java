package org.keah.taskservice.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDate;
import java.time.LocalDateTime;

@Entity
@Getter
@Setter
@Table(name = "tasks")
@NoArgsConstructor
public class Task {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private Long projectId;

    @Column(nullable = false)
    private Long ownerId;

    @Column(nullable = false)
    private String title;

    private String description;

    private LocalDate dueDate;

    private boolean completed = false;

    private LocalDateTime createdAt = LocalDateTime.now();

    public Task(Long projectId, Long ownerId, String title, String description, LocalDate dueDate) {
        this.projectId = projectId;
        this.ownerId = ownerId;
        this.title = title;
        this.description = description;
        this.dueDate = dueDate;
        this.createdAt = LocalDateTime.now();
    }
}
