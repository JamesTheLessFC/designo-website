import Image from "next/image";
import styles from "../styles/Home.module.scss";
import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import Categories from "../components/Categories";
import Adjectives from "../components/Adjectives";
import GetInTouch from "../components/GetInTouch";
import Footer from "../components/Footer";
import { useState, useEffect, useCallback } from "react";

export default function Home() {
  // const [clientWidth, setClientWidth] = useState();
  // const [offsetWidth, setOffsetWidth] = useState();

  // const handleWindowResize = useCallback(() => {
  //   console.log("offset", document.body.offsetWidth);
  //   console.log("client", document.body.clientWidth);
  //   setClientWidth(document.body.clientWidth);
  //   setOffsetWidth(document.body.offsetWidth);
  // }, []);

  // useEffect(() => {
  //   window.addEventListener("resize", handleWindowResize);
  //   return () => {
  //     window.removeEventListener("resize", handleWindowResize);
  //   };
  // }, [handleWindowResize]);

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
