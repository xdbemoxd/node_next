export interface Task {
    urgency : string,
    name_task : string,
    description ?: string,
    due_date : Date,
    status: "pending" | "in-progress" | "completed" | null,
    id_task : number
}

export interface Task_2 {
    urgency : string,
    name_task : string,
    description ?: string,
    due_date : Date,
    status: string
}

export interface Urgency {
    id:number,
    type_status : string,
}

export interface Status {
    id:number,
    status_description : string,
}