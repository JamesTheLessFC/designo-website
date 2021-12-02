import styles from "../styles/Hero.module.scss";
import Image from "next/image";
import phoneImage from "../public/assets/home/desktop/image-hero-phone.png";
import { useRouter } from "next/router";

export default function Hero() {
  const router = useRouter();
  return (
    <div className={styles.root}>
      <div className={styles.text}>
        <h1>Award-winning custom designs and digital branding solutions</h1>
        <p>
          With over 10 years in the industry, we are experienced in creating
          fully responsive websites, app design, and engaging brand experiences.
          Find out more about our services.
        </p>
        <button onClick={() => router.push("/about")}>Learn more</button>
      </div>
      <div className={styles.image_container}>
        <Image
          src={phoneImage}
          alt="mobile phone"
          layout="fill"
          objectFit="cover"
          objectPosition="top"
          priority
        />
      </div>
    </div>
  );
}
