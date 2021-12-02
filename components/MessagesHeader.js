import { faEnvelope } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styles from "../styles/MessagesHeader.module.scss";

export default function MessagesHeader() {
  return (
    <div className={styles.root}>
      <FontAwesomeIcon icon={faEnvelope} className={styles.icon} />
      <h1>Message Inbox</h1>
    </div>
  );
}
