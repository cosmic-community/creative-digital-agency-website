// Comprehensive type definitions for Cosmic CMS objects

// Base Cosmic object interface
export interface CosmicObject {
  id: string
  slug: string
  title: string
  content?: string
  metadata: Record<string, any>
  type: string
  created_at: string
  modified_at: string
}

// Service type
export interface Service extends CosmicObject {
  type: 'services'
  metadata: {
    service_name: string
    short_description: string
    full_description?: string
    service_icon?: {
      url: string
      imgix_url: string
    }
    features?: string[]
    starting_price?: string
  }
}

// Portfolio project type
export interface PortfolioProject extends CosmicObject {
  type: 'portfolio-projects'
  metadata: {
    project_title: string
    client_name: string
    project_description: string
    category: {
      key: string
      value: string
    }
    featured_image?: {
      url: string
      imgix_url: string
    }
    project_gallery?: Array<{
      url: string
      imgix_url: string
    }>
    project_date?: string
    live_project_url?: string
    related_services?: string[]
    featured?: boolean
  }
}

// Team member type
export interface TeamMember extends CosmicObject {
  type: 'team-members'
  metadata: {
    full_name: string
    role: string
    bio?: string
    photo?: {
      url: string
      imgix_url: string
    }
    email?: string
    linkedin?: string
    twitter?: string
    skills?: string[]
  }
}

// Testimonial type
export interface Testimonial extends CosmicObject {
  type: 'testimonials'
  metadata: {
    client_name: string
    client_company: string
    client_role?: string
    testimonial: string
    rating: {
      key: string
      value: string
    }
    client_photo?: {
      url: string
      imgix_url: string
    }
    company_logo?: {
      url: string
      imgix_url: string
    }
    related_project?: PortfolioProject
  }
}

// Company info type
export interface CompanyInfo extends CosmicObject {
  type: 'company-info'
  metadata: {
    company_name: string
    tagline?: string
    about?: string
    company_logo?: {
      url: string
      imgix_url: string
    }
    email?: string
    phone?: string
    address?: string
    facebook?: string
    twitter?: string
    instagram?: string
    linkedin?: string
    company_values?: Array<{
      title: string
      description: string
    }>
  }
}

// API response types
export interface CosmicResponse<T> {
  objects: T[]
  total: number
  limit?: number
  skip?: number
}