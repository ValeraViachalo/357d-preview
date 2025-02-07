import React from 'react'
import Projects from './Projects/Projects'

import './ProjectsPage.scss';

export default function ProjectsPage({ data }) {
  return (
    <main className="projects-page">
      <Title title={data.title} />
      <Projects data={data} />
    </main>
  )
}

const Title = ({ title }) => {
  return (
    <span className="super-text projects-page__title">{title}</span>
  )
}
