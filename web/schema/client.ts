// SERVER ONLY
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();
// let prisma: PrismaClient;
//
// if (process.env.NODE_ENV === 'production') {
//   prisma = new PrismaClient();
// } else {
//   if (!global.prisma) {
//     global.prisma = new PrismaClient();
//   }
//   prisma = global.prisma;
// }

export default prisma;
