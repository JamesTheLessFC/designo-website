import styles from "../styles/Adjectives.module.scss";
import passionateImage from "../public/assets/home/desktop/illustration-passionate.svg";
import resourcefulImage from "../public/assets/home/desktop/illustration-resourceful.svg";
import friendlyImage from "../public/assets/home/desktop/illustration-friendly.svg";
import Image from "next/image";

const adjectives = [
  {
    heading: "passionate",
    body: "Each project starts with an in-depth brand research to ensure we only create products that serve a purpose. We merge art, design, and technology into exciting new solutions.",
  },
  {
    heading: "resourceful",
    body: "Everything that we do has a strategic purpose. We use an agile approach in all of our projects and value customer collaboration. It guarantees superior results that fulfill our clients’ needs.",
  },
  {
    heading: "friendly",
    body: "We are a group of enthusiastic folks who know how to put people first. Our success depends on our customers, and we strive to give them the best experience a company can provide.",
  },
];

export default function Adjectives() {
  return (
    <ul className={styles.root}>
      {adjectives.map((adjective) => (
        <li key={adjective.heading}>
          <div className={styles.circle}></div>
          <Image
            src={
              adjective.heading === "passionate"
                ? passionateImage
                : adjective.heading === "resourceful"
                ? resourcefulImage
                : friendlyImage
            }
            alt={`${adjective.heading} illustration`}
          />
          <div className={styles.text}>
            <h3>{adjective.heading}</h3>
            <p>{adjective.body}</p>
          </div>
        </li>
      ))}
    </ul>
  );
}
