import Navbar from "../components/Navbar";
import Categories from "../components/Categories";
import GetInTouch from "../components/GetInTouch";
import Footer from "../components/Footer";
import CategoryHeader from "../components/CategoryHeader";
import ProjectList from "../components/ProjectList";

export default function Home() {
  return (
    <div>
      <Navbar />
      <CategoryHeader category="app" />
      <ProjectList category="app" />
      <Categories categories={["web design", "graphic design"]} />
      <GetInTouch />
      <Footer />
    </div>
  );
}
