import React from 'react'
import HeroClients from './Hero/Hero'
import SectionsForClient from './Sections/Sections'

import './ForClients.scss';

export default function ForClients({ data }) {
  return (
    <main className="for-clients">
      <HeroClients data={data.hero} />
      <SectionsForClient data={data.sections} />
    </main>
  )
}
