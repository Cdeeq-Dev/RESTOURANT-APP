import type { AdminRole } from '@prisma/client';

export interface AuthenticatedAdmin {
  id: string;
  name: string;
  email: string;
  role: AdminRole;
  createdAt: Date;
  updatedAt: Date;
}

export interface AdminJwtPayload {
  sub: string;
  email: string;
  role: AdminRole;
}

declare global {
  namespace Express {
    interface Request {
      admin?: AuthenticatedAdmin;
    }
  }
}

export {};
