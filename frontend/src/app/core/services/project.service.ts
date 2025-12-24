import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { Project, ProjectRequest, ProjectProgress } from '../../shared/models';

@Injectable({
    providedIn: 'root'
})
export class ProjectService {
    private readonly API_URL = `${environment.apiUrl}/api/projects`;

    constructor(private http: HttpClient) { }

    getProjects(): Observable<Project[]> {
        return this.http.get<Project[]>(this.API_URL);
    }

    getProject(id: number): Observable<Project> {
        return this.http.get<Project>(`${this.API_URL}/${id}`);
    }

    createProject(project: ProjectRequest): Observable<Project> {
        return this.http.post<Project>(this.API_URL, project);
    }

    getProjectProgress(projectId: number): Observable<ProjectProgress> {
        return this.http.get<ProjectProgress>(`${this.API_URL}/${projectId}/progress`);
    }
}
