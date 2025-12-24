package org.keah.projectservice.service;

import lombok.RequiredArgsConstructor;
import org.keah.projectservice.dto.ProjectRequest;
import org.keah.projectservice.entity.Project;
import org.keah.projectservice.repository.ProjectRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class ProjectService {

    private final ProjectRepository projectRepository;
    private final org.springframework.web.client.RestTemplate restTemplate;

    public Project createProject(Long ownerId, ProjectRequest request) {
        Project project = new Project(ownerId, request.getTitle(), request.getDescription());
        return projectRepository.save(project);
    }

    public List<Project> getMyProjects(Long ownerId) {
        return projectRepository.findByOwnerId(ownerId);
    }

    public Project getProjectById(Long projectId, Long ownerId) {
        Project project = projectRepository.findById(projectId)
                .orElseThrow(() -> new RuntimeException("Project not found"));

        if (!project.getOwnerId().equals(ownerId)) {
            throw new RuntimeException("Unauthorized access to project");
        }

        return project;
    }

    public org.keah.projectservice.dto.ProjectProgressDto getProjectProgress(Long projectId, Long ownerId) {
        // Verify project exists and belongs to user
        getProjectById(projectId, ownerId);

        // Fetch tasks from task-service (internal endpoint for service-to-service)
        org.keah.projectservice.dto.TaskDto[] tasks = restTemplate.getForObject(
                "http://task-service/api/internal/projects/" + projectId + "/tasks",
                org.keah.projectservice.dto.TaskDto[].class);

        if (tasks == null) {
            tasks = new org.keah.projectservice.dto.TaskDto[0];
        }

        long totalTasks = tasks.length;
        long completedTasks = java.util.Arrays.stream(tasks)
                .filter(org.keah.projectservice.dto.TaskDto::isCompleted)
                .count();

        double progressPercentage = totalTasks == 0 ? 0 : (double) completedTasks * 100 / totalTasks;

        return new org.keah.projectservice.dto.ProjectProgressDto(totalTasks, completedTasks, progressPercentage);
    }
}
