import React from 'react'
import HeroAbout from './Hero/Hero'
import ApproachAbout from './Approach/Approach'
import ProjectsAbout from './ProjectsAbout/ProjectsAbout'
import TeamAbout from './Team/Team'

import './AboutPage.scss'
import PartnersAbout from './Partners/PartnersAbout'

export default function AboutPage({ data }) {
  return (
    <main className="about">
      <HeroAbout data={data.hero}/>
      <ApproachAbout data={data.approach} />
      <ProjectsAbout data={data.projects} />
      <TeamAbout data={data.team} />
      <PartnersAbout data={data.partners} />
    </main>
  )
}
