import { PhoneNumberUtil } from "google-libphonenumber";

const phoneUtil = PhoneNumberUtil.getInstance();

const isValidPhoneNumber = (phone) => {
  try {
    const parsedPhone = phoneUtil.parse(phone, "US");
    return phoneUtil.isPossibleNumber(parsedPhone);
  } catch (err) {
    return false;
  }
};

const isEmpty = (value) => {
  return String(value).trim() === "";
};

const isValidEmail = (emailAddress) => {
  const sQtext = "[^\\x0d\\x22\\x5c\\x80-\\xff]";
  const sDtext = "[^\\x0d\\x5b-\\x5d\\x80-\\xff]";
  const sAtom =
    "[^\\x00-\\x20\\x22\\x28\\x29\\x2c\\x2e\\x3a-\\x3c\\x3e\\x40\\x5b-\\x5d\\x7f-\\xff]+";
  const sQuotedPair = "\\x5c[\\x00-\\x7f]";
  const sDomainLiteral = "\\x5b(" + sDtext + "|" + sQuotedPair + ")*\\x5d";
  const sQuotedString = "\\x22(" + sQtext + "|" + sQuotedPair + ")*\\x22";
  const sDomain_ref = sAtom;
  const sSubDomain = "(" + sDomain_ref + "|" + sDomainLiteral + ")";
  const sWord = "(" + sAtom + "|" + sQuotedString + ")";
  const sDomain = sSubDomain + "(\\x2e" + sSubDomain + ")*";
  const sLocalPart = sWord + "(\\x2e" + sWord + ")*";
  const sAddrSpec = sLocalPart + "\\x40" + sDomain; // complete RFC822 email address spec
  const sValidEmail = "^" + sAddrSpec + "$"; // as whole string

  const reValidEmail = new RegExp(sValidEmail);

  return reValidEmail.test(emailAddress);
};

const isWithinCharLimit = (value, limit) => {
  const valueLength = value.length;
  if (valueLength <= limit) return true;
  return false;
};

export const validateContactForm = (name, email, phone, message) => {
  const errors = {};
  const emptyMessage = "Must not be empty";

  if (isEmpty(name)) {
    errors.name = emptyMessage;
  } else if (!isWithinCharLimit(name, 70)) {
    errors.name = "Must be 70 characters or less";
  }
  if (isEmpty(email)) {
    errors.email = emptyMessage;
  } else if (!isValidEmail(email)) {
    errors.email = "Invalid email address";
  }
  if (isEmpty(phone)) {
    errors.phone = emptyMessage;
  } else if (!isValidPhoneNumber(phone)) {
    errors.phone = "Invalid phone number";
  }
  if (isEmpty(message)) {
    errors.message = emptyMessage;
  } else if (!isWithinCharLimit(message, 500)) {
    errors.message = "Must be 500 characters or less";
  }

  return {
    valid: Object.keys(errors).length === 0,
    errors,
  };
};
