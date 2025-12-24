package org.keah.taskservice.controller;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.keah.taskservice.dto.TaskRequest;
import org.keah.taskservice.entity.Task;
import org.keah.taskservice.service.TaskService;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api")
@RequiredArgsConstructor
public class TaskController {

    private final TaskService taskService;

    private Long getUserId(Authentication authentication) {
        return (Long) authentication.getCredentials();
    }

    @PostMapping("/projects/{projectId}/tasks")
    public ResponseEntity<Task> createTask(
            @PathVariable Long projectId,
            @RequestBody @Valid TaskRequest request,
            Authentication authentication) {

        Long userId = getUserId(authentication);
        return ResponseEntity.ok(taskService.createTask(projectId, userId, request));
    }

    @GetMapping("/projects/{projectId}/tasks")
    public ResponseEntity<List<Task>> getProjectTasks(
            @PathVariable Long projectId,
            Authentication authentication) {

        Long userId = getUserId(authentication);
        return ResponseEntity.ok(taskService.getTasksByProject(projectId, userId));
    }

    @PatchMapping("/tasks/{taskId}/complete")
    public ResponseEntity<Task> completeTask(
            @PathVariable Long taskId,
            Authentication authentication) {

        Long userId = getUserId(authentication);
        return ResponseEntity.ok(taskService.completeTask(taskId, userId));
    }

    @DeleteMapping("/tasks/{taskId}")
    public ResponseEntity<Void> deleteTask(
            @PathVariable Long taskId,
            Authentication authentication) {

        Long userId = getUserId(authentication);
        taskService.deleteTask(taskId, userId);
        return ResponseEntity.noContent().build();
    }

    // Internal endpoint for service-to-service communication (progress calculation)
    @GetMapping("/internal/projects/{projectId}/tasks")
    public ResponseEntity<List<Task>> getTasksForProgress(@PathVariable Long projectId) {
        return ResponseEntity.ok(taskService.getTasksByProjectInternal(projectId));
    }
}
