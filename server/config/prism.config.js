import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default prisma;
export const connectPrisma = async () => {
  try {
    await prisma.$connect();
    console.log("Prisma connected");
  } catch (error) {
    console.error("Error connecting to Prisma:", error);
  }
};
