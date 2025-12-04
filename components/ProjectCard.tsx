import Link from 'next/link'
import type { PortfolioProject } from '@/types'

interface ProjectCardProps {
  project: PortfolioProject
}

export default function ProjectCard({ project }: ProjectCardProps) {
  return (
    <Link href={`/portfolio/${project.slug}`} className="group">
      <div className="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow">
        {project.metadata.featured_image && (
          <div className="aspect-video overflow-hidden">
            <img
              src={`${project.metadata.featured_image.imgix_url}?w=800&h=600&fit=crop&auto=format,compress`}
              alt={project.metadata.project_title}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              width={800}
              height={600}
            />
          </div>
        )}
        
        <div className="p-6">
          <div className="flex items-center gap-2 mb-3">
            <span className="px-3 py-1 bg-primary text-white rounded-full text-xs font-semibold">
              {project.metadata.category.value}
            </span>
            {project.metadata.featured && (
              <span className="px-3 py-1 bg-gray-200 text-gray-800 rounded-full text-xs font-semibold">
                Featured
              </span>
            )}
          </div>
          
          <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-primary transition-colors">
            {project.metadata.project_title}
          </h3>
          
          <p className="text-gray-600 text-sm mb-3">
            {project.metadata.client_name}
          </p>
          
          <div
            className="text-gray-700 line-clamp-2"
            dangerouslySetInnerHTML={{ 
              __html: project.metadata.project_description.substring(0, 150) + '...' 
            }}
          />
        </div>
      </div>
    </Link>
  )
}