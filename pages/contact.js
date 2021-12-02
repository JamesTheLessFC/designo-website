import LocationLinks from "../components/LocationLinks";
import ContactForm from "../components/ContactForm";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import ContactModal from "../components/ContactModal";
import { useAddMessageMutation } from "../services/messages";
import styles from "../styles/page.module.scss";

export default function ContactPage() {
  const [addMessage, { isLoading, isSuccess, isError }] =
    useAddMessageMutation();

  return (
    <div className={styles.root}>
      <Navbar />
      <ContactForm addMessage={addMessage} />
      <LocationLinks />
      <Footer page="contact" />
      {(isSuccess || isError) && <ContactModal success={isSuccess} />}
    </div>
  );
}
