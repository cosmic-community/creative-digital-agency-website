// app/portfolio/[slug]/page.tsx
import { getProjectBySlug, getProjects } from '@/lib/cosmic'
import { notFound } from 'next/navigation'
import Link from 'next/link'

export const revalidate = 60

export async function generateStaticParams() {
  const projects = await getProjects()
  return projects.map((project) => ({
    slug: project.slug,
  }))
}

type Params = Promise<{ slug: string }>

export default async function ProjectPage({ params }: { params: Params }) {
  const { slug } = await params
  const project = await getProjectBySlug(slug)
  
  if (!project) {
    notFound()
  }
  
  return (
    <div className="py-20">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Back link */}
        <Link
          href="/portfolio"
          className="inline-flex items-center text-primary hover:text-blue-700 mb-8"
        >
          <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Back to Portfolio
        </Link>
        
        {/* Featured image */}
        {project.metadata.featured_image && (
          <div className="mb-8 rounded-lg overflow-hidden">
            <img
              src={`${project.metadata.featured_image.imgix_url}?w=1200&h=600&fit=crop&auto=format,compress`}
              alt={project.metadata.project_title}
              className="w-full h-auto"
              width={1200}
              height={600}
            />
          </div>
        )}
        
        {/* Project details */}
        <div className="mb-8">
          <div className="flex items-center gap-4 mb-4">
            <span className="px-4 py-1 bg-primary text-white rounded-full text-sm font-semibold">
              {project.metadata.category.value}
            </span>
            {project.metadata.featured && (
              <span className="px-4 py-1 bg-gray-200 text-gray-800 rounded-full text-sm font-semibold">
                Featured
              </span>
            )}
          </div>
          
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            {project.metadata.project_title}
          </h1>
          
          <div className="flex flex-wrap gap-6 text-gray-600 mb-6">
            <div className="flex items-center">
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
              </svg>
              Client: {project.metadata.client_name}
            </div>
            
            {project.metadata.project_date && (
              <div className="flex items-center">
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                {new Date(project.metadata.project_date).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'long',
                })}
              </div>
            )}
            
            {project.metadata.live_project_url && (
              <a
                href={project.metadata.live_project_url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center text-primary hover:text-blue-700"
              >
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
                View Live Site
              </a>
            )}
          </div>
        </div>
        
        {/* Project description */}
        <div
          className="prose-custom max-w-none mb-12"
          dangerouslySetInnerHTML={{ __html: project.metadata.project_description }}
        />
        
        {/* Project gallery */}
        {project.metadata.project_gallery && project.metadata.project_gallery.length > 0 && (
          <div className="mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Project Gallery</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {project.metadata.project_gallery.map((image, index) => (
                <div key={index} className="rounded-lg overflow-hidden">
                  <img
                    src={`${image.imgix_url}?w=800&h=600&fit=crop&auto=format,compress`}
                    alt={`${project.metadata.project_title} - Gallery image ${index + 1}`}
                    className="w-full h-auto"
                    width={800}
                    height={600}
                  />
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}