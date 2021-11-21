import styles from "../styles/CategoryHeader.module.scss";

const content = {
  web: {
    heading: "Web Design",
    body: " We build websites that serve as powerful marketing tools and bring memorable brand experiences.",
  },
  app: {
    heading: "App design",
    body: "Our mobile designs bring intuitive digital solutions to your customers right at their fingertips.",
  },
  graphic: {
    heading: "Graphic design",
    body: "We deliver eye-catching branding materials that are tailored to meet your business objectives.",
  },
};

export default function CategoryHeader({ category }) {
  return (
    <div className={`${styles.root}`}>
      <h1>{content[category].heading}</h1>
      <p>{content[category].body}</p>
    </div>
  );
}
