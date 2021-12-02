import LocationList from "../components/LocationList";
import Navbar from "../components/Navbar";
import GetInTouch from "../components/GetInTouch";
import Footer from "../components/Footer";
import styles from "../styles/page.module.scss";

export default function LocationsPage() {
  return (
    <div className={styles.root}>
      <Navbar />
      <LocationList />
      <GetInTouch />
      <Footer />
    </div>
  );
}
