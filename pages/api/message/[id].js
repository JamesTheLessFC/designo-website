import { prisma } from "../../../db";
import { getSession } from "next-auth/react";

export default async function handler(req, res) {
  const session = await getSession({ req });
  if (!session) {
    return res.status(401).end();
  }
  const messageId = Number(req.query.id);
  if (req.method === "PATCH") {
    try {
      const updates = {};
      if (Object.keys(req.body.updates).includes("read")) {
        updates.read = req.body.updates.read;
      }
      if (Object.keys(req.body.updates).includes("important")) {
        updates.important = req.body.updates.important;
      }
      await prisma.message.update({
        where: {
          id: messageId,
        },
        data: updates,
      });
      return res.status(200).json({ messageId });
    } catch (err) {
      return res.status(500).json({ message: "Something went wrong" });
    }
  }
}
