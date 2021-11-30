import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function handler(req, res) {
  if (req.method === "GET") {
    console.log(req.query);
    const count = await prisma.message.count();
    const messages = await prisma.message.findMany({
      take: 5,
      skip: (Number(req.query.page) - 1) * 5,
      orderBy: {
        createdAt: "desc",
      },
    });
    return res.status(200).json({ messages, count });
  }
}
