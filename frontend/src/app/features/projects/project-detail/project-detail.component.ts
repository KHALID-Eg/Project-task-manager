import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, RouterModule, Router } from '@angular/router';
import { ProjectService } from '../../../core/services/project.service';
import { TaskService } from '../../../core/services/task.service';
import { Project, Task, ProjectProgress, TaskRequest } from '../../../shared/models';
import { ProgressBarComponent } from '../../../shared/components/progress-bar/progress-bar.component';

@Component({
    selector: 'app-project-detail',
    standalone: true,
    imports: [CommonModule, FormsModule, RouterModule, ProgressBarComponent],
    template: `
    <div class="back-link">
      <a routerLink="/dashboard">← Back to Projects</a>
    </div>

    <!-- Loading State -->
    <div class="loading" *ngIf="loading">
      <div class="spinner"></div>
      <p>Loading project...</p>
    </div>

    <div *ngIf="!loading && project">
      <!-- Project Header -->
      <div class="project-header">
        <div class="project-info">
          <h1>{{ project.title }}</h1>
          <p *ngIf="project.description">{{ project.description }}</p>
        </div>
      </div>

      <!-- Progress Section -->
      <div class="section">
        <app-progress-bar [progress]="progress"></app-progress-bar>
      </div>

      <!-- Tasks Section -->
      <div class="section">
        <div class="section-header">
          <h2>Tasks</h2>
          <button class="btn-primary" (click)="showTaskForm = true" *ngIf="!showTaskForm">
            + Add Task
          </button>
        </div>

        <!-- Create Task Form -->
        <div class="task-form" *ngIf="showTaskForm">
          <div class="form-card">
            <h3>New Task</h3>
            <form (ngSubmit)="createTask()">
              <div class="form-group">
                <label for="taskTitle">Title *</label>
                <input
                  type="text"
                  id="taskTitle"
                  name="title"
                  [(ngModel)]="newTask.title"
                  required
                  class="form-input"
                  placeholder="Task title"
                />
              </div>
              <div class="form-group">
                <label for="taskDescription">Description</label>
                <textarea
                  id="taskDescription"
                  name="description"
                  [(ngModel)]="newTask.description"
                  class="form-input"
                  rows="2"
                  placeholder="Task description (optional)"
                ></textarea>
              </div>
              <div class="form-group">
                <label for="dueDate">Due Date</label>
                <input
                  type="date"
                  id="dueDate"
                  name="dueDate"
                  [(ngModel)]="newTask.dueDate"
                  class="form-input"
                />
              </div>
              <div class="form-actions">
                <button type="button" class="btn-secondary" (click)="cancelTaskForm()">Cancel</button>
                <button type="submit" class="btn-primary" [disabled]="!newTask.title">Create</button>
              </div>
            </form>
          </div>
        </div>

        <!-- Empty State -->
        <div class="empty-state" *ngIf="tasks.length === 0">
          <span class="empty-icon">📝</span>
          <p>No tasks yet. Add your first task!</p>
        </div>

        <!-- Task List -->
        <div class="task-list">
          <div
            *ngFor="let task of tasks"
            class="task-card"
            [class.completed]="task.completed"
          >
            <div class="task-checkbox" (click)="toggleComplete(task)">
              <span *ngIf="task.completed">✓</span>
            </div>
            <div class="task-content">
              <h4>{{ task.title }}</h4>
              <p *ngIf="task.description">{{ task.description }}</p>
              <div class="task-meta">
                <span *ngIf="task.dueDate" class="due-date">
                  📅 {{ task.dueDate | date:'mediumDate' }}
                </span>
              </div>
            </div>
            <button class="btn-delete" (click)="deleteTask(task)">🗑</button>
          </div>
        </div>
      </div>
    </div>
  `,
    styles: [`
    .back-link {
      margin-bottom: 20px;
    }

    .back-link a {
      color: #667eea;
      text-decoration: none;
      font-weight: 500;
    }

    .back-link a:hover {
      text-decoration: underline;
    }

    .loading {
      display: flex;
      flex-direction: column;
      align-items: center;
      padding: 48px;
      color: #6b7280;
    }

    .spinner {
      width: 40px;
      height: 40px;
      border: 4px solid #e5e7eb;
      border-top-color: #667eea;
      border-radius: 50%;
      animation: spin 1s linear infinite;
    }

    @keyframes spin {
      to { transform: rotate(360deg); }
    }

    .project-header {
      background: white;
      padding: 24px;
      border-radius: 12px;
      box-shadow: 0 2px 10px rgba(0, 0, 0, 0.08);
      margin-bottom: 24px;
    }

    .project-header h1 {
      margin: 0 0 8px 0;
      color: #1a1a2e;
    }

    .project-header p {
      margin: 0;
      color: #6b7280;
    }

    .section {
      margin-bottom: 24px;
    }

    .section-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 16px;
    }

    .section-header h2 {
      margin: 0;
      color: #1a1a2e;
    }

    .btn-primary {
      padding: 10px 20px;
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      color: white;
      border: none;
      border-radius: 8px;
      font-weight: 600;
      cursor: pointer;
    }

    .btn-primary:hover:not(:disabled) {
      transform: translateY(-2px);
      box-shadow: 0 4px 12px rgba(102, 126, 234, 0.4);
    }

    .btn-secondary {
      padding: 10px 20px;
      background: #e5e7eb;
      color: #374151;
      border: none;
      border-radius: 8px;
      font-weight: 600;
      cursor: pointer;
    }

    .task-form {
      margin-bottom: 20px;
    }

    .form-card {
      background: white;
      padding: 20px;
      border-radius: 12px;
      box-shadow: 0 2px 10px rgba(0, 0, 0, 0.08);
    }

    .form-card h3 {
      margin: 0 0 16px 0;
      color: #1a1a2e;
    }

    .form-group {
      margin-bottom: 12px;
    }

    .form-group label {
      display: block;
      color: #374151;
      font-weight: 500;
      margin-bottom: 6px;
      font-size: 14px;
    }

    .form-input {
      width: 100%;
      padding: 10px 12px;
      border: 2px solid #e5e7eb;
      border-radius: 8px;
      font-size: 14px;
      box-sizing: border-box;
    }

    .form-input:focus {
      outline: none;
      border-color: #667eea;
    }

    .form-actions {
      display: flex;
      gap: 12px;
      justify-content: flex-end;
      margin-top: 16px;
    }

    .empty-state {
      text-align: center;
      padding: 32px;
      color: #6b7280;
      background: white;
      border-radius: 12px;
    }

    .empty-icon {
      font-size: 36px;
      display: block;
      margin-bottom: 8px;
    }

    .task-list {
      display: flex;
      flex-direction: column;
      gap: 12px;
    }

    .task-card {
      display: flex;
      align-items: flex-start;
      gap: 16px;
      padding: 16px;
      background: white;
      border-radius: 12px;
      box-shadow: 0 2px 10px rgba(0, 0, 0, 0.08);
      transition: opacity 0.2s;
    }

    .task-card.completed {
      opacity: 0.6;
    }

    .task-card.completed .task-content h4 {
      text-decoration: line-through;
    }

    .task-checkbox {
      width: 24px;
      height: 24px;
      border: 2px solid #667eea;
      border-radius: 6px;
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      flex-shrink: 0;
      color: white;
      font-size: 14px;
      font-weight: 700;
    }

    .task-card.completed .task-checkbox {
      background: #667eea;
    }

    .task-content {
      flex: 1;
    }

    .task-content h4 {
      margin: 0 0 4px 0;
      color: #1a1a2e;
      font-size: 16px;
    }

    .task-content p {
      margin: 0 0 8px 0;
      color: #6b7280;
      font-size: 14px;
    }

    .task-meta {
      display: flex;
      gap: 12px;
      font-size: 12px;
    }

    .due-date {
      color: #6b7280;
    }

    .btn-delete {
      background: none;
      border: none;
      cursor: pointer;
      font-size: 16px;
      padding: 8px;
      opacity: 0.5;
      transition: opacity 0.2s;
    }

    .btn-delete:hover {
      opacity: 1;
    }
  `]
})
export class ProjectDetailComponent implements OnInit {
    projectId!: number;
    project: Project | null = null;
    tasks: Task[] = [];
    progress: ProjectProgress | null = null;
    loading = false;
    showTaskForm = false;
    newTask: TaskRequest = { title: '', description: '', dueDate: '' };

    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private projectService: ProjectService,
        private taskService: TaskService
    ) { }

    ngOnInit(): void {
        this.projectId = Number(this.route.snapshot.paramMap.get('id'));
        this.loadProject();
        this.loadTasks();
        this.loadProgress();
    }

    loadProject(): void {
        this.loading = true;
        this.projectService.getProject(this.projectId).subscribe({
            next: (project) => {
                this.project = project;
                this.loading = false;
            },
            error: (err) => {
                console.error('Failed to load project', err);
                this.loading = false;
            }
        });
    }

    loadTasks(): void {
        this.taskService.getTasksByProject(this.projectId).subscribe({
            next: (tasks) => {
                this.tasks = tasks;
            },
            error: (err) => console.error('Failed to load tasks', err)
        });
    }

    loadProgress(): void {
        this.projectService.getProjectProgress(this.projectId).subscribe({
            next: (progress) => {
                this.progress = progress;
            },
            error: (err) => console.error('Failed to load progress', err)
        });
    }

    createTask(): void {
        if (!this.newTask.title) return;

        this.taskService.createTask(this.projectId, this.newTask).subscribe({
            next: () => {
                this.showTaskForm = false;
                this.newTask = { title: '', description: '', dueDate: '' };
                this.loadTasks();
                this.loadProgress();
            },
            error: (err) => console.error('Failed to create task', err)
        });
    }

    cancelTaskForm(): void {
        this.showTaskForm = false;
        this.newTask = { title: '', description: '', dueDate: '' };
    }

    toggleComplete(task: Task): void {
        if (!task.completed) {
            this.taskService.completeTask(task.id).subscribe({
                next: () => {
                    this.loadTasks();
                    this.loadProgress();
                },
                error: (err) => console.error('Failed to complete task', err)
            });
        }
    }

    deleteTask(task: Task): void {
        if (confirm('Are you sure you want to delete this task?')) {
            this.taskService.deleteTask(task.id).subscribe({
                next: () => {
                    this.loadTasks();
                    this.loadProgress();
                },
                error: (err) => console.error('Failed to delete task', err)
            });
        }
    }
}
