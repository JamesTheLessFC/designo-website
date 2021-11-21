import styles from "../styles/GetInTouch.module.scss";

export default function GetInTouch({ pageType }) {
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
      <button>Get in touch</button>
    </div>
  );
}
