import Navbar from "../components/Navbar";
import GetInTouch from "../components/GetInTouch";
import Footer from "../components/Footer";
import AboutHero from "../components/AboutHero";
import AboutPageSection from "../components/AboutPageSection";
import talentImageMobile from "../public/assets/about/mobile/image-world-class-talent.jpg";
import realDealImageMobile from "../public/assets/about/mobile/image-real-deal.jpg";
import talentImageTablet from "../public/assets/about/tablet/image-world-class-talent.jpg";
import realDealImageTablet from "../public/assets/about/tablet/image-real-deal.jpg";
import talentImageDesktop from "../public/assets/about/desktop/image-world-class-talent.jpg";
import realDealImageDesktop from "../public/assets/about/desktop/image-real-deal.jpg";
import LocationLinks from "../components/LocationLinks";
import styles from "../styles/page.module.scss";

const content = {
  talent: {
    heading: "World-class talent",
    body1:
      "We are a crew of strategists, problem-solvers, and technologists. Every design is thoughtfully crafted from concept to launch, ensuring success in its given market. We are constantly updating our skills in a myriad of platforms.",
    body2:
      "Our team is multi-disciplinary and we are not merely interested in form — content and meaning are just as important. We give great importance to craftsmanship, service, and prompt delivery. Clients have always been impressed with our high-quality outcomes that encapsulates their brand’s story and mission.",
    imageMobile: talentImageMobile,
    imageTablet: talentImageTablet,
    imageDesktop: talentImageDesktop,
    alt: "Woman looking at photos taped to wall",
  },
  realDeal: {
    heading: "The real deal",
    body1:
      "As strategic partners in our clients’ businesses, we are ready to take on any challenge as our own. Solving real problems require empathy and collaboration, and we strive to bring a fresh perspective to every opportunity. We make design and technology more accessible and give you tools to measure success.",
    body2:
      "We are visual storytellers in appealing and captivating ways. By combining business and marketing strategies, we inspire audiences to take action and drive real results.",
    imageMobile: realDealImageMobile,
    imageTablet: realDealImageTablet,
    imageDesktop: realDealImageDesktop,
    alt: "Hands adjusting photos taped to wall",
  },
};

export default function AboutPage() {
  return (
    <div className={styles.root}>
      <Navbar />
      <AboutHero />
      <AboutPageSection content={content.talent} />
      <LocationLinks />
      <AboutPageSection content={content.realDeal} />
      <GetInTouch />
      <Footer />
    </div>
  );
}
