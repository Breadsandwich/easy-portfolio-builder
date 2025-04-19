import React, { useState, useEffect } from 'react';
import { NextPage } from 'next';
import { useRouter } from 'next/router';
import Link from 'next/link';
import Layout from '../../components/Layout';

// Mock user profile data - in a real app, this would come from an API
const mockUserProfile = {
  name: 'John Doe',
  email: 'john@example.com',
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
  }
};

interface ProfileFormData {
  name: string;
  username: string;
  bio: string;
  avatar: string;
  location: string;
  website: string;
  twitter: string;
  linkedin: string;
  github: string;
  dribbble: string;
  behance: string;
}

const ProfileEdit: NextPage = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [formData, setFormData] = useState<ProfileFormData>({
    name: '',
    username: '',
    bio: '',
    avatar: '',
    location: '',
    website: '',
    twitter: '',
    linkedin: '',
    github: '',
    dribbble: '',
    behance: ''
  });
  const [errors, setErrors] = useState<Partial<ProfileFormData>>({});

  // Mock user for layout
  const currentUser = {
    username: mockUserProfile.username,
    name: mockUserProfile.name,
    avatar: mockUserProfile.avatar
  };

  // Fetch profile data when component mounts
  useEffect(() => {
    // In a real app, you would fetch data from the API
    setFormData({
      name: mockUserProfile.name,
      username: mockUserProfile.username,
      bio: mockUserProfile.bio,
      avatar: mockUserProfile.avatar,
      location: mockUserProfile.location,
      website: mockUserProfile.website,
      twitter: mockUserProfile.socialLinks.twitter,
      linkedin: mockUserProfile.socialLinks.linkedin,
      github: mockUserProfile.socialLinks.github,
      dribbble: mockUserProfile.socialLinks.dribbble,
      behance: mockUserProfile.socialLinks.behance
    });
    setIsLoading(false);
  }, []);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;

    setFormData({
      ...formData,
      [name]: value
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
    const newErrors: Partial<ProfileFormData> = {};
    let isValid = true;

    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
      isValid = false;
    }

    if (!formData.username.trim()) {
      newErrors.username = 'Username is required';
      isValid = false;
    } else if (!/^[a-zA-Z0-9_]+$/.test(formData.username)) {
      newErrors.username = 'Username can only contain letters, numbers and underscores';
      isValid = false;
    }

    if (!formData.avatar.trim()) {
      newErrors.avatar = 'Avatar URL is required';
      isValid = false;
    } else if (!isValidUrl(formData.avatar)) {
      newErrors.avatar = 'Please enter a valid URL';
      isValid = false;
    }

    if (formData.website && !isValidUrl(formData.website)) {
      newErrors.website = 'Please enter a valid URL';
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
      // In a real app, this would be an API call to update the profile
      console.log('Saving profile:', formData);

      // Prepare data for API
      const profileData = {
        ...formData,
        socialLinks: {
          twitter: formData.twitter,
          linkedin: formData.linkedin,
          github: formData.github,
          dribbble: formData.dribbble,
          behance: formData.behance
        }
      };

      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));

      // Redirect back to dashboard
      router.push('/dashboard');
    } catch (error) {
      console.error('Error saving profile:', error);
      // Handle error state
    } finally {
      setIsSaving(false);
    }
  };

  if (isLoading) {
    return (
      <Layout title="Loading Profile - PortfolioPlatform" currentUser={currentUser}>
        <div className="container-custom py-12 min-h-screen">
          <div className="flex justify-center items-center h-64">
            <div className="text-center">
              <p className="text-gray-500">Loading profile...</p>
            </div>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout title="Edit Profile - PortfolioPlatform" currentUser={currentUser}>
      <div className="bg-gray-50 min-h-screen">
        <div className="container-custom py-8">
          <div className="bg-white shadow rounded-lg overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-200">
              <div className="flex justify-between items-center">
                <h1 className="text-2xl font-bold text-gray-900">Edit Profile</h1>
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
              <div className="space-y-8">
                {/* Basic Information */}
                <div>
                  <h2 className="text-lg font-medium text-gray-900 mb-4">Basic Information</h2>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                        Name
                      </label>
                      <input
                        type="text"
                        name="name"
                        id="name"
                        value={formData.name}
                        onChange={handleChange}
                        className="mt-1 block w-full shadow-sm focus:ring-primary focus:border-primary border-2 border-gray-400 rounded-md"
                        aria-invalid={errors.name ? 'true' : 'false'}
                        aria-describedby={errors.name ? 'name-error' : undefined}
                      />
                      {errors.name && (
                        <p className="mt-2 text-sm text-red-600" id="name-error">
                          {errors.name}
                        </p>
                      )}
                    </div>

                    <div>
                      <label htmlFor="username" className="block text-sm font-medium text-gray-700">
                        Username
                      </label>
                      <div className="mt-1 flex rounded-md shadow-sm">
                        <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-gray-300 bg-gray-50 text-gray-500 text-sm">
                          portfolio.io/
                        </span>
                        <input
                          type="text"
                          name="username"
                          id="username"
                          value={formData.username}
                          onChange={handleChange}
                          className="flex-1 min-w-0 block w-full rounded-none rounded-r-md focus:ring-primary focus:border-primary border-2 border-gray-400"
                          aria-invalid={errors.username ? 'true' : 'false'}
                          aria-describedby={errors.username ? 'username-error' : undefined}
                        />
                      </div>
                      {errors.username && (
                        <p className="mt-2 text-sm text-red-600" id="username-error">
                          {errors.username}
                        </p>
                      )}
                      <p className="mt-1 text-sm text-gray-500">
                        This will be the URL for your portfolio: portfolio.io/{formData.username}
                      </p>
                    </div>
                  </div>

                  <div className="mt-6">
                    <label htmlFor="bio" className="block text-sm font-medium text-gray-700">
                      Bio
                    </label>
                    <textarea
                      id="bio"
                      name="bio"
                      rows={4}
                      value={formData.bio}
                      onChange={handleChange}
                      className="mt-1 block w-full shadow-sm focus:ring-primary focus:border-primary border-2 border-gray-400 rounded-md"
                      placeholder="Tell the world about yourself and your work..."
                      aria-invalid={errors.bio ? 'true' : 'false'}
                      aria-describedby={errors.bio ? 'bio-error' : undefined}
                    ></textarea>
                    <p className="mt-1 text-sm text-gray-500">
                      Brief description for your profile. URLs are hyperlinked.
                    </p>
                  </div>

                  <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="avatar" className="block text-sm font-medium text-gray-700">
                        Avatar URL
                      </label>
                      <input
                        type="url"
                        name="avatar"
                        id="avatar"
                        value={formData.avatar}
                        onChange={handleChange}
                        className="mt-1 block w-full shadow-sm focus:ring-primary focus:border-primary border-2 border-gray-400 rounded-md"
                        aria-invalid={errors.avatar ? 'true' : 'false'}
                        aria-describedby={errors.avatar ? 'avatar-error' : undefined}
                      />
                      {errors.avatar && (
                        <p className="mt-2 text-sm text-red-600" id="avatar-error">
                          {errors.avatar}
                        </p>
                      )}
                      {formData.avatar && isValidUrl(formData.avatar) && (
                        <div className="mt-2 flex items-center">
                          <img
                            src={formData.avatar}
                            alt="Avatar preview"
                            className="h-16 w-16 rounded-full object-cover mr-3"
                            onError={(e) => {
                              const target = e.target as HTMLImageElement;
                              target.onerror = null;
                              target.src = 'https://via.placeholder.com/64?text=Error';
                            }}
                          />
                          <p className="text-sm text-gray-500">Preview</p>
                        </div>
                      )}
                    </div>

                    <div>
                      <label htmlFor="location" className="block text-sm font-medium text-gray-700">
                        Location
                      </label>
                      <input
                        type="text"
                        name="location"
                        id="location"
                        value={formData.location}
                        onChange={handleChange}
                        className="mt-1 block w-full shadow-sm focus:ring-primary focus:border-primary border-2 border-gray-400 rounded-md"
                        placeholder="e.g. San Francisco, CA"
                      />
                    </div>

                    <div>
                      <label htmlFor="website" className="block text-sm font-medium text-gray-700">
                        Website
                      </label>
                      <input
                        type="url"
                        name="website"
                        id="website"
                        value={formData.website}
                        onChange={handleChange}
                        className="mt-1 block w-full shadow-sm focus:ring-primary focus:border-primary border-2 border-gray-400 rounded-md"
                        placeholder="https://example.com"
                        aria-invalid={errors.website ? 'true' : 'false'}
                        aria-describedby={errors.website ? 'website-error' : undefined}
                      />
                      {errors.website && (
                        <p className="mt-2 text-sm text-red-600" id="website-error">
                          {errors.website}
                        </p>
                      )}
                    </div>
                  </div>
                </div>

                {/* Social Links */}
                <div>
                  <h2 className="text-lg font-medium text-gray-900 mb-4">Social Media Links</h2>
                  <p className="text-sm text-gray-500 mb-4">
                    Connect your social media accounts to display them on your portfolio.
                  </p>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="twitter" className="block text-sm font-medium text-gray-700">
                        Twitter Username
                      </label>
                      <div className="mt-1 flex rounded-md shadow-sm">
                        <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-gray-300 bg-gray-50 text-gray-500 text-sm">
                          twitter.com/
                        </span>
                        <input
                          type="text"
                          name="twitter"
                          id="twitter"
                          value={formData.twitter}
                          onChange={handleChange}
                          className="flex-1 min-w-0 block w-full rounded-none rounded-r-md focus:ring-primary focus:border-primary border-2 border-gray-400"
                          placeholder="username"
                        />
                      </div>
                    </div>

                    <div>
                      <label htmlFor="linkedin" className="block text-sm font-medium text-gray-700">
                        LinkedIn Username
                      </label>
                      <div className="mt-1 flex rounded-md shadow-sm">
                        <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-gray-300 bg-gray-50 text-gray-500 text-sm">
                          linkedin.com/in/
                        </span>
                        <input
                          type="text"
                          name="linkedin"
                          id="linkedin"
                          value={formData.linkedin}
                          onChange={handleChange}
                          className="flex-1 min-w-0 block w-full rounded-none rounded-r-md focus:ring-primary focus:border-primary border-2 border-gray-400"
                          placeholder="username"
                        />
                      </div>
                    </div>

                    <div>
                      <label htmlFor="github" className="block text-sm font-medium text-gray-700">
                        GitHub Username
                      </label>
                      <div className="mt-1 flex rounded-md shadow-sm">
                        <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-gray-300 bg-gray-50 text-gray-500 text-sm">
                          github.com/
                        </span>
                        <input
                          type="text"
                          name="github"
                          id="github"
                          value={formData.github}
                          onChange={handleChange}
                          className="flex-1 min-w-0 block w-full rounded-none rounded-r-md focus:ring-primary focus:border-primary border-2 border-gray-400"
                          placeholder="username"
                        />
                      </div>
                    </div>

                    <div>
                      <label htmlFor="dribbble" className="block text-sm font-medium text-gray-700">
                        Dribbble Username
                      </label>
                      <div className="mt-1 flex rounded-md shadow-sm">
                        <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-gray-300 bg-gray-50 text-gray-500 text-sm">
                          dribbble.com/
                        </span>
                        <input
                          type="text"
                          name="dribbble"
                          id="dribbble"
                          value={formData.dribbble}
                          onChange={handleChange}
                          className="flex-1 min-w-0 block w-full rounded-none rounded-r-md focus:ring-primary focus:border-primary border-2 border-gray-400"
                          placeholder="username"
                        />
                      </div>
                    </div>

                    <div>
                      <label htmlFor="behance" className="block text-sm font-medium text-gray-700">
                        Behance Username
                      </label>
                      <div className="mt-1 flex rounded-md shadow-sm">
                        <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-gray-300 bg-gray-50 text-gray-500 text-sm">
                          behance.net/
                        </span>
                        <input
                          type="text"
                          name="behance"
                          id="behance"
                          value={formData.behance}
                          onChange={handleChange}
                          className="flex-1 min-w-0 block w-full rounded-none rounded-r-md focus:ring-primary focus:border-primary border-2 border-gray-400"
                          placeholder="username"
                        />
                      </div>
                    </div>
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
                  {isSaving ? 'Saving...' : 'Save Profile'}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default ProfileEdit;
