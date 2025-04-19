import React from 'react'
import Link from 'next/link'

interface ProjectCardProps {
  id: string
  title: string
  image: string
  description: string
  tags: string[]
  author: {
    name: string
    avatar: string
    id: string
  }
}

const ProjectCard: React.FC<ProjectCardProps> = ({
  id,
  title,
  image,
  description,
  tags,
  author,
}) => {
  const handleKeyDown = (e: React.KeyboardEvent, href: string) => {
    if (e.key === 'Enter' || e.key === ' ') {
      window.location.href = href
    }
  }

  return (
    <div
      className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow"
      tabIndex={0}
      onKeyDown={(e) => handleKeyDown(e, `/projects/${id}`)}
      aria-label={`Project: ${title} by ${author.name}`}
    >
      <Link href={`/projects/${id}`} className="block">
        <div className="relative pb-[60%]">
          <img
            src={image}
            alt={title}
            className="absolute h-full w-full object-cover"
          />
        </div>
      </Link>

      <div className="p-5">
        <Link href={`/projects/${id}`} className="block">
          <h3 className="text-xl font-bold mb-2 hover:text-primary transition-colors">{title}</h3>
        </Link>

        <p className="text-gray-600 mb-4 line-clamp-2 overflow-hidden text-ellipsis">{description}</p>

        <div className="flex flex-wrap gap-2 mb-4">
          {tags.slice(0, 3).map((tag, index) => (
            <span
              key={index}
              className="bg-gray-100 text-gray-700 text-xs px-2 py-1 rounded-full"
            >
              {tag}
            </span>
          ))}
          {tags.length > 3 && (
            <span className="text-gray-500 text-xs px-2 py-1">
              +{tags.length - 3} more
            </span>
          )}
        </div>

        <div className="flex items-center pt-3 border-t border-gray-100">
          <Link href={`/users/${author.id}`}>
            <div className="flex items-center">
              <img
                src={author.avatar}
                alt={author.name}
                className="w-8 h-8 rounded-full mr-2 object-cover"
              />
              <span className="text-sm font-medium text-gray-700">{author.name}</span>
            </div>
          </Link>
        </div>
      </div>
    </div>
  )
}

export default ProjectCard
