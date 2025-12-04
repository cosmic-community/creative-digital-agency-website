import type { Testimonial } from '@/types'

interface TestimonialCardProps {
  testimonial: Testimonial
}

export default function TestimonialCard({ testimonial }: TestimonialCardProps) {
  const rating = parseInt(testimonial.metadata.rating.key)
  
  return (
    <div className="bg-white rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow">
      {/* Rating stars */}
      <div className="flex text-yellow-400 mb-4">
        {Array.from({ length: 5 }, (_, index) => (
          <svg
            key={index}
            className={`w-5 h-5 ${index < rating ? 'text-yellow-400' : 'text-gray-300'}`}
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path
              fillRule="evenodd"
              d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z"
              clipRule="evenodd"
            />
          </svg>
        ))}
      </div>
      
      {/* Testimonial text */}
      <p className="text-gray-700 mb-6 italic">
        "{testimonial.metadata.testimonial}"
      </p>
      
      {/* Client info */}
      <div className="flex items-center gap-4">
        {testimonial.metadata.client_photo && (
          <img
            src={`${testimonial.metadata.client_photo.imgix_url}?w=96&h=96&fit=crop&auto=format,compress`}
            alt={testimonial.metadata.client_name}
            className="w-12 h-12 rounded-full object-cover"
            width={96}
            height={96}
          />
        )}
        
        <div>
          <p className="font-semibold text-gray-900">
            {testimonial.metadata.client_name}
          </p>
          <p className="text-sm text-gray-600">
            {testimonial.metadata.client_role && `${testimonial.metadata.client_role}, `}
            {testimonial.metadata.client_company}
          </p>
        </div>
      </div>
      
      {/* Company logo */}
      {testimonial.metadata.company_logo && (
        <div className="mt-4 pt-4 border-t border-gray-200">
          <img
            src={`${testimonial.metadata.company_logo.imgix_url}?w=200&h=60&fit=crop&auto=format,compress`}
            alt={testimonial.metadata.client_company}
            className="h-8 w-auto opacity-50"
            width={200}
            height={60}
          />
        </div>
      )}
    </div>
  )
}