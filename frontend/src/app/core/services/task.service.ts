import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { Task, TaskRequest } from '../../shared/models';

@Injectable({
    providedIn: 'root'
})
export class TaskService {
    private readonly API_URL = environment.apiUrl;

    constructor(private http: HttpClient) { }

    getTasksByProject(projectId: number): Observable<Task[]> {
        return this.http.get<Task[]>(`${this.API_URL}/api/projects/${projectId}/tasks`);
    }

    createTask(projectId: number, task: TaskRequest): Observable<Task> {
        return this.http.post<Task>(`${this.API_URL}/api/projects/${projectId}/tasks`, task);
    }

    completeTask(taskId: number): Observable<Task> {
        return this.http.patch<Task>(`${this.API_URL}/api/tasks/${taskId}/complete`, {});
    }

    deleteTask(taskId: number): Observable<void> {
        return this.http.delete<void>(`${this.API_URL}/api/tasks/${taskId}`);
    }
}
