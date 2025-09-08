import TasksPageGrid from "@/pages/task_grid/page";


export default async function TasksPage({ params }: { params : Promise< {id : string} > }) {
    
    const { id } = await params;
    
    return (
        <TasksPageGrid id={id}/>
    )
}