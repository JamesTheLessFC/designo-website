import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styles from "../styles/AdminHeader.module.scss";

export default function MessagesHeader({ title, icon }) {
  return (
    <div className={styles.root}>
      <FontAwesomeIcon icon={icon} className={styles.icon} />
      <h1>{title}</h1>
    </div>
  );
}
