import styles from "../styles/AboutHero.module.scss";
import Image from "next/image";
import heroImageMobile from "../public/assets/about/mobile/image-about-hero.jpg";
import heroImageTablet from "../public/assets/about/tablet/image-about-hero.jpg";
import heroImageDesktop from "../public/assets/about/desktop/image-about-hero.jpg";
import { useState, useEffect, useCallback } from "react";
import useScrollbarSize from "react-scrollbar-size";

export default function AboutHero() {
  const [clientWidth, setClientWidth] = useState();
  const { width: scrollbarWidth } = useScrollbarSize();
  const [screenPercentage, setScreenPercentage] = useState();

  // memoized callback to run upon window resize
  const handleWindowResize = useCallback(() => {
    setClientWidth(document.body.clientWidth);
  }, []);

  // add listeners for window resize
  useEffect(() => {
    window.addEventListener("resize", handleWindowResize);
    return () => {
      window.removeEventListener("resize", handleWindowResize);
    };
  }, [handleWindowResize]);

  // this adjusts the screen percentage upon screen resize
  useEffect(() => {
    if (clientWidth + scrollbarWidth >= 1199) {
      setScreenPercentage(0.8);
    } else {
      setScreenPercentage(0.9);
    }
  }, [clientWidth, scrollbarWidth]);

  // this sets the initial values when component loads
  useEffect(() => {
    if (!clientWidth || !screenPercentage) {
      const currentClientWidth = document.body.clientWidth;
      setClientWidth(currentClientWidth);
      setScreenPercentage(
        currentClientWidth + scrollbarWidth >= 1199 ? 0.8 : 0.9
      );
    }
  }, [scrollbarWidth, clientWidth, screenPercentage]);

  return (
    <div className={styles.root}>
      <div className={styles.image_container}>
        <Image
          src={
            clientWidth + scrollbarWidth >= 900
              ? heroImageDesktop
              : clientWidth + scrollbarWidth >= 500
              ? heroImageTablet
              : heroImageMobile
          }
          alt="a group of people with laptops"
          layout={clientWidth + scrollbarWidth >= 900 ? "fill" : "responsive"}
          priority
          objectFit="cover"
        />
      </div>
      <div className={styles.text_container}>
        <h1>About Us</h1>
        <p>
          Founded in 2010, we are a creative agency that produces lasting
          results for our clients. We’ve partnered with many startups,
          corporations, and nonprofits alike to craft designs that make real
          impact. We’re always looking forward to creating brands, products, and
          digital experiences that connect with our clients' audiences.
        </p>
      </div>
    </div>
  );
}
