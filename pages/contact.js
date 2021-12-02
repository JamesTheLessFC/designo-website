import LocationLinks from "../components/LocationLinks";
import ContactForm from "../components/ContactForm";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import ContactModal from "../components/ContactModal";
import { useAddMessageMutation } from "../services/messages";

export default function ContactPage() {
  const [addMessage, { isLoading, isSuccess, isError }] =
    useAddMessageMutation();

  return (
    <div>
      <Navbar />
      <ContactForm addMessage={addMessage} />
      <LocationLinks />
      <Footer page="contact" />
      {(isSuccess || isError) && <ContactModal success={isSuccess} />}
    </div>
  );
}
