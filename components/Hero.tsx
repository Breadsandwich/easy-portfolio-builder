import React from 'react'
import Link from 'next/link'

const Hero: React.FC = () => {
  return (
    <div className="bg-gradient-to-r from-primary to-secondary text-white py-16">
      <div className="container-custom">
        <div className="flex flex-col md:flex-row items-center">
          <div className="md:w-1/2 mb-8 md:mb-0">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Show Your Work to the World
            </h1>
            <p className="text-xl mb-8">
              Create a stunning portfolio in minutes and share your projects with potential employers.
              Stand out from the crowd with a professional online presence.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                href="/signup"
                className="btn bg-white text-primary hover:bg-gray-100 px-8 py-3 font-bold rounded-md"
                tabIndex={0}
              >
                Get Started Free
              </Link>
              <Link
                href="/explore"
                className="btn border border-white text-white hover:bg-white hover:text-primary px-8 py-3 font-bold rounded-md"
                tabIndex={0}
              >
                Explore Examples
              </Link>
            </div>
          </div>
          <div className="md:w-1/2">
            <div className="relative">
              <div className="bg-white rounded-lg shadow-2xl p-4">
                <div className="bg-gray-100 rounded-md p-2 mb-4">
                  <div className="flex items-center mb-2">
                    <div className="w-3 h-3 rounded-full bg-red-500 mr-2"></div>
                    <div className="w-3 h-3 rounded-full bg-yellow-500 mr-2"></div>
                    <div className="w-3 h-3 rounded-full bg-green-500"></div>
                  </div>
                  <div className="bg-white rounded border border-gray-200 p-4">
                    <div className="flex items-center mb-4">
                      <div className="w-12 h-12 bg-primary rounded-full mr-4"></div>
                      <div>
                        <div className="h-4 w-32 bg-gray-200 rounded mb-2"></div>
                        <div className="h-3 w-24 bg-gray-200 rounded"></div>
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4 mb-4">
                      <div className="bg-gray-200 rounded h-32"></div>
                      <div className="bg-gray-200 rounded h-32"></div>
                    </div>
                    <div className="bg-gray-200 h-4 w-full rounded mb-2"></div>
                    <div className="bg-gray-200 h-4 w-2/3 rounded"></div>
                  </div>
                </div>
                <div className="flex justify-around">
                  <div className="h-8 w-8 bg-gray-200 rounded-full"></div>
                  <div className="h-8 w-8 bg-gray-200 rounded-full"></div>
                  <div className="h-8 w-8 bg-gray-200 rounded-full"></div>
                  <div className="h-8 w-8 bg-gray-200 rounded-full"></div>
                </div>
              </div>
              <div className="absolute -top-4 -left-4 w-20 h-20 bg-yellow-400 rounded-lg -z-10"></div>
              <div className="absolute -bottom-4 -right-4 w-20 h-20 bg-primary rounded-lg -z-10"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Hero
