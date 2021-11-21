import styles from "../styles/ProjectList.module.scss";
import Project from "./Project";
import blogrImage from "../public/assets/web-design/desktop/image-blogr.jpg";
import builderImage from "../public/assets/web-design/desktop/image-builder.jpg";
import campImage from "../public/assets/web-design/desktop/image-camp.jpg";
import expressImage from "../public/assets/web-design/desktop/image-express.jpg";
import photonImage from "../public/assets/web-design/desktop/image-photon.jpg";
import transferImage from "../public/assets/web-design/desktop/image-transfer.jpg";
import airfilterImage from "../public/assets/app-design/desktop/image-airfilter.jpg";
import eyecamImage from "../public/assets/app-design/desktop/image-eyecam.jpg";
import faceitImage from "../public/assets/app-design/desktop/image-faceit.jpg";
import todoImage from "../public/assets/app-design/desktop/image-todo.jpg";
import loopstudiosImage from "../public/assets/app-design/desktop/image-loopstudios.jpg";
import changeImage from "../public/assets/graphic-design/desktop/image-change.jpg";
import boxedWaterImage from "../public/assets/graphic-design/desktop/image-boxed-water.jpg";
import scienceImage from "../public/assets/graphic-design/desktop/image-science.jpg";

const projects = {
  web: [
    {
      name: "Express",
      description: "A multi-carrier shipping website for ecommerce businesses",
      image: expressImage,
    },
    {
      name: "Transfer",
      description:
        "Site for low-cost money transfers and sending money within seconds",
      image: transferImage,
    },
    {
      name: "Photon",
      description:
        "A state-of-the-art music player with high-resolution audio and DSP effects",
      image: photonImage,
    },
    {
      name: "Builder",
      description:
        "Connects users with local contractors based on their location",
      image: builderImage,
    },
    {
      name: "Blogr",
      description:
        "Blogr is a platform for creating an online blog or publication",
      image: blogrImage,
    },
    {
      name: "Camp",
      description:
        "Get expert training in coding, data, design, and digital marketing",
      image: campImage,
    },
  ],
  app: [
    {
      name: "Airfilter",
      description:
        "Solving the problem of poor indoor air quality by filtering the air",
      image: airfilterImage,
    },
    {
      name: "Eyecam",
      description:
        "Product that lets you edit your favorite photos and videos at any time",
      image: eyecamImage,
    },
    {
      name: "Faceit",
      description:
        "Get to meet your favorite internet superstar with the faceit app",
      image: faceitImage,
    },
    {
      name: "Todo",
      description:
        "A todo app that features cloud sync with light and dark mode",
      image: todoImage,
    },
    {
      name: "Loopstudios",
      description: "A VR experience app made for Loopstudios",
      image: loopstudiosImage,
    },
  ],
  graphic: [
    {
      name: "Tim Brown",
      description:
        "A book cover designed for Tim Brown’s new release, ‘Change’",
      image: changeImage,
    },
    {
      name: "Boxed Water",
      description: "A simple packaging concept made for Boxed Water",
      image: boxedWaterImage,
    },
    {
      name: "Science!",
      description:
        "A poster made in collaboration with the Federal Art Project",
      image: scienceImage,
    },
  ],
};

export default function ProjectList({ category }) {
  return (
    <ul className={styles.root}>
      {projects[category].map((project) => (
        <Project
          key={project.name}
          name={project.name}
          description={project.description}
          image={project.image}
        />
      ))}
    </ul>
  );
}
