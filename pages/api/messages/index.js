import { prisma } from "../../../db";

export default async function handler(req, res) {
  if (req.method === "GET") {
    try {
      const maxPerPage = 10;
      const orderByValue =
        req.query.sortBy === "date"
          ? { createdAt: "desc" }
          : { [req.query.sortBy]: "asc" };
      const count = await prisma.message.count();
      const messages = await prisma.message.findMany({
        take: maxPerPage,
        skip: (Number(req.query.page) - 1) * maxPerPage,
        orderBy: orderByValue,
      });
      return res.status(200).json({ messages, count });
    } catch (err) {
      return res.status(500).json({ message: "Something went wrong" });
    }
  } else if (req.method === "DELETE") {
    try {
      const messageIds = req.query.ids.split(",").map((id) => Number(id));
      await prisma.message.deleteMany({
        where: {
          id: {
            in: messageIds,
          },
        },
      });
      return res.status(200).json({ messageIds });
    } catch (err) {
      return res.status(500).json({ message: "Something went wrong" });
    }
  } else if (req.method === "PATCH") {
    try {
      const updates = {};
      const messageIds = req.body.messageIds;
      if (Object.keys(req.body.updates).includes("read")) {
        updates.read = req.body.updates.read;
      }
      if (Object.keys(req.body.updates).includes("important")) {
        updates.important = req.body.updates.important;
      }
      await prisma.message.updateMany({
        where: {
          id: {
            in: messageIds,
          },
        },
        data: updates,
      });
      return res.status(200).json({ messageIds });
    } catch (err) {
      return res.status(500).json({ message: "Something went wrong" });
    }
  }
}
