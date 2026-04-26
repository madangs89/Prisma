import express from "express";
import dotenv from "dotenv";
dotenv.config();
import prisma, { connectPrisma } from "./config/prism.config.js";

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.send("Hello, World!");
});

app.get("/create", async (req, res) => {
  await prisma.user.create({
    data: {
      name: "Madana",
      email: "madangsnaik@gmail.com",
    },
  });
  res.send("User created");
});

app.get("/users", async (req, res) => {
  const users = await prisma.user.findMany({
    include: {
      posts: true,
    },
  });
  res.json(users);
});

app.get("/post", async (req, res) => {
  await prisma.post.create({
    data: {
      title: "My First Post 2",
      content: "This is the content of my first post.",
      authorId: 1,
    },
  });
  res.send("Post created");
});

app.listen(3000, async () => {
  await connectPrisma();
  console.log("Server is running on port 3000");
});
