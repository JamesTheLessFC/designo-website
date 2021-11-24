import styles from "../styles/AboutPageSection.module.scss";
import Image from "next/image";
import { useState, useEffect, useCallback } from "react";
import useScrollbarSize from "react-scrollbar-size";

export default function Talent({ content }) {
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
    <div
      className={`${styles.root} ${
        content.heading === "The real deal"
          ? styles.root_real_deal
          : styles.root_talent
      }`}
    >
      <div className={styles.image_container}>
        <Image
          src={
            clientWidth + scrollbarWidth >= 900
              ? content.imageDesktop
              : clientWidth + scrollbarWidth >= 500
              ? content.imageTablet
              : content.imageMobile
          }
          alt={content.alt}
          layout={clientWidth + scrollbarWidth >= 900 ? "fill" : "responsive"}
          objectFit="cover"
        />
      </div>
      <div className={styles.text_container}>
        <h1>{content.heading}</h1>
        <p>{content.body1}</p>
        <p>{content.body2}</p>
      </div>
    </div>
  );
}
