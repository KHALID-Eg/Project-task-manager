package org.keah.projectservice.controller;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.keah.projectservice.dto.ProjectRequest;
import org.keah.projectservice.entity.Project;
import org.keah.projectservice.service.ProjectService;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/projects")
@RequiredArgsConstructor
public class ProjectController {

    private final ProjectService projectService;

    private Long getUserId(Authentication authentication) {
        return (Long) authentication.getCredentials();
    }

    @PostMapping
    public ResponseEntity<Project> createProject(
            @RequestBody @Valid ProjectRequest request,
            Authentication authentication) {

        Long userId = getUserId(authentication);
        return ResponseEntity.ok(projectService.createProject(userId, request));
    }

    @GetMapping
    public ResponseEntity<List<Project>> getMyProjects(Authentication authentication) {
        Long userId = getUserId(authentication);
        return ResponseEntity.ok(projectService.getMyProjects(userId));
    }

    @GetMapping("/{projectId}")
    public ResponseEntity<Project> getProject(
            @PathVariable Long projectId,
            Authentication authentication) {

        Long userId = getUserId(authentication);
        return ResponseEntity.ok(projectService.getProjectById(projectId, userId));
    }

    @GetMapping("/{projectId}/progress")
    public ResponseEntity<org.keah.projectservice.dto.ProjectProgressDto> getProjectProgress(
            @PathVariable Long projectId,
            Authentication authentication) {

        Long userId = getUserId(authentication);
        return ResponseEntity.ok(projectService.getProjectProgress(projectId, userId));
    }
}
