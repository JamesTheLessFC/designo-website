import Navbar from "../components/Navbar";
import Categories from "../components/Categories";
import GetInTouch from "../components/GetInTouch";
import Footer from "../components/Footer";
import CategoryHeader from "../components/CategoryHeader";
import ProjectList from "../components/ProjectList";
import styles from "../styles/CategoryPage.module.scss";
import HeadComponent from "../components/HeadComponent";

export default function GraphicDesignPage() {
  return (
    <div className={styles.root}>
      <HeadComponent title="Designo - Graphic Design" />
      <div className={styles.shape1}></div>
      <Navbar />
      <CategoryHeader category="graphic" />
      <ProjectList category="graphic" />
      <Categories categories={["web design", "app design"]} />
      <GetInTouch />
      <Footer />
    </div>
  );
}
