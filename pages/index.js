import Image from "next/image";
import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import Categories from "../components/Categories";
import Adjectives from "../components/Adjectives";
import GetInTouch from "../components/GetInTouch";
import Footer from "../components/Footer";

export default function Home() {
  return (
    <div>
      <Navbar />
      <Hero />
      <Categories categories={["web design", "app design", "graphic design"]} />
      <Adjectives />
      <GetInTouch />
      <Footer />
    </div>
  );
}
