import styles from "../styles/Categories.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronRight } from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";
import { useState, useEffect, useCallback } from "react";
import useScrollbarSize from "react-scrollbar-size";

export default function Categories({ categories }) {
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

  const getDivHeightStyles = (category) => {
    if (
      category === "web design" &&
      categories.length === 3 &&
      clientWidth + scrollbarWidth >= 992
    ) {
      return {
        height:
          (640 / 541) * ((screenPercentage * clientWidth) / 2.0443623) + "px",
      };
    } else if (clientWidth + scrollbarWidth >= 992) {
      return {
        height:
          (308 / 541) * ((screenPercentage * clientWidth) / 2.0443623) + "px",
      };
    } else if (clientWidth + scrollbarWidth >= 550) {
      return {
        height: (200 / 689) * (screenPercentage * clientWidth) + "px",
      };
    } else {
      return {
        height: (250 / 327) * (screenPercentage * clientWidth) + "px",
      };
    }
  };

  const getRowStyles = () => {
    if (clientWidth + scrollbarWidth >= 992) {
      return {
        rowGap:
          0.0443623 * ((screenPercentage * clientWidth) / 2.0443623) + "px",
        gridAutoRows:
          0.5693 * ((screenPercentage * clientWidth) / 2.0443623) + "px",
      };
    } else {
      return {
        rowGap: screenPercentage * clientWidth * 0.05 + "px",
      };
    }
  };

  return (
    <ul
      className={`${styles.root} ${
        categories.length === 2 ? styles.root_category_page : ""
      }`}
      style={getRowStyles()}
    >
      {categories.map((category) => (
        <li key={category}>
          <Link href={`/${category.split(" ").join("-")}`}>
            <a>
              <div
                className={`${styles.content} ${
                  styles[`content_${category.split(" ")[0]}`]
                }`}
                style={getDivHeightStyles(category)}
              >
                <h2>{category}</h2>
                <h3>
                  View Projects{" "}
                  <FontAwesomeIcon
                    icon={faChevronRight}
                    className={styles.icon}
                  />
                </h3>
              </div>
            </a>
          </Link>
        </li>
      ))}
    </ul>
  );
}
