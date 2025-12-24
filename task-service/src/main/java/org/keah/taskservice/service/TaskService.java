package org.keah.taskservice.service;

import lombok.RequiredArgsConstructor;
import org.keah.taskservice.dto.TaskRequest;
import org.keah.taskservice.entity.Task;
import org.keah.taskservice.repository.TaskRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class TaskService {

    private final TaskRepository taskRepository;

    public Task createTask(Long projectId, Long ownerId, TaskRequest request) {
        Task task = new Task(projectId, ownerId, request.getTitle(), request.getDescription(), request.getDueDate());
        return taskRepository.save(task);
    }

    public List<Task> getTasksByProject(Long projectId, Long ownerId) {
        return taskRepository.findByProjectId(projectId).stream()
                .filter(task -> task.getOwnerId().equals(ownerId))
                .collect(Collectors.toList());
    }

    public Task completeTask(Long taskId, Long ownerId) {
        Task task = taskRepository.findById(taskId)
                .orElseThrow(() -> new RuntimeException("Task not found"));

        if (!task.getOwnerId().equals(ownerId)) {
            throw new RuntimeException("Unauthorized access to task");
        }

        task.setCompleted(true);
        return taskRepository.save(task);
    }

    public void deleteTask(Long taskId, Long ownerId) {
        Task task = taskRepository.findById(taskId)
                .orElseThrow(() -> new RuntimeException("Task not found"));

        if (!task.getOwnerId().equals(ownerId)) {
            throw new RuntimeException("Unauthorized access to task");
        }

        taskRepository.delete(task);
    }

    // Internal method for service-to-service progress calculation
    public List<Task> getTasksByProjectInternal(Long projectId) {
        return taskRepository.findByProjectId(projectId);
    }
}
