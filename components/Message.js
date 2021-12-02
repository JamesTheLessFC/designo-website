import {
  faCheck,
  faChevronDown,
  faChevronUp,
  faEnvelope,
  faPhone,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styles from "../styles/Message.module.scss";
import { useState, useEffect } from "react";
import { useUpdateMessageMutation } from "../services/messages";
import {
  toggleOpen,
  toggleSelected,
  markMessageAsRead,
} from "../features/messages/messagesSlice";
import { useDispatch } from "react-redux";

export default function Message({ data }) {
  const {
    id,
    name,
    email,
    phone,
    message,
    createdAt,
    important,
    read,
    open,
    selected,
  } = data;
  const dispatch = useDispatch();
  const [updateMessage, { isLoading, isError }] = useUpdateMessageMutation();

  const toggleDetails = async () => {
    if (!read && !open) {
      const requestBody = {
        updates: {
          read: true,
        },
      };
      const response = await updateMessage({ id, ...requestBody });
      dispatch(markMessageAsRead(id));
    }
    dispatch(toggleOpen(id));
  };

  return (
    <li className={styles.root}>
      <div
        className={`${styles.summary} ${!read ? styles.summary_unread : ""} ${
          important ? styles.summary_important : ""
        }`}
      >
        <div className={styles.checkbox_container}>
          <input
            type="checkbox"
            onChange={() => dispatch(toggleSelected(id))}
          />
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
          <FontAwesomeIcon icon={open ? faChevronUp : faChevronDown} />
        </button>
      </div>
      <div
        className={`${styles.details_wrapper} ${
          open ? "" : styles.details_wrapper_collapsed
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
