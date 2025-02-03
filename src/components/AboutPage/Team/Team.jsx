import React from "react";
import { DragSlider } from "../../../utils/DragSlider/DragSlider";

import "./Team.scss";
import Image from "next/image";

export default function TeamAbout({ data }) {
  return (
    <section className="team" id="team">
      <div className="team__title container">
        {data?.title}
        {data?.list.length && (
          <span className="number small-text">{data?.list.length}</span>
        )}
      </div>
      <DragSlider>
        {data?.list &&
          data?.list.map((item, key) => (
            <div key={key} className="team-member">
              <div className="team-member__image">
                <Image
                  src={item?.image}
                  fill
                  alt={item?.name}
                  className="team-member__image-item"
                />
              </div>

              <div className="text">
                <p>{item?.name}</p>
                <p>{item?.role}</p>
              </div>
            </div>
          ))}
      </DragSlider>
      {data?.secondaryImage?.active && (
        <div className="team__secondary-image-wrapper container">
          <Image
            src={data?.secondaryImage.image}
            width={1150}
            height={1150}
            alt="team big image"
            className="team__secondary-image"
          />
        </div>
      )}
    </section>
  );
}
