import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { prisma } from '../lib/prisma';
import type { AdminLoginInput } from '../schemas/adminSchema';
import type { AdminJwtPayload, AuthenticatedAdmin } from '../types/auth';

const ADMIN_SELECT = {
  id: true,
  name: true,
  email: true,
  role: true,
  createdAt: true,
  updatedAt: true,
} as const;

export class AuthServiceError extends Error {
  statusCode: number;

  constructor(message: string, statusCode = 500) {
    super(message);
    this.statusCode = statusCode;
  }
}

function getJwtSecret(): string {
  const secret = process.env.JWT_SECRET;
  if (!secret) {
    throw new AuthServiceError('Authentication service is not configured', 500);
  }
  return secret;
}

function toAuthenticatedAdmin(admin: {
  id: string;
  name: string;
  email: string;
  role: AuthenticatedAdmin['role'];
  createdAt: Date;
  updatedAt: Date;
}): AuthenticatedAdmin {
  return {
    id: admin.id,
    name: admin.name,
    email: admin.email,
    role: admin.role,
    createdAt: admin.createdAt,
    updatedAt: admin.updatedAt,
  };
}

export async function authenticateAdmin(
  input: AdminLoginInput
): Promise<{ token: string; admin: AuthenticatedAdmin }> {
  const adminRecord = await prisma.admin.findUnique({
    where: { email: input.email },
  });

  if (!adminRecord) {
    throw new AuthServiceError('Invalid email or password', 401);
  }

  const passwordMatches = await bcrypt.compare(input.password, adminRecord.passwordHash);
  if (!passwordMatches) {
    throw new AuthServiceError('Invalid email or password', 401);
  }

  const payload: AdminJwtPayload = {
    sub: adminRecord.id,
    email: adminRecord.email,
    role: adminRecord.role,
  };

  const token = jwt.sign(payload, getJwtSecret(), { expiresIn: '8h' });

  return {
    token,
    admin: toAuthenticatedAdmin(adminRecord),
  };
}

export async function getAdminById(id: string): Promise<AuthenticatedAdmin | null> {
  const admin = await prisma.admin.findUnique({
    where: { id },
    select: ADMIN_SELECT,
  });

  return admin ? toAuthenticatedAdmin(admin) : null;
}
