import React from 'react';
import { notFound } from 'next/navigation';
import { getProjectById, getAllProjects } from '@/lib/projects';
import ProjectDetailClient from '@/components/work/ProjectDetailClient';

export function generateStaticParams() {
  const projects = getAllProjects();
  return projects.map((project) => ({
    project: project.id,
  }));
}

export default async function ProjectDetailPage({ params }: { params: Promise<{ project: string }> }) {
  const { project: projectId } = await params;
  
  const project = getProjectById(projectId);

  if (!project) {
    notFound();
  }

  return (
    <div className="flex flex-col min-h-screen bg-[#050505] text-[#F5F2E8]" style={{ fontFamily: '"Hanken Grotesk", sans-serif' }}>
      <main className="flex-grow pt-32 pb-24 px-6 md:px-16 max-w-[1440px] mx-auto w-full overflow-hidden">
        <ProjectDetailClient project={project} />
      </main>
    </div>
  );
}
