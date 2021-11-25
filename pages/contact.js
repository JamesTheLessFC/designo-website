import LocationLinks from "../components/LocationLinks";
import ContactForm from "../components/ContactForm";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export default function ContactPage() {
  return (
    <div>
      <Navbar />
      <ContactForm />
      <LocationLinks />
      <Footer page="contact" />
    </div>
  );
}
