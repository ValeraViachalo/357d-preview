import React from 'react'

import "./Approach.scss";
import Image from 'next/image';

export default function ApproachAbout({ data }) {
  return (
    <section className="approach container" id="approach">
      <p className="approach__title">{data?.title}</p>
      {data?.sections.length && data?.sections.map((currSection, sectionIndex) => (
        <div key={sectionIndex} className='section'>
          <h1 className="title">
            {currSection?.title}
            <span className="line"></span>
          </h1>

          <div className="content">
            <Image
              src={currSection.image}
              alt={`about-our-approach-${currSection?.title}`}
              width={680}
              height={680}
              className="content__image"
            />
            <div className="content__text">
              <p dangerouslySetInnerHTML={{ __html: currSection.text }} />
            </div>
          </div>
        </div>
      ))}
    </section>
  )
}
