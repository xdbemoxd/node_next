export interface Task {
    urgency : string,
    name_task : string,
    description ?: string,
    id: number,
    due_date : Date,
    status: "pending" | "in-progress" | "completed",
}

export interface Task_2 {
    urgency : string,
    name_task : string,
    description ?: string,
    due_date : Date,
    status: string
}