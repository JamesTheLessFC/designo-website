import styles from "../styles/Categories.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronRight } from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";

export default function Categories() {
  const categories = ["web design", "app design", "graphic design"];
  return (
    <ul className={styles.root}>
      {categories.map((category) => (
        <li key={category}>
          <Link href={`/${category.split(" ").join("-")}`}>
            <a>
              <div
                className={`${styles.content} ${
                  styles[`content_${category.split(" ")[0]}`]
                }`}
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
