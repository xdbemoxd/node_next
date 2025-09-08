export interface Task {
    urgency : string,
    name_task : string,
    description ?: string,
    due_date : Date,
    status: "pending" | "in-progress" | "completed" | null,
    id : number
}