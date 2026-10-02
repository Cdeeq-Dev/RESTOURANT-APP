import { Request, Response, NextFunction } from 'express';
import { z } from 'zod';
import * as menuService from '../services/menuService';

const getMenuQuerySchema = z.object({
  category: z.string().optional(),
  featured: z
    .string()
    .optional()
    .transform((val) => {
      if (val === 'true') return true;
      if (val === 'false') return false;
      return undefined;
    }),
});

export const getMenuItems = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const parseResult = getMenuQuerySchema.safeParse(req.query);
    if (!parseResult.success) {
      return res.status(400).json({
        success: false,
        message: 'Invalid query parameters',
        errors: parseResult.error.flatten().fieldErrors,
      });
    }

    const { category, featured } = parseResult.data;
    const menuItems = await menuService.getMenuItems({
      categorySlug: category,
      featured,
    });

    return res.status(200).json({
      success: true,
      data: menuItems,
    });
  } catch (error) {
    return next(error);
  }
};

export const getFeaturedItems = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const featuredItems = await menuService.getFeaturedMenuItems();
    return res.status(200).json({
      success: true,
      data: featuredItems,
    });
  } catch (error) {
    return next(error);
  }
};

export const getMenuItemBySlug = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const rawSlug = req.params.slug;
    const slug = typeof rawSlug === 'string' ? rawSlug : Array.isArray(rawSlug) ? rawSlug[0] : '';

    if (!slug) {
      return res.status(400).json({
        success: false,
        message: 'Menu item slug is required',
      });
    }

    const menuItem = await menuService.getMenuItemBySlug(slug);

    if (!menuItem) {
      return res.status(404).json({
        success: false,
        message: 'Menu item not found',
      });
    }

    return res.status(200).json({
      success: true,
      data: menuItem,
    });
  } catch (error) {
    return next(error);
  }
};
