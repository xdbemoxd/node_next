import EditTaskForm from "@/pages/updateTaskGrid/page";

export default async function TasksPage({ params }: { params : Promise< {id : string} > }) {
    
    const { id } = await params;
    
    return (
        <EditTaskForm id={id}/>
    )
}