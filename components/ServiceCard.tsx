import type { Service } from '@/types'

interface ServiceCardProps {
  service: Service
}

export default function ServiceCard({ service }: ServiceCardProps) {
  return (
    <div className="bg-white rounded-lg p-8 shadow-sm hover:shadow-md transition-shadow">
      {service.metadata.service_icon && (
        <div className="w-16 h-16 mb-6 rounded-lg overflow-hidden">
          <img
            src={`${service.metadata.service_icon.imgix_url}?w=64&h=64&fit=crop&auto=format,compress`}
            alt={service.metadata.service_name}
            className="w-full h-full object-cover"
            width={64}
            height={64}
          />
        </div>
      )}
      
      <h3 className="text-2xl font-bold text-gray-900 mb-3">
        {service.metadata.service_name}
      </h3>
      
      <p className="text-gray-600 mb-6">
        {service.metadata.short_description}
      </p>
      
      {service.metadata.features && service.metadata.features.length > 0 && (
        <ul className="space-y-2 mb-6">
          {service.metadata.features.slice(0, 3).map((feature, index) => (
            <li key={index} className="flex items-center text-gray-700">
              <svg className="w-5 h-5 text-primary mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              {feature}
            </li>
          ))}
        </ul>
      )}
      
      {service.metadata.starting_price && (
        <p className="text-primary font-semibold text-lg">
          Starting at {service.metadata.starting_price}
        </p>
      )}
    </div>
  )
}