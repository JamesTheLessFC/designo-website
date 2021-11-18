import styles from "../styles/Hero.module.scss";
import Image from "next/image";
import circlePattern from "../public/assets/home/desktop/bg-pattern-hero-home.svg";
import phoneImage from "../public/assets/home/desktop/image-hero-phone.png";

export default function Hero() {
  return (
    <div className={styles.root}>
      <h1>Award-winning custom designs and digital branding solutions</h1>
      <p>
        With over 10 years in the industry, we are experienced in creating fully
        responsive websites, app design, and engaging brand experiences. Find
        out more about our services.
      </p>
      <button>Learn more</button>
      <div className={styles.image_container}>
        <Image
          src={phoneImage}
          alt="mobile phone"
          layout="responsive"
          objectPosition="top"
          priority
        />
      </div>
    </div>
  );
}
