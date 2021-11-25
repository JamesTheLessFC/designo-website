import styles from "../styles/ContactForm.module.scss";
import { useState, useEffect } from "react";
import { validateContactForm } from "../util/validators";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faExclamationCircle } from "@fortawesome/free-solid-svg-icons";

export default function ContactForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");
  const [errors, setErrors] = useState({});

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationResults = validateContactForm(name, email, phone, message);
    if (!validationResults.valid) {
      setErrors(validationResults.errors);
    }
  };

  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePhoneChange = (e) => {
    setPhone(e.target.value);
  };

  const handleMessageChange = (e) => {
    setMessage(e.target.value);
  };

  return (
    <div className={styles.root}>
      <div>
        <h1>Contact Us</h1>
        <p>
          Ready to take it to the next level? Let’s talk about your project or
          idea and find out how we can help your business grow. If you are
          looking for unique digital experiences that’s relatable to your users,
          drop us a line.
        </p>
      </div>
      <form>
        <div>
          <input
            type="text"
            placeholder="Name"
            maxLength={70}
            onChange={handleNameChange}
          />
          {errors.name && (
            <p className={styles.error_message}>
              {errors.name}
              <FontAwesomeIcon
                className={styles.icon}
                icon={faExclamationCircle}
              />
            </p>
          )}
        </div>
        <div>
          <input
            type="text"
            placeholder="Email Address"
            onChange={handleEmailChange}
          />
          {errors.email && (
            <p className={styles.error_message}>
              {errors.email}
              <FontAwesomeIcon
                className={styles.icon}
                icon={faExclamationCircle}
              />
            </p>
          )}
        </div>
        <div>
          <input type="text" placeholder="Phone" onChange={handlePhoneChange} />
          {errors.phone && (
            <p className={styles.error_message}>
              {errors.phone}
              <FontAwesomeIcon
                className={styles.icon}
                icon={faExclamationCircle}
              />
            </p>
          )}
        </div>
        <div
          className={`${styles.textarea_container} ${
            message === "" ? styles.textarea_container_empty : ""
          }`}
        >
          <textarea
            placeholder="Message (up to 500 characters)"
            maxLength={500}
            onChange={handleMessageChange}
            rows={3}
          />
          {errors.message && (
            <p className={styles.error_message}>
              {errors.message}
              <FontAwesomeIcon
                className={styles.icon}
                icon={faExclamationCircle}
              />
            </p>
          )}
        </div>
        <button type="submit" onClick={handleSubmit}>
          Submit
        </button>
      </form>
    </div>
  );
}
