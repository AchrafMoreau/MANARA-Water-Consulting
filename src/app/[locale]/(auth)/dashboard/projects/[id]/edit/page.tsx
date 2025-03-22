// app/dashboard/projects/[id]/edit/page.tsx
import { notFound } from 'next/navigation';
import { ProjectForm } from '@/components/dashboard/projects/project-form';
import { updateProject, getAllCategories, getProjectById  } from '@/lib/actions/project-action';

export default async function ProjectEditPage({ params }: {
  params: { id: string };
}) {
  const id = params.id;
  const project = await getProjectById(id);
  const categories = await getAllCategories();

  if (!project) {
    notFound();
  }

  return (
    <div className="mx-auto w-full py-6">
      <h1 className="mb-6 text-2xl font-bold">Edit Project</h1>
      <ProjectForm
        project={project}
        onSubmit={updateProject}
        onCancelUrl={`/dashboard/projects/${id}`}
        categories={categories}
      />
    </div>
  );
}