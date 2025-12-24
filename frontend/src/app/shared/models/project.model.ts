export interface Project {
    id: number;
    ownerId: number;
    title: string;
    description?: string;
    createdAt?: string;
}

export interface ProjectRequest {
    title: string;
    description?: string;
}

export interface ProjectProgress {
    totalTasks: number;
    completedTasks: number;
    progressPercentage: number;
}
