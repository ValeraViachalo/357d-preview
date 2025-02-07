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
      {data.hero && <HeroAbout data={data.hero}/>}
      {data.approach && <ApproachAbout data={data.approach} />}
      {data.projects && <ProjectsAbout data={data.projects} />}
      <TeamAbout data={data.team} />
      <PartnersAbout data={data.partners} />
    </main>
  )
}
