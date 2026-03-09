export interface Task {
    _id?: string;
    title: string;
    description: string;
    deadline: string;
    userId?: string;
    status?: "pending" | "completed"
    createdAt?: string;
}