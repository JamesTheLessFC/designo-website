import styles from "../styles/Dashboard.module.scss";
import Link from "next/link";
import { signOut } from "next-auth/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope, faSignOutAlt } from "@fortawesome/free-solid-svg-icons";

export default function Dashboard() {
  return (
    <div className={styles.root}>
      <div className={styles.links}>
        <Link href="/admin/messages?sortBy=date&page=1">
          <a>
            <FontAwesomeIcon icon={faEnvelope} className={styles.icon} />
            Message Inbox
          </a>
        </Link>
      </div>
      <button onClick={() => signOut()}>
        <FontAwesomeIcon icon={faSignOutAlt} className={styles.icon} />
        Log Out
      </button>
    </div>
  );
}
