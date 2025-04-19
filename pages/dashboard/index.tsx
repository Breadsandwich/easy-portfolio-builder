import React, { useState } from 'react';
import { NextPage } from 'next';
import Head from 'next/head';
import Link from 'next/link';
import Layout from '../../components/Layout';

interface MediaItem {
  id: string;
  type: 'image' | 'video' | 'pdf' | 'document';
  url: string;
  thumbnailUrl?: string;
  originalFilename: string;
  fileSize: number;
  mimeType: string;
  metadata?: Record<string, any>;
  order: number;
}

interface Project {
  id: string;
  title: string;
  description: string;
  image: string;
  views: number;
  lastUpdated: string;
  mediaType?: 'image' | 'video' | 'pdf' | 'document';
  thumbnail?: string;
  mediaItems?: MediaItem[];
}

// Mock user data
const userData = {
  name: 'John Doe',
  email: 'john@example.com',
  avatar: 'https://randomuser.me/api/portraits/men/32.jpg',
  username: 'johndoe',
  projects: [
    {
      id: '1',
      title: 'Personal Photography Portfolio',
      description: 'A clean, minimal portfolio showcasing urban photography.',
      image: 'https://images.pexels.com/photos/1779487/pexels-photo-1779487.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      views: 245,
      lastUpdated: '2023-05-15T10:30:00Z',
      mediaType: 'image'
    },
    {
      id: '2',
      title: 'E-commerce UI Redesign',
      description: 'A complete redesign of an e-commerce website focusing on user experience.',
      image: 'https://images.pexels.com/photos/6177645/pexels-photo-6177645.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      views: 187,
      lastUpdated: '2023-06-02T14:45:00Z',
      mediaType: 'image'
    },
    {
      id: '3',
      title: 'Mobile App Development',
      description: 'A showcase of mobile applications developed over the past year.',
      image: 'https://images.pexels.com/photos/14936127/pexels-photo-14936127.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      views: 320,
      lastUpdated: '2023-06-10T09:15:00Z',
      mediaType: 'video',
      thumbnail: 'https://images.pexels.com/photos/14936127/pexels-photo-14936127.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      mediaItems: [
        {
          id: 'v1',
          type: 'video',
          url: 'https://example.com/video.mp4',
          thumbnailUrl: 'https://images.pexels.com/photos/14936127/pexels-photo-14936127.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
          originalFilename: 'demo.mp4',
          fileSize: 15000000,
          mimeType: 'video/mp4',
          order: 1
        }
      ]
    },
    {
      id: '4',
      title: 'AI-Powered Task Manager',
      description: 'A modern task management application leveraging artificial intelligence for smart prioritization and scheduling.',
      image: 'https://images.pexels.com/photos/8566472/pexels-photo-8566472.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      views: 412,
      lastUpdated: '2024-02-28T16:20:00Z',
      mediaType: 'pdf',
      mediaItems: [
        {
          id: 'p1',
          type: 'pdf',
          url: 'https://example.com/presentation.pdf',
          thumbnailUrl: 'https://example.com/presentation-thumb.jpg',
          originalFilename: 'AI-TaskManager-Presentation.pdf',
          fileSize: 2500000,
          mimeType: 'application/pdf',
          order: 1
        }
      ]
    },
    {
      id: '5',
      title: 'Sustainable Living Blog',
      description: 'A minimalist blog design focused on sustainable living and eco-friendly lifestyle tips.',
      image: 'https://images.pexels.com/photos/5086489/pexels-photo-5086489.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      views: 289,
      lastUpdated: '2024-03-15T11:45:00Z',
      mediaType: 'document',
      mediaItems: [
        {
          id: 'd1',
          type: 'document',
          url: 'https://example.com/whitepaper.docx',
          thumbnailUrl: 'https://example.com/whitepaper-thumb.jpg',
          originalFilename: 'Sustainability-Whitepaper.docx',
          fileSize: 1800000,
          mimeType: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
          order: 1
        }
      ]
    }
  ],
  analytics: {
    totalViews: 752,
    weeklyGrowth: 15,
    topReferrer: 'LinkedIn'
  }
};

// Format date to a readable string
const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric'
  });
};

const Dashboard: NextPage = () => {
  const [activeTab, setActiveTab] = useState('projects');
  const [copySuccess, setCopySuccess] = useState('');
  const shareableUrl = typeof window !== 'undefined' ? `${window.location.origin}/${userData.username}` : `https://yourdomain.com/${userData.username}`;

  const handleDeleteProject = (projectId: string) => {
    // In a real app, this would call an API to delete the project
    console.log(`Delete project with ID: ${projectId}`);
    // Then update state or fetch updated data
  };

  const handleCopyUrl = async () => {
    try {
      await navigator.clipboard.writeText(shareableUrl);
      setCopySuccess('Copied!');
      setTimeout(() => setCopySuccess(''), 2000);
    } catch (err) {
      setCopySuccess('Failed to copy!');
      setTimeout(() => setCopySuccess(''), 2000);
    }
  };

  // Create a currentUser object to pass to Layout
  const currentUser = {
    username: userData.username,
    name: userData.name,
    avatar: userData.avatar
  };

  return (
    <Layout title="Dashboard - PortfolioPlatform" currentUser={currentUser}>
      <div className="bg-gray-50 min-h-screen">
        {/* Dashboard Navigation */}
        <div className="border-b border-gray-200 bg-white">
          <div className="container-custom">
            <div className="flex justify-between items-center">
              <nav className="-mb-px flex space-x-8">
                <button
                  className={`whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm ${
                    activeTab === 'projects'
                      ? 'border-primary text-primary'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                  onClick={() => setActiveTab('projects')}
                  aria-current={activeTab === 'projects' ? 'page' : undefined}
                >
                  Projects
                </button>
                <button
                  className={`whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm ${
                    activeTab === 'analytics'
                      ? 'border-primary text-primary'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                  onClick={() => setActiveTab('analytics')}
                  aria-current={activeTab === 'analytics' ? 'page' : undefined}
                >
                  Analytics
                </button>
                <button
                  className={`whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm ${
                    activeTab === 'settings'
                      ? 'border-primary text-primary'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                  onClick={() => setActiveTab('settings')}
                  aria-current={activeTab === 'settings' ? 'page' : undefined}
                >
                  Settings
                </button>
              </nav>

              {/* Share URL Section */}
              <div className="flex items-center">
                <div className="flex items-center">
                  <div className="relative">
                    <input
                      type="text"
                      value={shareableUrl}
                      readOnly
                      className="w-64 pr-10 py-1.5 text-sm text-gray-700 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary"
                      onClick={(e) => (e.target as HTMLInputElement).select()}
                      aria-label="Portfolio share URL"
                    />
                    <button
                      onClick={handleCopyUrl}
                      className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                      aria-label="Copy URL to clipboard"
                      tabIndex={0}
                    >
                      {copySuccess ? (
                        <svg className="h-4 w-4 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                      ) : (
                        <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                        </svg>
                      )}
                    </button>
                  </div>
                  <Link
                    href={`/${userData.username}`}
                    className="ml-2 px-2.5 py-1.5 border border-gray-300 rounded-md text-xs font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
                    tabIndex={0}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <span className="flex items-center">
                      <svg className="h-3.5 w-3.5 mr-1" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M11 3a1 1 0 100 2h2.586l-6.293 6.293a1 1 0 101.414 1.414L15 6.414V9a1 1 0 102 0V4a1 1 0 00-1-1h-5z" />
                        <path d="M5 5a2 2 0 00-2 2v8a2 2 0 002 2h8a2 2 0 002-2v-3a1 1 0 10-2 0v3H5V7h3a1 1 0 000-2H5z" />
                      </svg>
                      View
                    </span>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Dashboard Content */}
        <div className="container-custom py-8">
          {/* Projects Tab */}
          {activeTab === 'projects' && (
            <div>
              <h2 className="text-xl font-semibold text-gray-900 mb-6">Your Projects</h2>

              {userData.projects.length === 0 ? (
                <div className="bg-white rounded-lg shadow-sm p-6 text-center">
                  <p className="text-gray-500 mb-4">You haven't created any projects yet.</p>
                  <Link
                    href="/dashboard/projects/new"
                    className="px-4 py-2 border border-transparent rounded-md text-sm font-medium text-white bg-primary hover:bg-secondary focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
                    tabIndex={0}
                  >
                    Create Your First Project
                  </Link>
                </div>
              ) : (
                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                  {userData.projects.map((project) => (
                    <div key={project.id} className="bg-white rounded-lg shadow-sm overflow-hidden">
                      <div className="relative h-32">
                        <img
                          src={project.image}
                          alt={project.title}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="p-3">
                        <h3 className="text-base font-semibold text-gray-900 truncate">{project.title}</h3>
                        <p className="mt-0.5 text-sm text-gray-600 line-clamp-2">{project.description}</p>

                        <div className="mt-2 flex justify-between items-center text-xs text-gray-500">
                          <div>{project.views} views</div>
                          <div>Updated {formatDate(project.lastUpdated)}</div>
                        </div>

                        <div className="mt-2 flex justify-between">
                          <Link
                            href={`/dashboard/projects/${project.id}`}
                            className="text-primary hover:text-secondary font-medium text-sm"
                            tabIndex={0}
                          >
                            Edit
                          </Link>
                          <button
                            onClick={() => handleDeleteProject(project.id)}
                            className="text-red-600 hover:text-red-800 font-medium text-sm"
                            tabIndex={0}
                            aria-label={`Delete ${project.title}`}
                          >
                            Delete
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}

                  {/* Add New Project Card */}
                  <Link
                    href="/dashboard/projects/new"
                    className="block group"
                    tabIndex={0}
                  >
                    <div className="relative flex flex-col items-center justify-center h-full min-h-[240px] rounded-lg border-2 border-dashed border-gray-300 bg-white p-4 text-center hover:border-primary hover:bg-gray-50 transition-all duration-200 shadow-sm hover:shadow-md">
                      <div className="absolute inset-0 rounded-lg bg-white opacity-0 group-hover:opacity-5 transition-opacity duration-200"></div>
                      <div className="flex flex-col items-center space-y-2">
                        <div className="p-2 rounded-full bg-gray-50 group-hover:bg-gray-100 transition-colors duration-200">
                          <svg
                            className="h-8 w-8 text-gray-400 group-hover:text-primary transition-colors duration-200"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            aria-hidden="true"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M12 4v16m8-8H4"
                            />
                          </svg>
                        </div>
                        <div>
                          <span className="block text-sm font-medium text-gray-900 group-hover:text-primary transition-colors duration-200">
                            Add New Project
                          </span>
                          <span className="mt-0.5 block text-xs text-gray-500">
                            Create a new portfolio project
                          </span>
                        </div>
                      </div>
                    </div>
                  </Link>
                </div>
              )}
            </div>
          )}

          {/* Analytics Tab */}
          {activeTab === 'analytics' && (
            <div>
              <h2 className="text-xl font-semibold text-gray-900 mb-6">Analytics Overview</h2>

              <div className="grid gap-6 md:grid-cols-3">
                <div className="bg-white rounded-lg shadow-sm p-6">
                  <h3 className="text-sm font-medium text-gray-500 mb-1">Total Portfolio Views</h3>
                  <p className="text-3xl font-bold text-gray-900">{userData.analytics.totalViews}</p>
                </div>

                <div className="bg-white rounded-lg shadow-sm p-6">
                  <h3 className="text-sm font-medium text-gray-500 mb-1">Weekly Growth</h3>
                  <p className="text-3xl font-bold text-green-600">+{userData.analytics.weeklyGrowth}%</p>
                </div>

                <div className="bg-white rounded-lg shadow-sm p-6">
                  <h3 className="text-sm font-medium text-gray-500 mb-1">Top Referrer</h3>
                  <p className="text-3xl font-bold text-gray-900">{userData.analytics.topReferrer}</p>
                </div>
              </div>

              <div className="mt-8 bg-white rounded-lg shadow-sm p-6">
                <h3 className="text-lg font-medium text-gray-900 mb-4">Traffic Sources</h3>
                {/* Here you would typically include a chart */}
                <div className="h-64 flex items-center justify-center border border-gray-200 rounded-md bg-gray-50">
                  <p className="text-gray-500">Traffic source visualization will appear here</p>
                </div>
              </div>
            </div>
          )}

          {/* Settings Tab */}
          {activeTab === 'settings' && (
            <div>
              <h2 className="text-xl font-semibold text-gray-900 mb-6">Account Settings</h2>

              <div className="bg-white rounded-lg shadow-sm overflow-hidden">
                <div className="p-6 border-b border-gray-200">
                  <h3 className="text-lg font-medium text-gray-900">Portfolio Settings</h3>
                  <p className="mt-1 text-sm text-gray-500">Manage how your portfolio appears to others.</p>

                  <div className="mt-4 space-y-4">
                    <div>
                      <label htmlFor="portfolio-privacy" className="block text-sm font-medium text-gray-700">
                        Portfolio Privacy
                      </label>
                      <select
                        id="portfolio-privacy"
                        name="portfolio-privacy"
                        className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-primary focus:border-primary rounded-md"
                      >
                        <option>Public</option>
                        <option>Private</option>
                        <option>Password Protected</option>
                      </select>
                    </div>

                    <div>
                      <label htmlFor="custom-domain" className="block text-sm font-medium text-gray-700">
                        Custom Domain
                      </label>
                      <div className="mt-1 flex rounded-md shadow-sm">
                        <input
                          type="text"
                          name="custom-domain"
                          id="custom-domain"
                          className="focus:ring-primary focus:border-primary flex-1 block w-full rounded-md border-gray-300"
                          placeholder="yourdomain.com"
                        />
                      </div>
                      <p className="mt-1 text-sm text-gray-500">
                        Enter a domain you own to use for your portfolio.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="p-6 border-b border-gray-200">
                  <h3 className="text-lg font-medium text-gray-900">Password</h3>
                  <p className="mt-1 text-sm text-gray-500">Update your password to keep your account secure.</p>

                  <form className="mt-4 space-y-4">
                    <div>
                      <label htmlFor="current-password" className="block text-sm font-medium text-gray-700">
                        Current Password
                      </label>
                      <input
                        type="password"
                        name="current-password"
                        id="current-password"
                        className="mt-1 focus:ring-primary focus:border-primary block w-full shadow-sm border-gray-300 rounded-md"
                      />
                    </div>

                    <div>
                      <label htmlFor="new-password" className="block text-sm font-medium text-gray-700">
                        New Password
                      </label>
                      <input
                        type="password"
                        name="new-password"
                        id="new-password"
                        className="mt-1 focus:ring-primary focus:border-primary block w-full shadow-sm border-gray-300 rounded-md"
                      />
                    </div>

                    <div>
                      <label htmlFor="confirm-password" className="block text-sm font-medium text-gray-700">
                        Confirm New Password
                      </label>
                      <input
                        type="password"
                        name="confirm-password"
                        id="confirm-password"
                        className="mt-1 focus:ring-primary focus:border-primary block w-full shadow-sm border-gray-300 rounded-md"
                      />
                    </div>

                    <div>
                      <button
                        type="submit"
                        className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-primary hover:bg-secondary focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
                      >
                        Update Password
                      </button>
                    </div>
                  </form>
                </div>

                <div className="p-6">
                  <h3 className="text-lg font-medium text-gray-900">Account Deletion</h3>
                  <p className="mt-1 text-sm text-gray-500">
                    Once you delete your account, there is no going back. Please be certain.
                  </p>

                  <div className="mt-4">
                    <button
                      type="button"
                      className="inline-flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                    >
                      Delete Account
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default Dashboard;
