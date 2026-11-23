import type { NextFunction, Request, Response } from 'express';
import type { AdminRole } from '@prisma/client';

export function authorizeAdminRoles(...allowedRoles: AdminRole[]) {
  return (req: Request, res: Response, next: NextFunction): Response | void => {
    if (!req.admin) {
      return res.status(401).json({
        success: false,
        message: 'Authentication is required',
      });
    }

    if (!allowedRoles.includes(req.admin.role)) {
      return res.status(403).json({
        success: false,
        message: 'You do not have permission to access this resource',
      });
    }

    return next();
  };
}
