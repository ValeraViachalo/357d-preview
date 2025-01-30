import React from 'react'
import './About.scss';
import Image from 'next/image';

export default function AboutHome({ data }) {
  const { top } = data;

  return (
    <section className="about container">
      <div className="top">
        <p className="about__text">{top.text}</p>
        <h1 className="about__title">
        {top.title}
        </h1>
      </div>
      <div className="bottom">
        {data.bottom.list.map((item, index) => (
          <div className="card" key={index}>
            <div className="card__title">
              <p>{item.text}</p>
              <span className="line" />
            </div>
            <Image className="card__image" alt='about icon' src={item.image} width={100} height={100}/>
          </div>
        ))}
      </div>
    </section>
  )
}
