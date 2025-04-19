import React from 'react'
import Head from 'next/head'
import Navbar from './Navbar'
import Footer from './Footer'

interface LayoutProps {
  children: React.ReactNode
  title?: string
  description?: string
  currentUser?: {
    username: string;
    name: string;
    avatar: string;
  }
}

const Layout: React.FC<LayoutProps> = ({
  children,
  title = 'PortfolioPlatform - Create and Share Your Portfolio',
  description = 'PortfolioPlatform allows job seekers to quickly create and share their portfolios to showcase their creations and projects.',
  currentUser
}) => {
  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="description" content={description} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="flex flex-col min-h-screen">
        <Navbar currentUser={currentUser} />
        <main className="flex-grow">
          {children}
        </main>
        <Footer />
      </div>
    </>
  )
}

export default Layout
