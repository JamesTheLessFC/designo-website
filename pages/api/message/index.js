import { prisma } from "../../../db";
import fetch from "node-fetch";
import SibApiV3Sdk from "sib-api-v3-sdk";

export const sendConfirmationEmail = async (message) => {
  try {
    let defaultClient = SibApiV3Sdk.ApiClient.instance;

    let apiKey = defaultClient.authentications["api-key"];
    apiKey.apiKey = process.env.SEND_IN_BLUE_API_KEY;

    let apiInstance = new SibApiV3Sdk.TransactionalEmailsApi();

    let sendSmtpEmail = new SibApiV3Sdk.SendSmtpEmail();

    sendSmtpEmail.subject = "{{params.subject}}";
    sendSmtpEmail.htmlContent =
      "<html><body><p>Hello {{params.name}},</p><p>Thank you for reaching out to our team at Designo! We received the following message from you on {{params.date}}:</p><p style='background-color:AliceBlue;padding:24px;border-radius:8px'><em>{{params.message}}</em></p><p>Please give us 48 hours to respond to your message. In the meantime, feel free to contact us regarding any other questions/concerns at <a href='mailto:contact@designo.com'>contact@designo.com</a>.<p style='color:#e88069;'><em>From the Team at Designo</em></p></body></html>";
    sendSmtpEmail.sender = {
      name: "No Reply",
      email: process.env.EMAIL_FROM,
    };
    sendSmtpEmail.to = [{ email: message.email, name: message.name }];
    sendSmtpEmail.params = {
      name: message.name,
      email: message.email,
      message: message.message,
      date: new Date().toLocaleDateString("en-US", { dateStyle: "long" }),
      subject: "Thank You for Contacting Designo",
    };
    const data = await apiInstance.sendTransacEmail(sendSmtpEmail);
    return {
      success: true,
    };
  } catch (err) {
    console.error(err);
    return {
      success: false,
    };
  }
};

export default async function handler(req, res) {
  if (req.method === "POST") {
    const { name, email, phone, message, captcha } = req.body;
    if (!name || !email || !phone || !message || !captcha) {
      return res.status(400).json({ message: "Missing required fields" });
    }
    try {
      // Ping the google recaptcha verify API to verify the captcha code
      const response = await fetch(
        `https://www.google.com/recaptcha/api/siteverify?secret=${process.env.RECAPTCHA_SECRET_KEY}&response=${captcha}`,
        {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded; charset=utf-8",
          },
          method: "POST",
        }
      );
      const captchaValidation = await response.json();
      if (captchaValidation.success) {
        const newMessageResult = await prisma.message.create({
          data: {
            name,
            email,
            phone,
            message,
          },
          select: {
            id: true,
          },
        });
        const confirmation = await sendConfirmationEmail({
          name,
          email,
          message,
        });
        return res.status(201).json({
          id: newMessageResult.id,
          confirmationSent: confirmation.success,
        });
      } else {
        return res.status(400).json({ message: "Invalid captcha code" });
      }
    } catch (err) {
      console.error(err);
      return res.status(500).json({ message: "Something went wrong" });
    }
  }
}
