import {
  faCheckCircle,
  faExclamationCircle,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styles from "../styles/ContactModal.module.scss";
import Link from "next/link";

export default function ContactModal({ success, data }) {
  return (
    <div className={styles.root}>
      <div className={styles.modal}>
        <h1>
          <FontAwesomeIcon
            icon={success ? faCheckCircle : faExclamationCircle}
            className={`${styles.icon} ${
              success ? styles.icon_success : styles.icon_failure
            }`}
          />
          {success ? "Message Sent!" : "Sorry."}
        </h1>
        <p>
          {success && data.confirmationSent
            ? "Thank you for reaching out. Please check your email for a confirmation that we received your message."
            : success
            ? "Thanks for reaching out. We received your message, but were unable to send a confirmation to your email."
            : "Your message was unable to be delivered."}
        </p>
        <Link href="/">
          <a>Return Home</a>
        </Link>
      </div>
    </div>
  );
}
