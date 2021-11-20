import styles from "../styles/Categories.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronRight } from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";
import { useState, useEffect, useCallback } from "react";
import useScrollbarSize from "react-scrollbar-size";

export default function Categories() {
  const categories = ["web design", "app design", "graphic design"];
  const [clientWidth, setClientWidth] = useState();
  const { width: scrollbarWidth } = useScrollbarSize();
  const [screenPercentage, setScreenPercentage] = useState(0.9);

  // callback & effect necessary to calculate screen width (inc scrollbar) so that we can set css grid styles correctly @ >=992px screen size
  const handleWindowResize = useCallback(() => {
    setClientWidth(document.body.clientWidth);
  }, []);

  useEffect(() => {
    window.addEventListener("resize", handleWindowResize);
    return () => {
      window.removeEventListener("resize", handleWindowResize);
    };
  }, [handleWindowResize]);

  useEffect(() => {
    if (clientWidth + scrollbarWidth >= 1199) {
      setScreenPercentage(0.8);
    } else {
      setScreenPercentage(0.9);
    }
  }, [clientWidth, scrollbarWidth]);

  const calculateDivHeight = (category) => {
    if (category === "web design" && clientWidth + scrollbarWidth >= 992) {
      return {
        height:
          (640 / 541) * ((screenPercentage * clientWidth) / 2.0443623) + "px",
      };
    } else if (
      (category === "app design" || category === "graphic design") &&
      clientWidth + scrollbarWidth >= 992
    ) {
      return {
        height:
          (308 / 541) * ((screenPercentage * clientWidth) / 2.0443623) + "px",
      };
    } else {
      return {};
    }
  };

  const calculateRowStyles = () => {
    if (clientWidth + scrollbarWidth >= 992) {
      return {
        rowGap:
          0.0443623 * ((screenPercentage * clientWidth) / 2.0443623) + "px",
        gridAutoRows:
          0.5693 * ((screenPercentage * clientWidth) / 2.0443623) + "px",
      };
    } else {
      return {};
    }
  };

  return (
    <ul className={styles.root} style={calculateRowStyles()}>
      {categories.map((category) => (
        <li key={category}>
          <Link href={`/${category.split(" ").join("-")}`}>
            <a>
              <div
                className={`${styles.content} ${
                  styles[`content_${category.split(" ")[0]}`]
                }`}
                style={calculateDivHeight(category)}
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
