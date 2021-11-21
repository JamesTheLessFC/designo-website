import styles from "../styles/Home.module.scss";
import Navbar from "../components/Navbar";
import Categories from "../components/Categories";
import GetInTouch from "../components/GetInTouch";
import Footer from "../components/Footer";
import CategoryHeader from "../components/CategoryHeader";
import ProjectList from "../components/ProjectList";

export default function WebDesignPage() {
  return (
    <div className={styles.root}>
      <Navbar />
      <CategoryHeader category="web" />
      <ProjectList category="web" />
      <Categories categories={["app design", "graphic design"]} />
      <GetInTouch />
      <Footer />
    </div>
  );
}
