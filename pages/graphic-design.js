import Navbar from "../components/Navbar";
import Categories from "../components/Categories";
import GetInTouch from "../components/GetInTouch";
import Footer from "../components/Footer";
import CategoryHeader from "../components/CategoryHeader";
import ProjectList from "../components/ProjectList";

export default function GraphicDesignPage() {
  return (
    <div>
      <Navbar />
      <CategoryHeader category="graphic" />
      <ProjectList category="graphic" />
      <Categories categories={["web design", "app design"]} />
      <GetInTouch />
      <Footer />
    </div>
  );
}
