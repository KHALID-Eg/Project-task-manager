import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { ProjectService } from '../../../core/services/project.service';
import { Project } from '../../../shared/models';

@Component({
    selector: 'app-project-list',
    standalone: true,
    imports: [CommonModule, FormsModule, RouterModule],
    template: `
    <div class="page-header">
      <h1>My Projects</h1>
      <button class="btn-primary" (click)="showCreateForm = true" *ngIf="!showCreateForm">
        + Create Project
      </button>
    </div>

    <!-- Create Project Form -->
    <div class="create-form" *ngIf="showCreateForm">
      <div class="form-card">
        <h2>Create New Project</h2>
        <form (ngSubmit)="createProject()">
          <div class="form-group">
            <label for="title">Title *</label>
            <input
              type="text"
              id="title"
              name="title"
              [(ngModel)]="newProject.title"
              required
              class="form-input"
              placeholder="Project title"
            />
          </div>
          <div class="form-group">
            <label for="description">Description</label>
            <textarea
              id="description"
              name="description"
              [(ngModel)]="newProject.description"
              class="form-input"
              rows="3"
              placeholder="Project description (optional)"
            ></textarea>
          </div>
          <div class="form-actions">
            <button type="button" class="btn-secondary" (click)="cancelCreate()">Cancel</button>
            <button type="submit" class="btn-primary" [disabled]="!newProject.title">Create</button>
          </div>
        </form>
      </div>
    </div>

    <!-- Loading State -->
    <div class="loading" *ngIf="loading">
      <div class="spinner"></div>
      <p>Loading projects...</p>
    </div>

    <!-- Error State -->
    <div class="error-banner" *ngIf="errorMessage">
      {{ errorMessage }}
    </div>

    <!-- Empty State -->
    <div class="empty-state" *ngIf="!loading && projects.length === 0">
      <span class="empty-icon">📁</span>
      <h3>No projects yet</h3>
      <p>Create your first project to get started</p>
    </div>

    <!-- Project Grid -->
    <div class="project-grid" *ngIf="!loading && projects.length > 0">
      <a
        *ngFor="let project of projects"
        [routerLink]="['/projects', project.id]"
        class="project-card"
      >
        <div class="project-icon">📋</div>
        <div class="project-info">
          <h3>{{ project.title }}</h3>
          <p>{{ project.description || 'No description' }}</p>
        </div>
        <div class="project-arrow">→</div>
      </a>
    </div>
  `,
    styles: [`
    .page-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 24px;
    }

    .page-header h1 {
      margin: 0;
      color: #1a1a2e;
      font-size: 28px;
    }

    .btn-primary {
      padding: 12px 24px;
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      color: white;
      border: none;
      border-radius: 8px;
      font-weight: 600;
      cursor: pointer;
      transition: transform 0.2s, box-shadow 0.2s;
    }

    .btn-primary:hover:not(:disabled) {
      transform: translateY(-2px);
      box-shadow: 0 4px 12px rgba(102, 126, 234, 0.4);
    }

    .btn-primary:disabled {
      opacity: 0.6;
      cursor: not-allowed;
    }

    .btn-secondary {
      padding: 12px 24px;
      background: #e5e7eb;
      color: #374151;
      border: none;
      border-radius: 8px;
      font-weight: 600;
      cursor: pointer;
      transition: background 0.2s;
    }

    .btn-secondary:hover {
      background: #d1d5db;
    }

    .create-form {
      margin-bottom: 24px;
    }

    .form-card {
      background: white;
      border-radius: 12px;
      padding: 24px;
      box-shadow: 0 2px 10px rgba(0, 0, 0, 0.08);
    }

    .form-card h2 {
      margin: 0 0 20px 0;
      color: #1a1a2e;
    }

    .form-group {
      margin-bottom: 16px;
    }

    .form-group label {
      display: block;
      color: #374151;
      font-weight: 500;
      margin-bottom: 8px;
    }

    .form-input {
      width: 100%;
      padding: 12px;
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

    .error-banner {
      background: #fee2e2;
      color: #dc2626;
      padding: 16px;
      border-radius: 8px;
      margin-bottom: 24px;
    }

    .empty-state {
      text-align: center;
      padding: 48px;
      color: #6b7280;
    }

    .empty-icon {
      font-size: 48px;
      display: block;
      margin-bottom: 16px;
    }

    .empty-state h3 {
      margin: 0 0 8px 0;
      color: #374151;
    }

    .project-grid {
      display: grid;
      gap: 16px;
      grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
    }

    .project-card {
      display: flex;
      align-items: center;
      gap: 16px;
      padding: 20px;
      background: white;
      border-radius: 12px;
      text-decoration: none;
      color: inherit;
      box-shadow: 0 2px 10px rgba(0, 0, 0, 0.08);
      transition: transform 0.2s, box-shadow 0.2s;
    }

    .project-card:hover {
      transform: translateY(-4px);
      box-shadow: 0 8px 20px rgba(0, 0, 0, 0.12);
    }

    .project-icon {
      font-size: 32px;
    }

    .project-info {
      flex: 1;
    }

    .project-info h3 {
      margin: 0 0 4px 0;
      color: #1a1a2e;
      font-size: 16px;
    }

    .project-info p {
      margin: 0;
      color: #6b7280;
      font-size: 14px;
    }

    .project-arrow {
      color: #9ca3af;
      font-size: 20px;
    }
  `]
})
export class ProjectListComponent implements OnInit {
    projects: Project[] = [];
    loading = false;
    errorMessage = '';
    showCreateForm = false;
    newProject = { title: '', description: '' };

    constructor(private projectService: ProjectService) { }

    ngOnInit(): void {
        this.loadProjects();
    }

    loadProjects(): void {
        this.loading = true;
        this.errorMessage = '';

        this.projectService.getProjects().subscribe({
            next: (projects) => {
                this.projects = projects;
                this.loading = false;
            },
            error: (err) => {
                this.errorMessage = 'Failed to load projects';
                this.loading = false;
                console.error(err);
            }
        });
    }

    createProject(): void {
        if (!this.newProject.title) return;

        this.projectService.createProject(this.newProject).subscribe({
            next: () => {
                this.showCreateForm = false;
                this.newProject = { title: '', description: '' };
                this.loadProjects();
            },
            error: (err) => {
                this.errorMessage = 'Failed to create project';
                console.error(err);
            }
        });
    }

    cancelCreate(): void {
        this.showCreateForm = false;
        this.newProject = { title: '', description: '' };
    }
}
