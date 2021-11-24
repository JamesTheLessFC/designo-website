import styles from "../styles/LocationLinks.module.scss";
import canadaImage from "../public/assets/shared/desktop/illustration-canada.svg";
import ukImage from "../public/assets/shared/desktop/illustration-united-kingdom.svg";
import australiaImage from "../public/assets/shared/desktop/illustration-australia.svg";
import Image from "next/image";
import { useRouter } from "next/router";

const locations = [
  {
    name: "Canada",
    image: canadaImage,
    url: "/locations",
  },
  {
    name: "Australia",
    image: australiaImage,
    url: "/locations",
  },
  {
    name: "United Kingdom",
    image: ukImage,
    url: "/locations",
  },
];

export default function LocationLinks() {
  const router = useRouter();

  return (
    <ul className={styles.root}>
      {locations.map((location) => (
        <li key={location.name}>
          <div className={styles.circle}></div>
          <Image src={location.image} alt={location.name} />
          <h3>{location.name}</h3>
          <button role="link" onClick={() => router.push(location.url)}>
            See Location
          </button>
        </li>
      ))}
    </ul>
  );
}
