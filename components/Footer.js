import styles from "../styles/Footer.module.scss";
import logo from "../public/assets/shared/desktop/logo-light.png";
import Image from "next/image";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFacebookSquare,
  faInstagram,
  faPinterest,
  faTwitter,
  faYoutube,
} from "@fortawesome/free-brands-svg-icons";

export default function Footer({ page }) {
  return (
    <div
      className={`${styles.root} ${
        page === "contact" || page === "admin"
          ? styles.root_contact_or_admin
          : ""
      }`}
    >
      <div className={styles.content}>
        <div className={styles.logo_menu_container}>
          <Link href="/">
            <a className={styles.home_link}>
              <Image src={logo} alt="logo" width={250} height={33.416} />
            </a>
          </Link>
          <hr className={styles.hr_mobile} />
          <ul>
            <li>
              <Link href="/about">
                <a>Our Company</a>
              </Link>
            </li>
            <li>
              <Link href="/locations">
                <a>Locations</a>
              </Link>
            </li>
            <li>
              <Link href="/contact">
                <a>Contact</a>
              </Link>
            </li>
            <li>
              <Link href="/admin/messages?page=1">
                <a>Admin</a>
              </Link>
            </li>
          </ul>
        </div>
        <hr className={styles.hr_desktop} />
        <div className={styles.address_contact_social_container}>
          <div className={styles.address}>
            <p>Designo Central Office</p>
            <p>3886 Wellington Street</p>
            <p>Toronto, Ontario M9C 3J5</p>
          </div>
          <div className={styles.contact}>
            <p>Contact Us (Central Office)</p>
            <p>P : +1 253-863-8967</p>
            <p>
              M :{" "}
              <Link href="mailto:contact@designo.co">
                <a type="email">contact@designo.co</a>
              </Link>
            </p>
          </div>
          <div className={styles.social_links}>
            <Link href="http://facebook.com">
              <a>
                <FontAwesomeIcon
                  icon={faFacebookSquare}
                  className={styles.icon}
                />
              </a>
            </Link>
            <Link href="http://youtube.com">
              <a>
                <FontAwesomeIcon icon={faYoutube} className={styles.icon} />
              </a>
            </Link>
            <Link href="http://twitter.com">
              <a>
                <FontAwesomeIcon icon={faTwitter} className={styles.icon} />
              </a>
            </Link>
            <Link href="http://pinterest.com">
              <a>
                <FontAwesomeIcon icon={faPinterest} className={styles.icon} />
              </a>
            </Link>
            <Link href="http://instagram.com">
              <a>
                <FontAwesomeIcon icon={faInstagram} className={styles.icon} />
              </a>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
