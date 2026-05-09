import { PrismaClient } from '@prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';
import { Pool } from 'pg';

// Using the pg adapter which proved to work in the seed script
const pool = new Pool({ 
  connectionString: process.env.DATABASE_URL,
  max: 20,
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 2000,
});

const adapter = new PrismaPg(pool);

// Explicitly casting for compatibility with Prisma 7.x adapter types
const prisma = new PrismaClient({ adapter: adapter as any });

export default prisma;
