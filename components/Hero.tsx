import Link from 'next/link'
import type { CompanyInfo } from '@/types'

interface HeroProps {
  companyInfo: CompanyInfo | null
}

export default function Hero({ companyInfo }: HeroProps) {
  return (
    <section className="relative bg-gradient-to-br from-blue-50 to-white py-20 md:py-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
              {companyInfo?.metadata.tagline || 'Transforming Ideas into Digital Experiences'}
            </h1>
            <p className="text-xl text-gray-600 mb-8">
              We're a full-service digital agency passionate about creating meaningful connections 
              between brands and their audiences through innovative design and strategic thinking.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link
                href="/portfolio"
                className="px-8 py-4 bg-primary text-white rounded-lg hover:bg-blue-700 transition-colors text-lg font-semibold"
              >
                View Our Work
              </Link>
              <Link
                href="/contact"
                className="px-8 py-4 bg-white text-primary border-2 border-primary rounded-lg hover:bg-blue-50 transition-colors text-lg font-semibold"
              >
                Get in Touch
              </Link>
            </div>
          </div>
          
          <div className="relative">
            <div className="aspect-square rounded-2xl bg-gradient-to-br from-primary to-blue-700 opacity-10 absolute inset-0 transform rotate-6"></div>
            {companyInfo?.metadata.company_logo && (
              <img
                src={`${companyInfo.metadata.company_logo.imgix_url}?w=600&h=600&fit=crop&auto=format,compress`}
                alt={companyInfo.metadata.company_name}
                className="relative rounded-2xl shadow-2xl"
                width={600}
                height={600}
              />
            )}
          </div>
        </div>
      </div>
    </section>
  )
}