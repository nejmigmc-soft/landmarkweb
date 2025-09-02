import { PrismaClient, PropertyType, PropertyStatus, Currency } from "@prisma/client";

const globalAny = global as unknown as { __prisma?: PrismaClient };
export const prisma =
  globalAny.__prisma ??
  new PrismaClient({ log: ["warn", "error"] });
if (!globalAny.__prisma) globalAny.__prisma = prisma;

// Re-export enums for API convenience
export { PropertyType, PropertyStatus, Currency };
