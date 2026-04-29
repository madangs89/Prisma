import express from "express";
import dotenv from "dotenv";
dotenv.config();
import prisma, { connectPrisma } from "./config/prism.config.js";
import departmentRouter from "./routes/department.routes.js";
import userRouter from "./routes/user.routes.js";

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.send("Hello, World!");
});

app.use("/api/department", departmentRouter);
app.use("/api/user", userRouter);

app.listen(3000, async () => {
  await connectPrisma();
  console.log("Server is running on port 3000");
});
