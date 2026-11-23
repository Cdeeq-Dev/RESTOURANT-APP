import type { NextFunction, Request, Response } from 'express';
import { adminLoginSchema } from '../schemas/adminSchema';
import { AuthServiceError, authenticateAdmin } from '../services/adminAuthService';

export async function loginAdmin(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<Response | void> {
  try {
    const parseResult = adminLoginSchema.safeParse(req.body);
    if (!parseResult.success) {
      return res.status(400).json({
        success: false,
        message: 'Validation failed',
        errors: parseResult.error.flatten().fieldErrors,
      });
    }

    const result = await authenticateAdmin(parseResult.data);

    return res.status(200).json({
      success: true,
      message: 'Login successful',
      data: result,
    });
  } catch (error) {
    if (error instanceof AuthServiceError) {
      return res.status(error.statusCode).json({
        success: false,
        message: error.message,
      });
    }

    return next(error);
  }
}

export async function getCurrentAdmin(
  req: Request,
  res: Response
): Promise<Response> {
  return res.status(200).json({
    success: true,
    data: req.admin,
  });
}
