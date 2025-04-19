import React from 'react'
import Link from 'next/link'
import ProjectCard from './ProjectCard'

// Sample data for featured projects
const featuredProjects = [
  {
    id: "1",
    title: "Personal Photography Portfolio",
    image: "https://images.unsplash.com/photo-1493863641943-9a9eaaaef7ca?ixlib=rb-1.2.1&auto=format&fit=crop&w=739&q=80",
    description: "A clean, minimal portfolio showcasing urban photography and street art from across Europe.",
    tags: ["Photography", "Art", "Design"],
    author: {
      name: "Alex Morgan",
      avatar: "https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-1.2.1&auto=format&fit=crop&w=100&q=80",
      id: "alex123"
    }
  },
  {
    id: "2",
    title: "Financial Dashboard UI",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
    description: "A responsive dashboard for tracking investments, expenses, and financial goals with data visualization.",
    tags: ["UI/UX", "Dashboard", "Data Visualization", "Finance"],
    author: {
      name: "Samantha Chen",
      avatar: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?ixlib=rb-1.2.1&auto=format&fit=crop&w=100&q=80",
      id: "samchen"
    }
  },
  {
    id: "3",
    title: "Mobile App Development Portfolio",
    image: "https://images.unsplash.com/photo-1555774698-0b77e0d5fac6?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
    description: "A showcase of iOS and Android applications developed over the past five years, including case studies and user testimonials.",
    tags: ["Mobile", "iOS", "Android", "UX", "Development"],
    author: {
      name: "David Wilson",
      avatar: "https://images.unsplash.com/photo-1599566150163-29194dcaad36?ixlib=rb-1.2.1&auto=format&fit=crop&w=100&q=80",
      id: "davidw"
    }
  }
]

const FeaturedProjects: React.FC = () => {
  return (
    <section className="py-16 bg-gray-50">
      <div className="container-custom">
        <div className="flex justify-between items-end mb-10">
          <div>
            <h2 className="text-3xl font-bold text-dark">
              Featured Projects
            </h2>
            <p className="text-lg text-gray-600 mt-2">
              Explore some of the standout portfolios created with our platform
            </p>
          </div>
          <Link
            href="/explore"
            className="text-primary font-medium hover:text-secondary transition-colors"
            tabIndex={0}
          >
            View all projects →
          </Link>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {featuredProjects.map((project) => (
            <ProjectCard key={project.id} {...project} />
          ))}
        </div>
      </div>
    </section>
  )
}

export default FeaturedProjects
