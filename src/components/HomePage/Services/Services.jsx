import React from 'react'
import './Services.scss'

export default function ServicesHome({ data }) {
  return (
    <section className="services container">
      <h1 className="services__title">{data.title}</h1>
      <div className="list">
        {data.list.map((item, index) => (
          <p key={index} className='list__item upperCase'>{item}</p>
        ))}
      </div>
    </section>
  )
}
