import Navbar from "../components/Navbar";
import Categories from "../components/Categories";
import GetInTouch from "../components/GetInTouch";
import Footer from "../components/Footer";
import CategoryHeader from "../components/CategoryHeader";
import ProjectList from "../components/ProjectList";
import styles from "../styles/CategoryPage.module.scss";
import HeadComponent from "../components/HeadComponent";

export default function Home() {
  return (
    <div className={styles.root}>
      <HeadComponent title="Designo - App Design" />
      <div className={styles.shape1}></div>
      <Navbar />
      <CategoryHeader category="app" />
      <ProjectList category="app" />
      <Categories categories={["web design", "graphic design"]} />
      <GetInTouch />
      <Footer />
    </div>
  );
}
