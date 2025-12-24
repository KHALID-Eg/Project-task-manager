package org.keah.projectservice.dto;

public record ProjectProgressDto(
        Long totalTasks,
        Long completedTasks,
        Double progressPercentage) {
}
