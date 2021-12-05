import LocationLinks from "../components/LocationLinks";
import ContactForm from "../components/ContactForm";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import ContactModal from "../components/ContactModal";
import { useAddMessageMutation } from "../services/messages";
import styles from "../styles/page.module.scss";
import HeadComponent from "../components/HeadComponent";

export default function ContactPage() {
  const [addMessage, { isLoading, isSuccess, isError, data }] =
    useAddMessageMutation();

  return (
    <div className={styles.root}>
      <HeadComponent title="Designo - Contact" />
      <Navbar />
      <ContactForm addMessage={addMessage} />
      <LocationLinks />
      <Footer page="contact" />
      {(isSuccess || isError) && (
        <ContactModal success={isSuccess} data={data} />
      )}
    </div>
  );
}
