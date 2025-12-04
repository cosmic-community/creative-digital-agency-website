'use client'

import { useRouter } from 'next/navigation'

interface CategoryFilterProps {
  currentCategory: string
}

const categories = [
  { key: 'all', value: 'All Projects' },
  { key: 'web-design', value: 'Web Design' },
  { key: 'branding', value: 'Branding' },
  { key: 'digital-marketing', value: 'Digital Marketing' },
  { key: 'mobile-app', value: 'Mobile App' },
]

export default function CategoryFilter({ currentCategory }: CategoryFilterProps) {
  const router = useRouter()
  
  const handleCategoryChange = (category: string) => {
    if (category === 'all') {
      router.push('/portfolio')
    } else {
      router.push(`/portfolio?category=${category}`)
    }
  }
  
  return (
    <div className="flex flex-wrap justify-center gap-3">
      {categories.map((category) => (
        <button
          key={category.key}
          onClick={() => handleCategoryChange(category.key)}
          className={`px-6 py-2 rounded-full font-medium transition-colors ${
            currentCategory === category.key
              ? 'bg-primary text-white'
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          }`}
        >
          {category.value}
        </button>
      ))}
    </div>
  )
}