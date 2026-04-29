import express from "express";
import prisma from "../config/prism.config.js";

const departmentRouter = express.Router();

departmentRouter.post("/create", async (req, res) => {
  try {
    const { name, code } = req.body;

    if (!name || !code) {
      return res.status(400).json({ error: "Name and code are required" });
    }

    const newDepartment = await prisma.department.create({
      data: {
        name,
        code,
      },
    });

    if (!newDepartment) {
      return res.status(500).json({ error: "Failed to create department" });
    }

    res.status(201).json({
      success: true,
      message: "Department created successfully",
      data: newDepartment,
    });
  } catch (error) {
    console.error("Error creating department:", error);
    res
      .status(500)
      .json({ error: "An error occurred while creating the department" });
  }
});



export default departmentRouter;
