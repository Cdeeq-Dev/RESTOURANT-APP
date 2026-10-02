import { Request, Response, NextFunction } from 'express';

export const errorHandler = (
  err: any,
  req: Request,
  res: Response,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  next: NextFunction
) => {
  console.error('Unhandled Error:', err);

  const statusCode = err.statusCode || err.status || 500;
  const message = statusCode === 500 ? 'Internal Server Error' : err.message;

  return res.status(statusCode).json({
    success: false,
    message,
  });
};

export const notFoundHandler = (req: Request, res: Response) => {
  return res.status(404).json({
    success: false,
    message: `Route ${req.originalUrl} not found`,
  });
};
