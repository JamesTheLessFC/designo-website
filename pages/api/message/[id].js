import { prisma } from "../../../db";

export default async function handler(req, res) {
  const messageId = Number(req.query.id);
  if (req.method === "PATCH") {
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
    return res.status(200).json({ message: "Update successful" });
  }
}
