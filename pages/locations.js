import LocationList from "../components/LocationList";
import Navbar from "../components/Navbar";
import GetInTouch from "../components/GetInTouch";
import Footer from "../components/Footer";

export default function LocationsPage() {
  return (
    <div>
      <Navbar />
      <LocationList />
      <GetInTouch />
      <Footer />
    </div>
  );
}
