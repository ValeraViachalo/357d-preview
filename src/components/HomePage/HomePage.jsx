import "./HomePage.scss";
import { HeroHome } from "./Hero/Hero";
import AboutHome from "./About/About";
import ProjectsHome from "./Projects/Projects";
import ServicesHome from "./Services/Services";

const HomePage = ({ data }) => {
  
  return (
    <main className="home">
      <HeroHome data={data.hero} />
      <AboutHome data={data.about}/>
      {/* <ProjectsHome data={data.projects} /> */}
      <ServicesHome data={data.services} />
    </main>
  );
};

export default HomePage;
