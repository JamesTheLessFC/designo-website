import styles from "../styles/GetInTouch.module.scss";
import { useRouter } from "next/router";

export default function GetInTouch({ pageType }) {
  const router = useRouter();
  return (
    <div className={`${styles.root} ${styles[`root_${pageType}`]}`}>
      <div className={styles.text}>
        <h1>
          Let&apos;s talk about
          <br />
          your project
        </h1>
        <p>
          Ready to take it to the next level? Contact us today and find out how
          our expertise can help your business grow.
        </p>
      </div>
      <button onClick={() => router.push("/contact")}>Get in touch</button>
    </div>
  );
}
