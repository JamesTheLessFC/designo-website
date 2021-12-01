import {
  faCheck,
  faChevronDown,
  faChevronUp,
  faEnvelope,
  faPhone,
  faTrash,
  faUser,
  faUserCircle,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styles from "../styles/Message.module.scss";
import { useState } from "react";

export default function Message({
  data,
  selectMessage,
  deselectMessage,
  selected,
}) {
  const { id, name, email, phone, message, createdAt, read, important } = data;
  const [showDetails, setShowDetails] = useState(false);

  const toggleDetails = () => {
    setShowDetails((prevState) => !prevState);
  };

  const toggleSelected = () => {
    if (!selected) {
      selectMessage(id);
    } else {
      deselectMessage(id);
    }
  };

  return (
    <li className={styles.root}>
      <div
        className={`${styles.summary} ${!read ? styles.summary_unread : ""} ${
          important ? styles.summary_important : ""
        }`}
      >
        <div className={styles.checkbox_container}>
          <input type="checkbox" onChange={toggleSelected} />
          <span className={styles.checkmark}>
            {selected ? (
              <FontAwesomeIcon icon={faCheck} className={styles.icon} />
            ) : (
              ""
            )}
          </span>
        </div>
        <p className={styles.date}>
          {new Date(createdAt).toLocaleDateString("en-US", {
            datestyle: "medium",
          })}
        </p>
        <p className={styles.name}>{name}</p>
        <p className={styles.email}>{email}</p>
        <p className={styles.phone}>{phone}</p>
        <p className={styles.message}>{message}</p>
        <button onClick={toggleDetails}>
          <FontAwesomeIcon icon={showDetails ? faChevronUp : faChevronDown} />
        </button>
      </div>
      <div
        className={`${styles.details_wrapper} ${
          showDetails ? "" : styles.details_wrapper_collapsed
        }`}
      >
        <div className={styles.details}>
          <p className={styles.name}>
            <FontAwesomeIcon icon={faUser} className={styles.icon} />
            {name}
          </p>
          <p className={styles.email}>
            <FontAwesomeIcon icon={faEnvelope} className={styles.icon} />
            {email}
          </p>
          <p className={styles.phone}>
            <FontAwesomeIcon icon={faPhone} className={styles.icon} />
            {phone}
          </p>
          <p className={styles.message}>{message}</p>
        </div>
      </div>
    </li>
  );
}
