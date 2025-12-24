package org.keah.taskservice.dto;

import lombok.Data;
import java.time.LocalDate;

@Data
public class TaskRequest {
    @jakarta.validation.constraints.NotBlank(message = "Title is required")
    private String title;

    private String description;

    @jakarta.validation.constraints.FutureOrPresent(message = "Due date must be in the present or future")
    private LocalDate dueDate;
}
