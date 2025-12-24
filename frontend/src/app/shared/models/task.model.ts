export interface Task {
    id: number;
    projectId: number;
    title: string;
    description?: string;
    dueDate?: string;
    completed: boolean;
    createdAt?: string;
}

export interface TaskRequest {
    title: string;
    description?: string;
    dueDate?: string;
}
