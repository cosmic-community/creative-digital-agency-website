import { getProjects } from '@/lib/cosmic'
import ProjectCard from '@/components/ProjectCard'
import CategoryFilter from '@/components/CategoryFilter'

export const metadata = {
  title: 'Portfolio - Creative Digital Agency',
  description: 'Browse our portfolio of successful projects across web design, branding, and digital marketing.',
}

export const revalidate = 60

type SearchParams = Promise<{ category?: string }>

export default async function PortfolioPage({ searchParams }: { searchParams: SearchParams }) {
  const params = await searchParams
  const category = params.category || 'all'
  const projects = await getProjects(category)
  
  return (
    <div className="py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-gray-900 mb-6">Our Portfolio</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
            Explore our collection of successful projects and see how we've helped businesses 
            achieve their digital goals.
          </p>
          
          <CategoryFilter currentCategory={category} />
        </div>
        
        {projects.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-xl text-gray-600">No projects found in this category.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}