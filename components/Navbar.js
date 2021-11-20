import styles from "../styles/Navbar.module.scss";
import Image from "next/image";
import logo_dark from "../public/assets/shared/desktop/logo-dark.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faTimes } from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";
import { useState } from "react";

export default function Navbar() {
  const [showMobileMenu, setShowMobileMenu] = useState(false);

  const toggleMobileMenu = () => {
    setShowMobileMenu((prevState) => !prevState);
  };

  const menu = (
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
    </ul>
  );

  return (
    <div
      className={`${styles.root} ${
        showMobileMenu ? styles.root_with_mobile_menu : ""
      }`}
    >
      <div className={styles.bar}>
        <Link href="/">
          <a>
            <Image src={logo_dark} alt="logo" height={26} width={194.52} />
          </a>
        </Link>

        <div className={styles.desktop_menu}>{menu}</div>
        <button onClick={toggleMobileMenu}>
          <FontAwesomeIcon
            icon={showMobileMenu ? faTimes : faBars}
            className={styles.bars_icon}
          />
        </button>
      </div>
      <div
        className={`${styles.mobile_menu} ${
          !showMobileMenu ? styles.mobile_menu_hidden : ""
        }`}
      >
        {menu}
      </div>
    </div>
  );
}
