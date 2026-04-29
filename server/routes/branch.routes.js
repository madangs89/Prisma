import express from "express";
import prisma from "../config/prism.config.js";
import { Prisma } from "@prisma/client";

const branchRouter = express.Router();

branchRouter.get("/all", async (req, res) => {
  try {
    const branches = await prisma.branch.findMany({
      include: {
        department: true,
      },
    });
    return res.status(200).json({
      success: true,
      data: branches,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      error: "Something went wrong",
    });
  }
});
branchRouter.post("/create", async (req, res) => {
  try {
    const { department_id, name, code } = req.body;

    if (!department_id || !name || !code) {
      return res.status(400).json({
        error: "Department ID, name, and code are required",
      });
    }

    const newBranch = await prisma.branch.create({
      data: {
        department_id,
        name,
        code,
      },
    });

    return res.status(201).json({
      success: true,
      message: "Branch created successfully",
      data: newBranch,
    });
  } catch (error) {
    console.error(error);

    // 🔥 HANDLE ERRORS PROPERLY
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      // Duplicate (unique constraint)
      if (error.code === "P2002") {
        return res.status(400).json({
          error: "Branch with same name or code already exists",
        });
      }

      // Foreign key error
      if (error.code === "P2003") {
        return res.status(400).json({
          error: "Invalid department_id (Department not found)",
        });
      }
    }

    return res.status(500).json({
      error: "Something went wrong",
    });
  }
});

export default branchRouter;
