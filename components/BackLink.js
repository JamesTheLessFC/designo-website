import { faChevronLeft } from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styles from "../styles/BackLink.module.scss";

export default function BackLink({ link }) {
  return (
    <div className={styles.root}>
      <Link href={link}>
        <a>
          <FontAwesomeIcon icon={faChevronLeft} className={styles.icon} />
          Back to Dashboard
        </a>
      </Link>
    </div>
  );
}
