import styles from "../styles/Project.module.scss";
import Image from "next/image";
import Link from "next/link";

export default function Project({ name, description, image }) {
  return (
    <li className={styles.root}>
      <Link href="#">
        <a>
          <Image src={image} alt={`${name} project screenshot`} />
          <div className={styles.text}>
            <h3>{name}</h3>
            <p>{description}</p>
          </div>
        </a>
      </Link>
    </li>
  );
}
