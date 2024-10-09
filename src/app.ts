import express, { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
import categoryRoutes from "./routes/categoryRoutes.js";
import postRoutes from "./routes/postRoutes.js";
import commentRoutes from "./routes/commentRoutes.js";
import tagRoutes from "./routes/tagRoutes.js";

const app = express();
const port = process.env.PORT || 3000;

const prisma = new PrismaClient();

app.use(express.json());

app.use("/categories", categoryRoutes);
app.use("/posts", postRoutes);
app.use("/comments", commentRoutes);
app.use("/tags", tagRoutes);

app.get("/", (req: Request, res: Response) => {
  res.send("Hello Tsc");
});

app.listen(port, () => {
  console.log("Sunucu ayakta");
});
