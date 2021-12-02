import { prisma } from "../../../db";
import fetch from "node-fetch";

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
        return res.status(201).json(newMessageResult);
      } else {
        return res.status(400).json({ message: "Invalid captcha code" });
      }
    } catch (err) {
      console.error(err);
      return res.status(500).json({ message: "Something went wrong" });
    }
  }
}
