import LocationLinks from "../components/LocationLinks";
import ContactForm from "../components/ContactForm";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import ContactModal from "../components/ContactModal";
import { useState } from "react";

export default function ContactPage() {
  const [showModal, setShowModal] = useState(false);
  const [messageSuccess, setMessageSuccess] = useState(false);

  return (
    <div>
      <Navbar />
      <ContactForm
        setShowModal={setShowModal}
        setMessageSuccess={setMessageSuccess}
      />
      <LocationLinks />
      <Footer page="contact" />
      {showModal && <ContactModal success={messageSuccess} />}
    </div>
  );
}
