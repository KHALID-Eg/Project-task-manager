package org.keah.projectservice.dto;

import lombok.Data;

@Data
public class ProjectRequest {
    @jakarta.validation.constraints.NotBlank(message = "Title is required")
    private String title;

    private String description;
}
