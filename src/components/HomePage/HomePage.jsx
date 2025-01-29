import { Content } from "@/utils/Content/Content";

import "./HomePage.scss";
import { ScrollProvider } from "@/lib/providers/ScrollProvider/ScrollProvider";
import { AnchorLink } from "@/utils/AnchorLink/AnchorLink";
import { motion } from "framer-motion";
import { getFetchData } from "@/lib/helpers/DataFetch";
import { HeroHome } from "./Hero/Hero";
import Image from "next/image";
import AboutHome from "./About/About";
import ProjectsHome from "./Projects/Projects";
import ServicesHome from "./Services/Services";

const HomePage = ({ data }) => {
  
  return (
    <main className="home">
      <HeroHome data={data.hero} />
      <AboutHome data={data.about}/>
      <ProjectsHome data={data.projects} />
      <ServicesHome data={data.services} />
    </main>
  );
};

export default HomePage;
