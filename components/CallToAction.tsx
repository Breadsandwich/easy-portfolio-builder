import React from 'react'
import Link from 'next/link'

const CallToAction: React.FC = () => {
  return (
    <section className="py-20 bg-gradient-to-r from-primary to-secondary text-white">
      <div className="container-custom">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Ready to Showcase Your Work?
          </h2>
          <p className="text-xl mb-8 text-white/90">
            Join thousands of professionals who are launching their careers with stunning portfolios.
            Get started today — it&apos;s free!
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link
              href="/signup"
              className="btn bg-white text-primary hover:bg-gray-100 px-8 py-3 font-bold rounded-md"
              tabIndex={0}
            >
              Create Your Portfolio
            </Link>
            <Link
              href="/explore"
              className="btn border border-white text-white hover:bg-white hover:text-primary px-8 py-3 font-bold rounded-md"
              tabIndex={0}
            >
              See Examples
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}

export default CallToAction
