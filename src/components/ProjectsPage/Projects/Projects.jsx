"use client";

import React, { useState } from "react";
import { ProjectCard } from "../ProjectCard/ProjectCard";

import "./Projects.scss";
import { Filters } from "../Filters/Filters";
import { AnimatePresence, motion } from "framer-motion";
import { anim, ProjectsAnim } from "@/lib/helpers/anim";

export default function Projects({ data }) {
  const [worksList, setWorksList] = useState(data.list || []);
  const [activeFilters, setActiveFilters] = useState({
    type: "",
    status: "",
  });

  return (
    <>
      <Filters
        data={data}
        worksList={worksList}
        setWorksList={setWorksList}
        activeFilters={activeFilters}
        setActiveFilters={setActiveFilters}
      />
      <section className="projects container">
        <AnimatePresence mode="wait" key={`${activeFilters.type}-${activeFilters.status}--${worksList.length}`}>
          {worksList.length &&
            worksList.map((currentWork, index) => (
              <motion.div
                {...anim(ProjectsAnim.card)}
                custom={index % 2}
                key={`${index}-${currentWork.name}-${activeFilters.type}-${activeFilters.status}`}
              >
                <ProjectCard data={currentWork} />
              </motion.div>
            ))}
        </AnimatePresence>
      </section>
    </>
  );
}
