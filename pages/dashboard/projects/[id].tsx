import React, { useState, useEffect } from 'react';
import { NextPage } from 'next';
import { useRouter } from 'next/router';
import Link from 'next/link';
import Layout from '../../../components/Layout';

// Mock project data - in a real app, this would come from an API
const mockProjects = {
  '1': {
    id: '1',
    title: 'Personal Photography Portfolio',
    description: 'A clean, minimal portfolio showcasing urban photography and street art from across Europe.',
    image: 'https://images.pexels.com/photos/1779487/pexels-photo-1779487.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    tags: ['Photography', 'Art', 'Design'],
    link: 'https://example.com/photography',
    isPublished: true
  },
  '2': {
    id: '2',
    title: 'E-commerce UI Redesign',
    description: 'A complete redesign of an e-commerce website focusing on user experience and conversion optimization.',
    image: 'https://images.pexels.com/photos/6177645/pexels-photo-6177645.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    tags: ['UI/UX', 'E-commerce', 'Web Design'],
    link: 'https://example.com/ecommerce-redesign',
    isPublished: true
  },
  '3': {
    id: '3',
    title: 'Mobile App Development',
    description: 'A showcase of mobile applications developed over the past year, including case studies and user feedback.',
    image: 'https://images.pexels.com/photos/14936127/pexels-photo-14936127.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    tags: ['Mobile', 'iOS', 'Android', 'Development'],
    link: 'https://example.com/mobile-apps',
    isPublished: false
  }
};

interface ProjectFormData {
  title: string;
  description: string;
  image: string;
  tags: string;
  link: string;
  isPublished: boolean;
}

const ProjectEdit: NextPage = () => {
  const router = useRouter();
  const { id } = router.query;
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [formData, setFormData] = useState<ProjectFormData>({
    title: '',
    description: '',
    image: '',
    tags: '',
    link: '',
    isPublished: false
  });
  const [errors, setErrors] = useState<Partial<ProjectFormData>>({});

  // Mock user for layout
  const currentUser = {
    username: 'johndoe',
    name: 'John Doe',
    avatar: 'https://randomuser.me/api/portraits/men/32.jpg'
  };

  // Fetch project data when component mounts
  useEffect(() => {
    if (id && typeof id === 'string') {
      // In a real app, you would fetch data from the API
      const project = mockProjects[id];
      if (project) {
        setFormData({
          title: project.title,
          description: project.description,
          image: project.image,
          tags: project.tags.join(', '),
          link: project.link || '',
          isPublished: project.isPublished
        });
      }
      setIsLoading(false);
    }
  }, [id]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value, type } = e.target;

    setFormData({
      ...formData,
      [name]: type === 'checkbox'
        ? (e.target as HTMLInputElement).checked
        : value
    });

    // Clear errors when user types
    if (errors[name as keyof typeof errors]) {
      setErrors({
        ...errors,
        [name]: ''
      });
    }
  };

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target;
    setFormData({
      ...formData,
      [name]: checked
    });
  };

  const validateForm = () => {
    const newErrors: Partial<ProjectFormData> = {};
    let isValid = true;

    if (!formData.title.trim()) {
      newErrors.title = 'Title is required';
      isValid = false;
    }

    if (!formData.description.trim()) {
      newErrors.description = 'Description is required';
      isValid = false;
    }

    if (!formData.image.trim()) {
      newErrors.image = 'Image URL is required';
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsSaving(true);

    try {
      // In a real app, this would be an API call to update the project
      console.log('Saving project:', formData);

      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));

      // Redirect back to dashboard
      router.push('/dashboard');
    } catch (error) {
      console.error('Error saving project:', error);
      // Handle error state
    } finally {
      setIsSaving(false);
    }
  };

  if (isLoading) {
    return (
      <Layout title="Loading Project - PortfolioPlatform" currentUser={currentUser}>
        <div className="container-custom py-12 min-h-screen">
          <div className="flex justify-center items-center h-64">
            <div className="text-center">
              <p className="text-gray-500">Loading project...</p>
            </div>
          </div>
        </div>
      </Layout>
    );
  }

  if (!mockProjects[id as string]) {
    return (
      <Layout title="Project Not Found - PortfolioPlatform" currentUser={currentUser}>
        <div className="container-custom py-12 min-h-screen">
          <div className="bg-white shadow rounded-lg p-6 text-center">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Project Not Found</h2>
            <p className="text-gray-600 mb-6">The project you are looking for does not exist or has been removed.</p>
            <Link
              href="/dashboard"
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-primary hover:bg-secondary focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
              tabIndex={0}
            >
              Return to Dashboard
            </Link>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout title={`Edit ${formData.title} - PortfolioPlatform`} currentUser={currentUser}>
      <div className="bg-gray-50 min-h-screen">
        <div className="container-custom py-8">
          <div className="bg-white shadow rounded-lg overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-200">
              <div className="flex justify-between items-center">
                <h1 className="text-2xl font-bold text-gray-900">Edit Project</h1>
                <Link
                  href="/dashboard"
                  className="text-gray-600 hover:text-gray-900 font-medium"
                  tabIndex={0}
                >
                  Back to Dashboard
                </Link>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="p-6">
              <div className="space-y-6">
                <div>
                  <label htmlFor="title" className="block text-sm font-medium text-gray-700">
                    Project Title
                  </label>
                  <input
                    type="text"
                    name="title"
                    id="title"
                    value={formData.title}
                    onChange={handleChange}
                    className="mt-1 block w-full shadow-sm focus:ring-primary focus:border-primary border-2 border-gray-400 rounded-md"
                    aria-invalid={errors.title ? 'true' : 'false'}
                    aria-describedby={errors.title ? 'title-error' : undefined}
                  />
                  {errors.title && (
                    <p className="mt-2 text-sm text-red-600" id="title-error">
                      {errors.title}
                    </p>
                  )}
                </div>

                <div>
                  <label htmlFor="description" className="block text-sm font-medium text-gray-700">
                    Description
                  </label>
                  <textarea
                    id="description"
                    name="description"
                    rows={4}
                    value={formData.description}
                    onChange={handleChange}
                    className="mt-1 block w-full shadow-sm focus:ring-primary focus:border-primary border-2 border-gray-400 rounded-md"
                    aria-invalid={errors.description ? 'true' : 'false'}
                    aria-describedby={errors.description ? 'description-error' : undefined}
                  ></textarea>
                  {errors.description && (
                    <p className="mt-2 text-sm text-red-600" id="description-error">
                      {errors.description}
                    </p>
                  )}
                </div>

                <div>
                  <label htmlFor="image" className="block text-sm font-medium text-gray-700">
                    Image URL
                  </label>
                  <input
                    type="url"
                    name="image"
                    id="image"
                    value={formData.image}
                    onChange={handleChange}
                    className="mt-1 block w-full shadow-sm focus:ring-primary focus:border-primary border-2 border-gray-400 rounded-md"
                    aria-invalid={errors.image ? 'true' : 'false'}
                    aria-describedby={errors.image ? 'image-error' : undefined}
                  />
                  {errors.image && (
                    <p className="mt-2 text-sm text-red-600" id="image-error">
                      {errors.image}
                    </p>
                  )}
                  {formData.image && (
                    <div className="mt-2">
                      <p className="text-sm text-gray-500 mb-2">Preview:</p>
                      <img
                        src={formData.image}
                        alt="Project preview"
                        className="h-40 w-auto object-cover rounded-md"
                        onError={(e) => {
                          const target = e.target as HTMLImageElement;
                          target.onerror = null;
                          target.src = 'https://via.placeholder.com/300x200?text=Invalid+Image+URL';
                        }}
                      />
                    </div>
                  )}
                </div>

                <div>
                  <label htmlFor="tags" className="block text-sm font-medium text-gray-700">
                    Tags (comma separated)
                  </label>
                  <input
                    type="text"
                    name="tags"
                    id="tags"
                    value={formData.tags}
                    onChange={handleChange}
                    className="mt-1 block w-full shadow-sm focus:ring-primary focus:border-primary border-2 border-gray-400 rounded-md"
                    aria-invalid={errors.tags ? 'true' : 'false'}
                    aria-describedby={errors.tags ? 'tags-error' : undefined}
                  />
                  <p className="mt-1 text-sm text-gray-500">
                    Separate tags with commas. These help users find your project.
                  </p>
                </div>

                <div>
                  <label htmlFor="link" className="block text-sm font-medium text-gray-700">
                    Project Link (optional)
                  </label>
                  <input
                    type="url"
                    name="link"
                    id="link"
                    value={formData.link}
                    onChange={handleChange}
                    className="mt-1 block w-full shadow-sm focus:ring-primary focus:border-primary border-2 border-gray-400 rounded-md"
                    aria-invalid={errors.link ? 'true' : 'false'}
                    aria-describedby={errors.link ? 'link-error' : undefined}
                  />
                </div>

                <div className="flex items-start">
                  <div className="flex items-center h-5">
                    <input
                      id="isPublished"
                      name="isPublished"
                      type="checkbox"
                      checked={formData.isPublished}
                      onChange={handleCheckboxChange}
                      className="focus:ring-primary h-4 w-4 text-primary border-gray-300 rounded"
                    />
                  </div>
                  <div className="ml-3 text-sm">
                    <label htmlFor="isPublished" className="font-medium text-gray-700">
                      Publish this project
                    </label>
                    <p className="text-gray-500">
                      When checked, this project will be visible on your public portfolio.
                    </p>
                  </div>
                </div>
              </div>

              <div className="mt-8 flex justify-end space-x-3">
                <Link
                  href="/dashboard"
                  className="inline-flex justify-center py-2 px-4 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
                  tabIndex={0}
                >
                  Cancel
                </Link>
                <button
                  type="submit"
                  disabled={isSaving}
                  className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-primary hover:bg-secondary focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary disabled:opacity-50 disabled:cursor-not-allowed"
                  aria-busy={isSaving}
                >
                  {isSaving ? 'Saving...' : 'Save Project'}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default ProjectEdit;
