"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
const DATABASE_URL = process.env.DATABASE_URL ?? '';
console.log('Loaded DATABASE_URL:', DATABASE_URL ? DATABASE_URL.replace(/(\/\/.*:).*@/, '$1***@') : 'NOT SET');
if (!DATABASE_URL) {
    throw new Error('DATABASE_URL environment variable is not set.');
}
const prisma = new client_1.PrismaClient({
    datasources: {
        db: {
            url: DATABASE_URL,
        },
    },
});
exports.default = prisma;
