import { Request, Response, NextFunction } from 'express';
import * as categoryService from '../services/categoryService';

export const getCategories = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const categories = await categoryService.getAllCategories();
    return res.status(200).json({
      success: true,
      data: categories,
    });
  } catch (error) {
    return next(error);
  }
};
