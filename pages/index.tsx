import type { NextPage } from 'next'
import Layout from '../components/Layout'
import Hero from '../components/Hero'
import FeatureSection from '../components/FeatureSection'
import FeaturedProjects from '../components/FeaturedProjects'
import CallToAction from '../components/CallToAction'

const Home: NextPage = () => {
  return (
    <Layout>
      <Hero />
      <FeatureSection />
      <FeaturedProjects />
      <CallToAction />
    </Layout>
  )
}

export default Home
