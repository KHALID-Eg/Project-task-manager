package org.keah.projectservice.dto;

import lombok.Data;

@Data
public class TaskDto {
    private Long id;
    private Long projectId;
    private boolean completed;
}
