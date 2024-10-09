import express, { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

const app = express();
const port = 3000;
const prisma = new PrismaClient();

app.use(express.json());

app.post("/users", async (req: Request, res: Response) => {
  try {
    const { name, email } = req.body;
    const newUser = await prisma.user.create({
      data: { name, email },
    });
    console.log(newUser);
    res.status(201).json(newUser);
  } catch (error) {
    res.status(400).json({ error: "Hata Mesajııııı" });
  }
});

app.get("/users", async (req: Request, res: Response) => {
  try {
    const users = await prisma.user.findMany();
    res.json(users);
  } catch (error) {
    res.status(400).json({ error: "Hata Mesajııııı" });
  }
});

app.get("/users/:id", async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const user = await prisma.user.findUnique({
      where: {
        id: parseInt(id),
      },
    });
    if (user) {
      res.json(user);
    } else {
      res.status(404).json({ message: "User not found!" });
    }
  } catch (error) {}
});

app.get("/", (req: Request, res: Response) => {
  res.send("Hello Tsc");
});

app.listen(port, () => {
  console.log("Sunucu ayakta");
});
