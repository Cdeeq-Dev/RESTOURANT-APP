import type { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { getAdminById } from '../services/adminAuthService';
import type { AdminJwtPayload } from '../types/auth';

function getJwtSecret(): string | null {
  return process.env.JWT_SECRET ?? null;
}

export async function authenticateAdminToken(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<Response | void> {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({
      success: false,
      message: 'Authentication token is required',
    });
  }

  const token = authHeader.slice('Bearer '.length).trim();
  if (!token) {
    return res.status(401).json({
      success: false,
      message: 'Authentication token is required',
    });
  }

  const secret = getJwtSecret();
  if (!secret) {
    return res.status(500).json({
      success: false,
      message: 'Authentication service is not configured',
    });
  }

  try {
    const decoded = jwt.verify(token, secret) as jwt.JwtPayload & Partial<AdminJwtPayload>;
    if (!decoded.sub || typeof decoded.sub !== 'string') {
      return res.status(401).json({
        success: false,
        message: 'Invalid authentication token',
      });
    }

    const admin = await getAdminById(decoded.sub);
    if (!admin) {
      return res.status(401).json({
        success: false,
        message: 'Invalid authentication token',
      });
    }

    req.admin = admin;
    return next();
  } catch (error) {
    if (error instanceof jwt.TokenExpiredError) {
      return res.status(401).json({
        success: false,
        message: 'Authentication token has expired',
      });
    }

    return res.status(401).json({
      success: false,
      message: 'Invalid authentication token',
    });
  }
}
