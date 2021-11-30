import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

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
  }
}
