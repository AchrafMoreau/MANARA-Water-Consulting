import { ProjectForm } from "@/components/dashboard/projects/project-form";
import { createProject, getAllCategories } from "@/lib/actions/project-action";
import { redirect } from "next/navigation";

export default async function Page(){

    const categories = await getAllCategories();
    return(
        <div className="mx-auto w-full py-6">
            <h1 className="mb-6 text-2xl font-bold">Create New Project</h1>
            <ProjectForm 
                onSubmit={createProject} 
                onCancelUrl={'/dashboard/projects'}
                categories={categories}
            />
        </div>
    )
}