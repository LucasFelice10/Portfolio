import React from 'react'
import Hero from '../components/portfolio/Hero'
import About from '../components/portfolio/About'
import SkillsShowcase from '../components/portfolio/SkillsShowcase'
import ProjectsShowcase from '../components/portfolio/ProjectsShowcase'
import WordpressCertification from '../components/portfolio/WordpressCertification'
import Experience from '../components/portfolio/Experience'
import Contact from '../components/portfolio/Contact'

export default function Home() {
  return (
    <div className="relative">
      <Hero />
      <About />
      <SkillsShowcase />
      <ProjectsShowcase />
      <WordpressCertification />
      <Experience />
      <Contact />
    </div>
  )
}
