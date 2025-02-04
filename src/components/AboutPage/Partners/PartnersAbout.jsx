import React from "react";

import "./PartnersAbout.scss";
import { LinkAnim } from "@/utils/LinkAnim/LinkAnim";

export default function PartnersAbout({ data }) {
  return (
    <div className="partners container" id="partners">
      <div className="title">
        {data?.title}
        {data?.text && (
          <p
            className="small-text"
            dangerouslySetInnerHTML={{ __html: data?.text }}
          />
        )}
      </div>
      {data?.list && (
        <div className="list">
          {data?.list.map((currLink, i) => (
            <LinkAnim
              text={currLink.text}
              href={currLink.href}
              classes="item"
              key={i}
            />
          ))}
        </div>
      )}
    </div>
  );
}
