import React, { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'

interface NavbarProps {
  // In a real app, this would come from a context or auth provider
  currentUser?: {
    username: string;
    name: string;
    avatar: string;
  };
}

const Navbar: React.FC<NavbarProps> = ({ currentUser }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false)
  const router = useRouter()

  const handleMenuToggle = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  const handleProfileToggle = () => {
    setIsProfileDropdownOpen(!isProfileDropdownOpen)
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ') {
      handleMenuToggle()
    }
  }

  const handleProfileKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ') {
      handleProfileToggle()
    }
  }

  // For demo purposes, let's assume user is logged in if on dashboard pages
  const isLoggedIn = currentUser || router.pathname.startsWith('/dashboard')

  // Mock current user for demo purposes - in a real app, this would come from auth context
  const mockUser = currentUser || {
    username: 'johndoe',
    name: 'John Doe',
    avatar: 'https://randomuser.me/api/portraits/men/32.jpg'
  }

  return (
    <nav className="bg-white shadow-sm">
      <div className="container-custom">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <Link href="/" className="text-xl font-bold text-primary flex items-center" tabIndex={0}>
              PortfolioPlatform
            </Link>
          </div>

          <div className="hidden md:flex items-center space-x-4">
            <Link href="/" className="px-3 py-2 rounded-md text-sm font-medium text-dark hover:bg-gray-100 hover:text-primary transition-colors duration-150" tabIndex={0}>
              Home
            </Link>
            <Link href="/explore" className="px-3 py-2 rounded-md text-sm font-medium text-dark hover:bg-gray-100 hover:text-primary transition-colors duration-150" tabIndex={0}>
              Explore
            </Link>

            {isLoggedIn ? (
              <div className="relative">
                <div>
                  <button
                    type="button"
                    className="flex items-center space-x-2 text-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary hover:text-primary transition-colors duration-150 px-3 py-1.5 rounded-full hover:bg-gray-50"
                    id="user-menu"
                    aria-expanded={isProfileDropdownOpen}
                    aria-haspopup="true"
                    onClick={handleProfileToggle}
                    onKeyDown={handleProfileKeyDown}
                  >
                    <span className="sr-only">Open user menu</span>
                    <img
                      className="h-8 w-8 rounded-full border-2 border-gray-200"
                      src={mockUser.avatar}
                      alt={mockUser.name}
                    />
                    <span className="font-medium text-gray-700">{mockUser.name}</span>
                    <svg
                      className={`h-5 w-5 text-gray-400 transition-transform duration-200 ${isProfileDropdownOpen ? 'transform rotate-180' : ''}`}
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                      aria-hidden="true"
                    >
                      <path
                        fillRule="evenodd"
                        d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </button>
                </div>

                {isProfileDropdownOpen && (
                  <div
                    className="origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none z-10 divide-y divide-gray-100 transform transition-all duration-150 ease-out animate-dropdown"
                    role="menu"
                    aria-orientation="vertical"
                    aria-labelledby="user-menu"
                  >
                    <div className="py-1">
                      <Link
                        href={`/${mockUser.username}`}
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-primary transition-colors duration-150"
                        tabIndex={0}
                        role="menuitem"
                      >
                        <div className="flex items-center cursor-pointer">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                          </svg>
                          View My Portfolio
                        </div>
                      </Link>
                      <Link
                        href="/dashboard"
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-primary transition-colors duration-150"
                        tabIndex={0}
                        role="menuitem"
                      >
                        <div className="flex items-center cursor-pointer">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
                          </svg>
                          Dashboard
                        </div>
                      </Link>
                    </div>
                    <div className="py-1">
                      <Link
                        href="/dashboard/profile"
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-primary transition-colors duration-150"
                        tabIndex={0}
                        role="menuitem"
                      >
                        <div className="flex items-center cursor-pointer">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                          </svg>
                          Edit Profile
                        </div>
                      </Link>
                      <Link
                        href="/dashboard/projects/new"
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-primary transition-colors duration-150"
                        tabIndex={0}
                        role="menuitem"
                      >
                        <div className="flex items-center cursor-pointer">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                          </svg>
                          Add New Project
                        </div>
                      </Link>
                    </div>
                    <div className="py-1">
                      <button
                        className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-primary transition-colors duration-150"
                        role="menuitem"
                        onClick={() => router.push('/')}
                      >
                        <div className="flex items-center cursor-pointer">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                          </svg>
                          Sign Out
                        </div>
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <>
                <Link href="/login" className="px-3 py-2 rounded-md text-sm font-medium text-dark hover:bg-gray-100 hover:text-primary transition-colors duration-150" tabIndex={0}>
                  Login
                </Link>
                <Link href="/signup" className="btn btn-primary hover:bg-secondary transition-colors duration-150" tabIndex={0}>
                  Sign Up
                </Link>
              </>
            )}
          </div>

          <div className="md:hidden flex items-center">
            <button
              type="button"
              className="text-gray-500 hover:text-primary transition-colors duration-150 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-primary"
              aria-expanded={isMenuOpen}
              onClick={handleMenuToggle}
              onKeyDown={handleKeyDown}
              aria-label="Toggle menu"
            >
              <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                {isMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <Link href="/" className="block px-3 py-2 rounded-md text-base font-medium text-dark hover:bg-gray-100 hover:text-primary transition-colors duration-150" tabIndex={0}>
              Home
            </Link>
            <Link href="/explore" className="block px-3 py-2 rounded-md text-base font-medium text-dark hover:bg-gray-100 hover:text-primary transition-colors duration-150" tabIndex={0}>
              Explore
            </Link>

            {isLoggedIn ? (
              <>
                <div className="flex items-center px-3 py-2 mb-2 border-b border-gray-100">
                  <img
                    className="h-9 w-9 rounded-full border-2 border-gray-200"
                    src={mockUser.avatar}
                    alt={mockUser.name}
                  />
                  <span className="font-medium text-gray-700 ml-2">{mockUser.name}</span>
                </div>
                <Link
                  href={`/${mockUser.username}`}
                  className="block px-3 py-2 rounded-md text-base font-medium text-dark hover:bg-gray-100 hover:text-primary transition-colors duration-150"
                  tabIndex={0}
                >
                  <div className="flex items-center cursor-pointer">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                    </svg>
                    View My Portfolio
                  </div>
                </Link>
                <Link
                  href="/dashboard"
                  className="block px-3 py-2 rounded-md text-base font-medium text-dark hover:bg-gray-100 hover:text-primary transition-colors duration-150"
                  tabIndex={0}
                >
                  <div className="flex items-center cursor-pointer">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
                    </svg>
                    Dashboard
                  </div>
                </Link>
                <Link
                  href="/dashboard/profile"
                  className="block px-3 py-2 rounded-md text-base font-medium text-dark hover:bg-gray-100 hover:text-primary transition-colors duration-150"
                  tabIndex={0}
                >
                  <div className="flex items-center cursor-pointer">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                    Edit Profile
                  </div>
                </Link>
                <Link
                  href="/dashboard/projects/new"
                  className="block px-3 py-2 rounded-md text-base font-medium text-dark hover:bg-gray-100 hover:text-primary transition-colors duration-150"
                  tabIndex={0}
                >
                  <div className="flex items-center cursor-pointer">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                    </svg>
                    Add New Project
                  </div>
                </Link>
                <button
                  className="block w-full text-left px-3 py-2 rounded-md text-base font-medium text-dark hover:bg-gray-100 hover:text-primary transition-colors duration-150"
                  onClick={() => router.push('/')}
                >
                  <div className="flex items-center cursor-pointer">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                    </svg>
                    Sign Out
                  </div>
                </button>
              </>
            ) : (
              <>
                <Link href="/login" className="block px-3 py-2 rounded-md text-base font-medium text-dark hover:bg-gray-100 hover:text-primary transition-colors duration-150" tabIndex={0}>
                  Login
                </Link>
                <Link href="/signup" className="block px-3 py-2 rounded-md text-base font-medium bg-primary text-white hover:bg-secondary transition-colors duration-150" tabIndex={0}>
                  Sign Up
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  )
}

export default Navbar
