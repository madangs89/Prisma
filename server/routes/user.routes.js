import express from "express";
import prisma from "../config/prism.config.js";

const userRouter = express.Router();

userRouter.post("/create", async (req, res) => {
  try {
    const { name, email, password_hash, usn, department_id } = req.body;

    if (!name || !email || !password_hash || !department_id) {
      return res
        .status(400)
        .json({ error: "Name, email, password hash, and USN are required" });
    }

    let isDepartmentExits = await prisma.department.findUnique({
      where: {
        id: department_id,
      },
    });

    if (!isDepartmentExits) {
      return res.status(400).json({ error: "Department not found" });
    }

    const newUser = await prisma.user.create({
      data: {
        name,
        email,
        password_hash,
        usn,
        department_id,
      },
    });

    if (!newUser) {
      return res.status(500).json({ error: "Failed to create user" });
    }

    return res.status(201).json({
      success: true,
      message: "User created successfully",
      data: newUser,
    });
  } catch (error) {
    console.error("Error creating user:", error);
    res
      .status(500)
      .json({ error: "An error occurred while creating the user" });
  }
});

export default userRouter;
