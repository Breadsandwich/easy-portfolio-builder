import React, { useState, useCallback } from 'react';
import { NextPage } from 'next';
import { useRouter } from 'next/router';
import Link from 'next/link';
import Layout from '../../../components/Layout';

interface MediaFile {
  id: string;
  file: File;
  type: 'image' | 'video' | 'pdf' | 'document';
  preview: string;
  progress: number;
}

interface ProjectFormData {
  title: string;
  description: string;
  tags: string;
  link: string;
  isPublished: boolean;
  mediaFiles: MediaFile[];
}

const NewProject: NextPage = () => {
  const router = useRouter();
  const [isSaving, setIsSaving] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [formData, setFormData] = useState<ProjectFormData>({
    title: '',
    description: '',
    tags: '',
    link: '',
    isPublished: true,
    mediaFiles: []
  });
  const [errors, setErrors] = useState<Partial<ProjectFormData>>({});

  // Mock user for layout
  const currentUser = {
    username: 'johndoe',
    name: 'John Doe',
    avatar: 'https://randomuser.me/api/portraits/men/32.jpg'
  };

  const getFileType = (file: File): 'image' | 'video' | 'pdf' | 'document' => {
    if (file.type.startsWith('image/')) return 'image';
    if (file.type.startsWith('video/')) return 'video';
    if (file.type === 'application/pdf') return 'pdf';
    return 'document';
  };

  const createFilePreview = (file: File): Promise<string> => {
    return new Promise((resolve) => {
      if (file.type.startsWith('image/')) {
        const reader = new FileReader();
        reader.onloadend = () => resolve(reader.result as string);
        reader.readAsDataURL(file);
      } else if (file.type.startsWith('video/')) {
        const video = document.createElement('video');
        video.preload = 'metadata';
        video.onloadedmetadata = () => {
          const canvas = document.createElement('canvas');
          canvas.width = video.videoWidth;
          canvas.height = video.videoHeight;
          const ctx = canvas.getContext('2d');
          ctx?.drawImage(video, 0, 0, canvas.width, canvas.height);
          resolve(canvas.toDataURL('image/jpeg'));
        };
        video.src = URL.createObjectURL(file);
      } else if (file.type === 'application/pdf') {
        resolve('/pdf-icon.png'); // You would need to add this icon to your public folder
      } else {
        resolve('/document-icon.png'); // You would need to add this icon to your public folder
      }
    });
  };

  const handleDragEnter = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  }, []);

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
  }, []);

  const handleDrop = useCallback(async (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);

    const files = Array.from(e.dataTransfer.files);
    const newMediaFiles: MediaFile[] = [];

    for (const file of files) {
      const preview = await createFilePreview(file);
      newMediaFiles.push({
        id: Math.random().toString(36).substr(2, 9),
        file,
        type: getFileType(file),
        preview,
        progress: 0
      });
    }

    setFormData(prev => ({
      ...prev,
      mediaFiles: [...prev.mediaFiles, ...newMediaFiles]
    }));
  }, []);

  const handleFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    const newMediaFiles: MediaFile[] = [];

    for (const file of files) {
      const preview = await createFilePreview(file);
      newMediaFiles.push({
        id: Math.random().toString(36).substr(2, 9),
        file,
        type: getFileType(file),
        preview,
        progress: 0
      });
    }

    setFormData(prev => ({
      ...prev,
      mediaFiles: [...prev.mediaFiles, ...newMediaFiles]
    }));
  };

  const removeFile = (id: string) => {
    setFormData(prev => ({
      ...prev,
      mediaFiles: prev.mediaFiles.filter(file => file.id !== id)
    }));
  };

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

    if (formData.mediaFiles.length === 0) {
      newErrors.mediaFiles = 'At least one media file is required';
      isValid = false;
    }

    if (formData.link && !isValidUrl(formData.link)) {
      newErrors.link = 'Please enter a valid URL';
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const isValidUrl = (url: string) => {
    try {
      new URL(url);
      return true;
    } catch (e) {
      return false;
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsSaving(true);

    try {
      // In a real app, this would be an API call to create the project
      console.log('Creating new project:', formData);

      // Prepare data for API
      const projectData = {
        ...formData,
        tags: formData.tags.split(',').map(tag => tag.trim()).filter(tag => tag)
      };

      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));

      // Redirect back to dashboard
      router.push('/dashboard');
    } catch (error) {
      console.error('Error creating project:', error);
      // Handle error state
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <Layout title="Create New Project - PortfolioPlatform" currentUser={currentUser}>
      <div className="bg-gray-50 min-h-screen">
        <div className="container-custom py-8">
          <div className="bg-white shadow rounded-lg overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-200">
              <div className="flex justify-between items-center">
                <h1 className="text-2xl font-bold text-gray-900">Create New Project</h1>
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
                    placeholder="e.g. E-commerce Website Redesign"
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
                    placeholder="Describe your project, its goals, and your contributions..."
                  ></textarea>
                  {errors.description && (
                    <p className="mt-2 text-sm text-red-600" id="description-error">
                      {errors.description}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Project Media
                  </label>
                  <div
                    className={`relative border-2 border-dashed rounded-lg p-6 transition-colors duration-200 ease-in-out ${
                      isDragging
                        ? 'border-primary bg-primary bg-opacity-5'
                        : 'border-gray-400 hover:border-primary'
                    }`}
                    onDragEnter={handleDragEnter}
                    onDragOver={handleDragOver}
                    onDragLeave={handleDragLeave}
                    onDrop={handleDrop}
                  >
                    <div className="text-center">
                      <svg
                        className="mx-auto h-12 w-12 text-gray-400"
                        stroke="currentColor"
                        fill="none"
                        viewBox="0 0 48 48"
                        aria-hidden="true"
                      >
                        <path
                          d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                          strokeWidth={2}
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                      <div className="flex flex-col items-center">
                        <span className="block text-sm font-medium text-gray-900">
                          Drop your files here, or
                        </span>
                        <label
                          htmlFor="file-upload"
                          className="relative cursor-pointer rounded-md font-medium text-primary hover:text-secondary focus-within:outline-none"
                        >
                          <span>browse to upload</span>
                          <input
                            id="file-upload"
                            name="file-upload"
                            type="file"
                            className="sr-only"
                            multiple
                            onChange={handleFileSelect}
                            accept="image/*,video/*,application/pdf,.doc,.docx"
                          />
                        </label>
                      </div>
                      <p className="text-xs text-gray-500 mt-2">
                        Support for images, videos, PDFs, and documents up to 50MB
                      </p>
                    </div>

                    {formData.mediaFiles.length > 0 && (
                      <div className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4">
                        {formData.mediaFiles.map((file) => (
                          <div
                            key={file.id}
                            className="relative group aspect-w-16 aspect-h-9 rounded-lg overflow-hidden bg-gray-100"
                          >
                            <img
                              src={file.preview}
                              alt={file.file.name}
                              className="object-cover"
                            />
                            <div className="absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-center justify-center">
                              <button
                                type="button"
                                onClick={() => removeFile(file.id)}
                                className="text-white p-2 hover:text-red-500 transition-colors duration-200"
                                aria-label="Remove file"
                              >
                                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                </svg>
                              </button>
                            </div>
                            <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 text-white text-xs p-1 truncate">
                              {file.file.name}
                            </div>
                            {file.progress > 0 && file.progress < 100 && (
                              <div className="absolute bottom-0 left-0 right-0 h-1 bg-gray-200">
                                <div
                                  className="h-full bg-primary transition-all duration-300"
                                  style={{ width: `${file.progress}%` }}
                                ></div>
                              </div>
                            )}
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                  {errors.mediaFiles && (
                    <p className="mt-2 text-sm text-red-600">
                      {errors.mediaFiles}
                    </p>
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
                    placeholder="e.g. Web Design, UI/UX, React"
                  />
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
                    placeholder="https://example.com"
                  />
                  {errors.link && (
                    <p className="mt-2 text-sm text-red-600" id="link-error">
                      {errors.link}
                    </p>
                  )}
                </div>

                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="isPublished"
                    name="isPublished"
                    checked={formData.isPublished}
                    onChange={handleChange}
                    className="h-4 w-4 text-primary focus:ring-primary border-gray-300 rounded"
                  />
                  <label htmlFor="isPublished" className="ml-2 block text-sm text-gray-700">
                    Publish this project (make it visible to others)
                  </label>
                </div>

                <div className="flex justify-end">
                  <button
                    type="submit"
                    disabled={isSaving}
                    className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-primary hover:bg-secondary focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isSaving ? 'Creating Project...' : 'Create Project'}
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default NewProject;
