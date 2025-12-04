import { getCompanyInfo, getTeamMembers } from '@/lib/cosmic'
import TeamMemberCard from '@/components/TeamMemberCard'

export const metadata = {
  title: 'About Us - Creative Digital Agency',
  description: 'Learn about Creative Digital Agency, our mission, values, and the team behind our success.',
}

export const revalidate = 60

export default async function AboutPage() {
  const [companyInfo, team] = await Promise.all([
    getCompanyInfo(),
    getTeamMembers()
  ])
  
  if (!companyInfo) {
    return (
      <div className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-xl text-gray-600">Company information not available.</p>
        </div>
      </div>
    )
  }
  
  return (
    <div className="py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Company header */}
        <div className="text-center mb-16">
          {companyInfo.metadata.company_logo && (
            <img
              src={`${companyInfo.metadata.company_logo.imgix_url}?w=200&h=200&fit=crop&auto=format,compress`}
              alt={companyInfo.metadata.company_name}
              className="w-32 h-32 mx-auto mb-6 rounded-full object-cover"
              width={200}
              height={200}
            />
          )}
          <h1 className="text-5xl font-bold text-gray-900 mb-4">
            {companyInfo.metadata.company_name}
          </h1>
          {companyInfo.metadata.tagline && (
            <p className="text-2xl text-gray-600">{companyInfo.metadata.tagline}</p>
          )}
        </div>
        
        {/* About section */}
        {companyInfo.metadata.about && (
          <div className="max-w-4xl mx-auto mb-20">
            <div
              className="prose-custom text-lg"
              dangerouslySetInnerHTML={{ __html: companyInfo.metadata.about }}
            />
          </div>
        )}
        
        {/* Company values */}
        {companyInfo.metadata.company_values && companyInfo.metadata.company_values.length > 0 && (
          <div className="mb-20">
            <h2 className="text-4xl font-bold text-gray-900 text-center mb-12">Our Values</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {companyInfo.metadata.company_values.map((value, index) => (
                <div key={index} className="text-center p-6">
                  <div className="w-16 h-16 bg-primary text-white rounded-full flex items-center justify-center mx-auto mb-4 text-2xl font-bold">
                    {index + 1}
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">{value.title}</h3>
                  <p className="text-gray-600">{value.description}</p>
                </div>
              ))}
            </div>
          </div>
        )}
        
        {/* Team section */}
        <div>
          <h2 className="text-4xl font-bold text-gray-900 text-center mb-12">Our Team</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {team.map((member) => (
              <TeamMemberCard key={member.id} member={member} />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}