import React, { useState, useEffect } from 'react';
import { NextPage } from 'next';
import { useRouter } from 'next/router';
import Head from 'next/head';
import Link from 'next/link';
import Layout from '../components/Layout';
import { ContactForm } from '../components/ContactForm';

// Mock user data - in a real app, this would come from an API
const mockUsers = {
  'johndoe': {
    id: '1',
    name: 'John Doe',
    username: 'johndoe',
    bio: 'Experienced UX designer and front-end developer with a passion for creating intuitive and beautiful web experiences.',
    avatar: 'https://randomuser.me/api/portraits/men/32.jpg',
    location: 'San Francisco, CA',
    website: 'https://johndoe.com',
    socialLinks: {
      twitter: 'johndoe',
      linkedin: 'john-doe',
      github: 'johndoe',
      dribbble: 'johndoe',
      behance: ''
    },
    projects: [
      {
        id: '1',
        title: 'Personal Photography Portfolio',
        description: 'A clean, minimal portfolio showcasing urban photography and street art from across Europe.',
        image: 'https://images.pexels.com/photos/1779487/pexels-photo-1779487.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
        tags: ['Photography', 'Art', 'Design'],
        link: 'https://example.com/photography',
        isPublished: true
      },
      {
        id: '2',
        title: 'E-commerce UI Redesign',
        description: 'A complete redesign of an e-commerce website focusing on user experience and conversion optimization.',
        image: 'https://images.pexels.com/photos/6177645/pexels-photo-6177645.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
        tags: ['UI/UX', 'E-commerce', 'Web Design'],
        link: 'https://example.com/ecommerce-redesign',
        isPublished: true
      }
    ]
  },
  'janedoe': {
    name: 'Jane Doe',
    username: 'janedoe',
    bio: 'Visual designer and illustrator specializing in brand identity and digital media.',
    avatar: 'https://randomuser.me/api/portraits/women/44.jpg',
    location: 'New York, NY',
    website: 'https://janedoe.com',
    socialLinks: {
      twitter: 'janedoe',
      linkedin: 'jane-doe',
      github: 'janedoe',
      dribbble: 'janedoe',
      behance: 'janedoe'
    },
    projects: [
      {
        id: '1',
        title: 'Brand Identity for Tech Startup',
        description: 'Complete brand identity design including logo, color palette, typography, and brand guidelines.',
        image: 'https://images.pexels.com/photos/6444/pencil-typography-black-design.jpg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
        tags: ['Branding', 'Logo Design', 'Typography'],
        link: 'https://example.com/branding',
        isPublished: true
      }
    ]
  }
};

const UserPortfolio: NextPage = () => {
  const router = useRouter();
  const { username } = router.query;
  const [user, setUser] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('projects');

  useEffect(() => {
    if (username && typeof username === 'string') {
      // In a real app, this would be an API call to fetch user data
      const userData = mockUsers[username];
      setUser(userData || null);
      setIsLoading(false);
    }
  }, [username]);

  if (isLoading) {
    return (
      <Layout title="Loading...">
        <div className="flex justify-center items-center min-h-screen">
          <p className="text-gray-500">Loading profile...</p>
        </div>
      </Layout>
    );
  }

  if (!user) {
    return (
      <Layout title="User Not Found">
        <div className="container-custom py-20 text-center">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">User Not Found</h1>
          <p className="text-gray-600 mb-8">The user you're looking for doesn't exist or has been removed.</p>
          <Link
            href="/"
            className="px-4 py-2 bg-primary text-white rounded-md hover:bg-secondary focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
            tabIndex={0}
          >
            Return to Home
          </Link>
        </div>
      </Layout>
    );
  }

  // Filter only published projects
  const publishedProjects = user.projects.filter((project: any) => project.isPublished);

  return (
    <>
      <Head>
        <title>{user.name} - Portfolio</title>
        <meta name="description" content={user.bio} />
        <meta property="og:title" content={`${user.name} - Portfolio`} />
        <meta property="og:description" content={user.bio} />
        <meta property="og:image" content={user.avatar} />
        <meta property="og:type" content="profile" />
        <meta property="og:url" content={`https://portfolio.io/${user.username}`} />
      </Head>

      <div className="bg-gray-50 min-h-screen">
        {/* Hero section with user info */}
        <header className="bg-white shadow-sm py-16">
          <div className="container-custom">
            <div className="flex flex-col md:flex-row items-center">
              <img
                src={user.avatar}
                alt={user.name}
                className="w-32 h-32 rounded-full object-cover border-4 border-white shadow-lg mb-6 md:mb-0 md:mr-8"
              />
              <div className="text-center md:text-left">
                <h1 className="text-3xl font-bold text-gray-900">{user.name}</h1>
                <p className="text-xl text-gray-600 mt-2 max-w-2xl">{user.bio}</p>

                <div className="mt-4 flex flex-wrap items-center justify-center md:justify-start text-gray-600">
                  {user.location && (
                    <div className="flex items-center mr-6 mb-2">
                      <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                      </svg>
                      <span>{user.location}</span>
                    </div>
                  )}

                  {user.website && (
                    <div className="flex items-center mr-6 mb-2">
                      <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M12.586 4.586a2 2 0 112.828 2.828l-3 3a2 2 0 01-2.828 0 1 1 0 00-1.414 1.414 4 4 0 005.656 0l3-3a4 4 0 00-5.656-5.656l-1.5 1.5a1 1 0 101.414 1.414l1.5-1.5zm-5 5a2 2 0 012.828 0 1 1 0 101.414-1.414 4 4 0 00-5.656 0l-3 3a4 4 0 105.656 5.656l1.5-1.5a1 1 0 10-1.414-1.414l-1.5 1.5a2 2 0 11-2.828-2.828l3-3z" clipRule="evenodd" />
                      </svg>
                      <a
                        href={user.website}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:text-primary"
                        tabIndex={0}
                      >
                        {user.website.replace(/^https?:\/\//, '')}
                      </a>
                    </div>
                  )}
                </div>

                {/* Social Links */}
                <div className="mt-6 flex items-center justify-center md:justify-start space-x-4">
                  {user.socialLinks.twitter && (
                    <a
                      href={`https://twitter.com/${user.socialLinks.twitter}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-gray-600 hover:text-blue-400"
                      aria-label="Twitter"
                      tabIndex={0}
                    >
                      <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723 10.014 10.014 0 01-3.127 1.196 4.925 4.925 0 00-8.390 4.492A13.955 13.955 0 011.64 3.164a4.925 4.925 0 001.522 6.57 4.902 4.902 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.924 4.924 0 01-2.22.084 4.926 4.926 0 004.598 3.417 9.871 9.871 0 01-6.101 2.105c-.4 0-.79-.023-1.178-.069a13.913 13.913 0 007.548 2.209c9.054 0 14-7.496 14-13.986 0-.21 0-.42-.015-.63a9.97 9.97 0 002.457-2.54z" />
                      </svg>
                    </a>
                  )}

                  {user.socialLinks.github && (
                    <a
                      href={`https://github.com/${user.socialLinks.github}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-gray-600 hover:text-gray-900"
                      aria-label="GitHub"
                      tabIndex={0}
                    >
                      <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                        <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.87 8.17 6.84 9.5.5.08.66-.23.66-.5v-1.69c-2.77.6-3.36-1.34-3.36-1.34-.46-1.16-1.11-1.47-1.11-1.47-.91-.62.07-.6.07-.6 1 .07 1.53 1.03 1.53 1.03.87 1.52 2.34 1.07 2.91.83.09-.65.35-1.09.63-1.34-2.22-.25-4.55-1.11-4.55-4.92 0-1.11.38-2 1.03-2.71-.1-.25-.45-1.29.1-2.64 0 0 .84-.27 2.75 1.02.79-.22 1.65-.33 2.5-.33.85 0 1.71.11 2.5.33 1.91-1.29 2.75-1.02 2.75-1.02.55 1.35.2 2.39.1 2.64.65.71 1.03 1.6 1.03 2.71 0 3.82-2.34 4.66-4.57 4.91.36.31.68.92.68 1.85V21c0 .27.16.59.67.5C19.14 20.16 22 16.42 22 12A10 10 0 0012 2z" />
                      </svg>
                    </a>
                  )}

                  {user.socialLinks.linkedin && (
                    <a
                      href={`https://linkedin.com/in/${user.socialLinks.linkedin}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-gray-600 hover:text-blue-700"
                      aria-label="LinkedIn"
                      tabIndex={0}
                    >
                      <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.454C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.225 0z" />
                      </svg>
                    </a>
                  )}

                  {user.socialLinks.dribbble && (
                    <a
                      href={`https://dribbble.com/${user.socialLinks.dribbble}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-gray-600 hover:text-pink-500"
                      aria-label="Dribbble"
                      tabIndex={0}
                    >
                      <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                        <path fillRule="evenodd" clipRule="evenodd" d="M12 24C5.385 24 0 18.615 0 12S5.385 0 12 0s12 5.385 12 12-5.385 12-12 12zm10.12-10.358c-.35-.11-3.17-.953-6.384-.438 1.34 3.684 1.887 6.684 1.992 7.308 2.3-1.555 3.936-4.02 4.395-6.87zm-6.115 7.808c-.153-.9-.75-4.032-2.19-7.77l-.066.02c-5.79 2.015-7.86 6.025-8.04 6.4 1.73 1.358 3.92 2.166 6.29 2.166 1.42 0 2.77-.29 4.01-.814zm-11.62-2.58c.232-.4 3.045-5.055 8.332-6.765.135-.045.27-.084.405-.12-.26-.585-.54-1.167-.832-1.74C7.17 11.775 2.206 11.71 1.756 11.7l-.004.312c0 2.633.998 5.037 2.634 6.855zm-2.42-8.955c.46.008 4.683.026 9.477-1.248-1.698-3.018-3.53-5.558-3.8-5.928-2.868 1.35-5.01 3.99-5.676 7.17zM9.6 2.052c.282.38 2.145 2.914 3.822 6 3.645-1.365 5.19-3.44 5.373-3.702-1.81-1.61-4.19-2.586-6.795-2.586-.825 0-1.63.1-2.4.285zm10.335 3.483c-.218.29-1.935 2.493-5.724 4.04.24.49.47.985.68 1.486.08.18.15.36.22.53 3.41-.43 6.8.26 7.14.33-.02-2.42-.88-4.64-2.31-6.38z" />
                      </svg>
                    </a>
                  )}

                  {user.socialLinks.behance && (
                    <a
                      href={`https://behance.net/${user.socialLinks.behance}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-gray-600 hover:text-blue-600"
                      aria-label="Behance"
                      tabIndex={0}
                    >
                      <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M7.803 5.296c.282 0 .533.04.763.12.23.08.427.198.594.351.166.154.296.351.387.59.092.239.138.522.138.85 0 .361-.085.66-.26.904-.173.243-.431.44-.772.594.465.135.816.368 1.05.7.235.331.353.73.353 1.194 0 .38-.072.7-.22.965-.146.267-.343.48-.59.635-.245.153-.526.264-.84.333-.314.07-.633.105-.95.105H2V5.296h5.804zm-.295 3.86c.34 0 .617-.072.828-.216.213-.144.32-.395.32-.755 0-.193-.036-.35-.108-.47a.799.799 0 00-.283-.282 1.168 1.168 0 00-.386-.136 2.434 2.434 0 00-.43-.038H4.25v1.898h3.258zm.173 4.045c.17 0 .333-.016.493-.05.16-.032.305-.086.43-.16.126-.075.226-.18.302-.32.072-.142.11-.323.11-.547 0-.435-.12-.742-.364-.923-.242-.18-.563-.27-.96-.27H4.25v2.27h3.432zm8.45-.714c.153.235.368.417.648.547.28.13.61.195.995.195.326 0 .61-.065.853-.195.244-.13.417-.271.519-.424h1.714c-.273.846-.687 1.45-1.244 1.813-.555.361-1.228.542-2.02.542-.55 0-1.044-.088-1.484-.266a3.316 3.316 0 01-1.13-.74 3.383 3.383 0 01-.723-1.13 3.997 3.997 0 01-.258-1.435c0-.505.086-.972.258-1.402.172-.43.418-.802.738-1.117.32-.315.7-.56 1.142-.734.44-.175.93-.263 1.47-.263.598 0 1.118.114 1.564.345.445.23.810.54 1.097.935.287.394.492.847.616 1.363.125.515.153 1.063.086 1.645h-5.12c0 .38.094.712.283.98zm2.252-3.203c-.124-.114-.266-.207-.426-.282-.16-.073-.354-.11-.58-.11-.226 0-.43.037-.614.11-.183.075-.34.173-.471.295a1.214 1.214 0 00-.319.427 1.68 1.68 0 00-.13.494h3.14c-.046-.385-.177-.678-.6-.934zM15.2 5.882h4.04v.976H15.2v-.976z" />
                      </svg>
                    </a>
                  )}
                </div>
              </div>
            </div>
          </div>
        </header>

        {/* Portfolio content */}
        <div className="container-custom py-12">
          {/* Projects and Contact Form */}
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Projects</h2>

            {publishedProjects.length === 0 ? (
              <div className="bg-white rounded-lg shadow-sm p-6 text-center">
                <p className="text-gray-500">This user hasn't published any projects yet.</p>
              </div>
            ) : (
              <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
                {publishedProjects.map((project: any) => (
                  <div key={project.id} className="bg-white rounded-lg shadow-sm overflow-hidden transition-transform hover:scale-[1.02]">
                    <div className="relative h-48">
                      <img
                        src={project.image}
                        alt={project.title}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="p-6">
                      <h3 className="text-xl font-semibold text-gray-900 mb-2">{project.title}</h3>
                      <p className="text-gray-600 mb-4 line-clamp-2 overflow-hidden text-ellipsis">{project.description}</p>

                      <div className="flex flex-wrap gap-2 mb-4">
                        {project.tags.map((tag: string) => (
                          <span
                            key={tag}
                            className="inline-block px-3 py-1 text-xs font-medium bg-gray-100 text-gray-800 rounded-full"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>

                      {project.link && (
                        <a
                          href={project.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center text-primary hover:text-secondary font-medium"
                          tabIndex={0}
                        >
                          View Project
                          <svg className="w-4 h-4 ml-1" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                          </svg>
                        </a>
                      )}
                    </div>
                  </div>
                ))}

                {/* Contact Form Card */}
                <div className="bg-white rounded-lg shadow-sm overflow-hidden transition-transform hover:scale-[1.02]">
                  <div className="p-6">
                    <h3 className="text-xl font-semibold text-gray-900 mb-4">Get in Touch</h3>
                    <ContactForm profileId={user.id} />
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default UserPortfolio;
