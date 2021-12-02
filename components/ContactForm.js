import styles from "../styles/ContactForm.module.scss";
import { useState, useRef } from "react";
import { validateContactForm } from "../util/validators";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faExclamationCircle } from "@fortawesome/free-solid-svg-icons";
import ReCAPTCHA from "react-google-recaptcha";

export default function ContactForm({ addMessage }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");
  const [errors, setErrors] = useState({});
  const recaptchaRef = useRef(null);

  const onReCAPTCHAChange = async (captchaCode) => {
    if (!captchaCode) {
      return;
    }
    const requestBody = {
      name,
      email,
      phone,
      message,
      captcha: captchaCode,
    };
    // const response = await fetch("/api/message", {
    //   method: "POST",
    //   headers: {
    //     "Content-Type": "application/json",
    //   },
    //   body: JSON.stringify(requestBody),
    // });
    const response = await addMessage(requestBody);
    recaptchaRef.current.reset();
    resetForm();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationResults = validateContactForm(name, email, phone, message);
    if (!validationResults.valid) {
      return setErrors(validationResults.errors);
    }
    recaptchaRef.current.execute();
  };

  const resetForm = () => {
    setName("");
    setEmail("");
    setPhone("");
    setMessage("");
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
      <form onSubmit={handleSubmit}>
        <div>
          <input
            type="text"
            placeholder="Name"
            maxLength={70}
            onChange={handleNameChange}
            className={name === "" ? styles.empty : ""}
            value={name}
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
            className={email === "" ? styles.empty : ""}
            value={email}
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
          <input
            type="text"
            placeholder="Phone"
            onChange={handlePhoneChange}
            className={phone === "" ? styles.empty : ""}
            value={phone}
          />
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
            value={message}
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
        <ReCAPTCHA
          ref={recaptchaRef}
          sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY}
          size="invisible"
          onChange={onReCAPTCHAChange}
        />
        <button type="submit" onClick={handleSubmit}>
          Submit
        </button>
      </form>
    </div>
  );
}
