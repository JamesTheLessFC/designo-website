import Image from "next/image";
import styles from "../styles/Home.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faExclamationCircle } from "@fortawesome/free-solid-svg-icons";
import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import Categories from "../components/Categories";
import Adjectives from "../components/Adjectives";
import GetInTouch from "../components/GetInTouch";
import Footer from "../components/Footer";

export default function Home() {
  return (
    <div className={styles.root}>
      <Navbar />
      <Hero />
      <Categories />
      <Adjectives />
      <GetInTouch />
      <Footer />
    </div>
  );
}
