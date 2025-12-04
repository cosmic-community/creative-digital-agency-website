import { createBucketClient } from '@cosmicjs/sdk'
import type { Service, PortfolioProject, TeamMember, Testimonial, CompanyInfo } from '@/types'

export const cosmic = createBucketClient({
  bucketSlug: process.env.COSMIC_BUCKET_SLUG as string,
  readKey: process.env.COSMIC_READ_KEY as string,
  writeKey: process.env.COSMIC_WRITE_KEY as string,
})

// Helper function for error checking
function hasStatus(error: unknown): error is { status: number } {
  return typeof error === 'object' && error !== null && 'status' in error
}

// Fetch all services
export async function getServices(): Promise<Service[]> {
  try {
    const { objects: services } = await cosmic.objects
      .find({ type: 'services' })
      .props(['id', 'title', 'slug', 'metadata'])
      .depth(1)
    
    return services as Service[]
  } catch (error) {
    if (hasStatus(error) && error.status === 404) {
      return []
    }
    console.error('Error fetching services:', error)
    throw new Error('Failed to fetch services')
  }
}

// Fetch single service by slug
export async function getServiceBySlug(slug: string): Promise<Service | null> {
  try {
    const { object: service } = await cosmic.objects
      .findOne({ type: 'services', slug })
      .props(['id', 'title', 'slug', 'metadata'])
      .depth(1)
    
    return service as Service
  } catch (error) {
    if (hasStatus(error) && error.status === 404) {
      return null
    }
    console.error('Error fetching service:', error)
    throw new Error('Failed to fetch service')
  }
}

// Fetch portfolio projects with optional category filter
export async function getProjects(category?: string): Promise<PortfolioProject[]> {
  try {
    const query: any = { type: 'portfolio-projects' }
    
    if (category && category !== 'all') {
      query['metadata.category.key'] = category
    }
    
    const { objects: projects } = await cosmic.objects
      .find(query)
      .props(['id', 'title', 'slug', 'metadata'])
      .depth(1)
    
    // Sort by featured first, then by date
    const sorted = (projects as PortfolioProject[]).sort((a, b) => {
      if (a.metadata.featured && !b.metadata.featured) return -1
      if (!a.metadata.featured && b.metadata.featured) return 1
      
      const dateA = new Date(a.metadata.project_date || '').getTime()
      const dateB = new Date(b.metadata.project_date || '').getTime()
      return dateB - dateA
    })
    
    return sorted
  } catch (error) {
    if (hasStatus(error) && error.status === 404) {
      return []
    }
    console.error('Error fetching projects:', error)
    throw new Error('Failed to fetch projects')
  }
}

// Fetch single project by slug
export async function getProjectBySlug(slug: string): Promise<PortfolioProject | null> {
  try {
    const { object: project } = await cosmic.objects
      .findOne({ type: 'portfolio-projects', slug })
      .props(['id', 'title', 'slug', 'metadata'])
      .depth(1)
    
    return project as PortfolioProject
  } catch (error) {
    if (hasStatus(error) && error.status === 404) {
      return null
    }
    console.error('Error fetching project:', error)
    throw new Error('Failed to fetch project')
  }
}

// Fetch team members
export async function getTeamMembers(): Promise<TeamMember[]> {
  try {
    const { objects: team } = await cosmic.objects
      .find({ type: 'team-members' })
      .props(['id', 'title', 'slug', 'metadata'])
      .depth(1)
    
    return team as TeamMember[]
  } catch (error) {
    if (hasStatus(error) && error.status === 404) {
      return []
    }
    console.error('Error fetching team members:', error)
    throw new Error('Failed to fetch team members')
  }
}

// Fetch testimonials
export async function getTestimonials(): Promise<Testimonial[]> {
  try {
    const { objects: testimonials } = await cosmic.objects
      .find({ type: 'testimonials' })
      .props(['id', 'title', 'slug', 'metadata'])
      .depth(1)
    
    return testimonials as Testimonial[]
  } catch (error) {
    if (hasStatus(error) && error.status === 404) {
      return []
    }
    console.error('Error fetching testimonials:', error)
    throw new Error('Failed to fetch testimonials')
  }
}

// Fetch company info (singleton)
export async function getCompanyInfo(): Promise<CompanyInfo | null> {
  try {
    const { objects } = await cosmic.objects
      .find({ type: 'company-info' })
      .props(['id', 'title', 'slug', 'metadata'])
      .depth(1)
    
    return objects[0] as CompanyInfo || null
  } catch (error) {
    if (hasStatus(error) && error.status === 404) {
      return null
    }
    console.error('Error fetching company info:', error)
    throw new Error('Failed to fetch company info')
  }
}