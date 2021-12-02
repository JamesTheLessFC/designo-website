import { prisma } from "../../../db";

export default async function handler(req, res) {
  if (req.method === "GET") {
    const maxPerPage = 10;
    const count = await prisma.message.count();
    const messages = await prisma.message.findMany({
      take: maxPerPage,
      skip: (Number(req.query.page) - 1) * maxPerPage,
      orderBy: {
        createdAt: "desc",
      },
    });
    return res.status(200).json({ messages, count });
  } else if (req.method === "DELETE") {
    const messageIds = req.query.ids.split(",").map((id) => Number(id));
    await prisma.message.deleteMany({
      where: {
        id: {
          in: messageIds,
        },
      },
    });
    return res.status(200).json({ messageIds });
  } else if (req.method === "PATCH") {
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
  }
}
