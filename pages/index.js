import styles from "../styles/MainPage.module.scss";
import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import Categories from "../components/Categories";
import Adjectives from "../components/Adjectives";
import GetInTouch from "../components/GetInTouch";
import Footer from "../components/Footer";
import HeadComponent from "../components/HeadComponent";

export default function Home() {
  return (
    <div className={styles.root}>
      <HeadComponent title="Designo - Home" />
      <div className={styles.shape1}></div>
      <div className={styles.shape2}></div>
      <Navbar />
      <Hero />
      <Categories categories={["web design", "app design", "graphic design"]} />
      <Adjectives />
      <GetInTouch />
      <Footer />
    </div>
  );
}
