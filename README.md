# Creative Digital Agency Website

![App Preview](https://imgix.cosmicjs.com/3133f590-d0a7-11f0-b20e-1d251587b0cd-photo-1599305445671-ac291c95aaa9-1764807694307.jpg?w=1200&h=300&fit=crop&auto=format,compress)

A modern, full-featured digital agency website built with Next.js 16 and powered by Cosmic CMS. Showcase your services, portfolio, team, and testimonials with a beautiful, responsive design that drives conversions.

## ✨ Features

- 🎨 **Modern Design**: Beautiful, contemporary interface with smooth animations
- 📱 **Fully Responsive**: Works seamlessly on desktop, tablet, and mobile devices
- 🚀 **Next.js 16**: Built with the latest Next.js App Router for optimal performance
- 💾 **Cosmic CMS**: Dynamic content management for easy updates
- 🎯 **Portfolio Showcase**: Filterable project gallery with detailed case studies
- 👥 **Team Profiles**: Professional team member cards with social links
- ⭐ **Client Testimonials**: Trust-building reviews with ratings and company logos
- 📊 **Services Display**: Detailed service pages with features and pricing
- 🔍 **SEO Optimized**: Proper meta tags and semantic HTML
- ⚡ **TypeScript**: Fully typed for enhanced developer experience and reliability
- 🎭 **Loading States**: Elegant loading and error handling throughout
- 🌐 **Social Media Integration**: Connect with your audience across platforms

## Clone this Project

Want to create your own version of this project with all the content and structure? Clone this Cosmic bucket and code repository to get started instantly:

[![Clone this Project](https://img.shields.io/badge/Clone%20this%20Project-29abe2?style=for-the-badge&logo=cosmic&logoColor=white)](https://app.cosmicjs.com/projects/new?clone_bucket=6930d3463584465d0a2f6614&clone_repository=6930d5763584465d0a2f6675)

## Prompts

This application was built using the following prompts to generate the content structure and code:

### Content Model Prompt

> "Create a digital agency company website with content models for services, team members, portfolio projects, testimonials, and company information. Include demo content for a modern creative agency showcasing web design, digital marketing, and branding services."

### Code Generation Prompt

> Based on the content model I created for "Create a digital agency company website with content models for services, team members, portfolio projects, testimonials, and company information. Include demo content for a modern creative agency showcasing web design, digital marketing, and branding services.", now build a complete web application that showcases this content. Include a modern, responsive design with proper navigation, content display, and user-friendly interface.

The app has been tailored to work with your existing Cosmic content structure and includes all the features requested above.

## 🛠️ Technologies Used

- **Framework**: Next.js 16 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **CMS**: Cosmic
- **Font**: Inter (Google Fonts)
- **Image Optimization**: imgix
- **Package Manager**: Bun

## 🚀 Getting Started

### Prerequisites

- Bun installed on your machine
- A Cosmic account with a bucket containing your agency content

### Installation

1. Clone this repository
2. Install dependencies:

```bash
bun install
```

3. Create a `.env.local` file in the root directory with your Cosmic credentials:

```env
COSMIC_BUCKET_SLUG=your-bucket-slug
COSMIC_READ_KEY=your-read-key
COSMIC_WRITE_KEY=your-write-key
```

4. Run the development server:

```bash
bun run dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser

## 📚 Cosmic SDK Examples

### Fetching Services

```typescript
import { cosmic } from '@/lib/cosmic'

export async function getServices() {
  try {
    const { objects: services } = await cosmic.objects
      .find({ type: 'services' })
      .props(['id', 'title', 'slug', 'metadata'])
      .depth(1)
    
    return services as Service[]
  } catch (error) {
    console.error('Error fetching services:', error)
    return []
  }
}
```

### Fetching Portfolio Projects with Filtering

```typescript
export async function getProjects(category?: string) {
  try {
    const query: any = { type: 'portfolio-projects' }
    
    if (category && category !== 'all') {
      query['metadata.category.key'] = category
    }
    
    const { objects: projects } = await cosmic.objects
      .find(query)
      .props(['id', 'title', 'slug', 'metadata'])
      .depth(1)
    
    return projects as PortfolioProject[]
  } catch (error) {
    console.error('Error fetching projects:', error)
    return []
  }
}
```

### Fetching Team Members

```typescript
export async function getTeamMembers() {
  try {
    const { objects: team } = await cosmic.objects
      .find({ type: 'team-members' })
      .props(['id', 'title', 'slug', 'metadata'])
      .depth(1)
    
    return team as TeamMember[]
  } catch (error) {
    console.error('Error fetching team members:', error)
    return []
  }
}
```

## 🌐 Cosmic CMS Integration

This application integrates with Cosmic CMS to manage all content dynamically. Your Cosmic bucket should include:

### Content Models

1. **Services** (`services`)
   - Service Name, Short Description, Full Description
   - Service Icon, Features (JSON), Starting Price

2. **Portfolio Projects** (`portfolio-projects`)
   - Project Title, Client Name, Project Description
   - Category (Web Design, Branding, Digital Marketing, Mobile App)
   - Featured Image, Project Gallery, Project Date
   - Live Project URL, Related Services, Featured Toggle

3. **Team Members** (`team-members`)
   - Full Name, Role, Bio
   - Photo, Email, LinkedIn, Twitter
   - Skills (JSON array)

4. **Testimonials** (`testimonials`)
   - Client Name, Client Company, Client Role
   - Testimonial Text, Rating (5/4/3 stars)
   - Client Photo, Company Logo, Related Project

5. **Company Info** (`company-info`) - Singleton
   - Company Name, Tagline, About
   - Company Logo, Email, Phone, Address
   - Social Media Links (Facebook, Twitter, Instagram, LinkedIn)
   - Company Values (JSON array)

All content types use the `depth=1` parameter to fetch related objects (like services in portfolio projects or projects in testimonials).

## 📦 Deployment

### Deploy to Vercel

1. Push your code to GitHub
2. Import your repository in Vercel
3. Add your environment variables in the Vercel dashboard
4. Deploy!

### Deploy to Netlify

1. Push your code to GitHub
2. Connect your repository in Netlify
3. Add your environment variables in the Netlify dashboard
4. Set the build command to `bun run build`
5. Set the publish directory to `.next`
6. Deploy!

## 📝 Environment Variables

Required environment variables:

- `COSMIC_BUCKET_SLUG`: Your Cosmic bucket slug
- `COSMIC_READ_KEY`: Your Cosmic read key
- `COSMIC_WRITE_KEY`: Your Cosmic write key

## 🎨 Customization

### Styling

The application uses Tailwind CSS for styling. Customize the design by modifying:

- `tailwind.config.js`: Theme configuration (colors, fonts, spacing)
- `app/globals.css`: Global styles and CSS variables
- Component files: Individual component styling

### Content

All content is managed through Cosmic CMS. Update your content by:

1. Logging into your Cosmic dashboard
2. Navigating to your bucket
3. Editing objects in the relevant content types

Changes will be reflected immediately on your website.

## 📄 License

This project is open source and available under the MIT License.

<!-- README_END -->