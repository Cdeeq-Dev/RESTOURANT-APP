import { Request, Response, NextFunction } from 'express';
import { createOrderSchema } from '../schemas/orderSchema';
import * as orderService from '../services/orderService';

export const createOrder = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const parseResult = createOrderSchema.safeParse(req.body);
    if (!parseResult.success) {
      return res.status(400).json({
        success: false,
        message: 'Validation failed',
        errors: parseResult.error.flatten().fieldErrors,
      });
    }

    const order = await orderService.createOrder(parseResult.data);

    return res.status(201).json({
      success: true,
      message: 'Order placed successfully',
      data: order,
    });
  } catch (error: any) {
    if (error.statusCode) {
      return res.status(error.statusCode).json({
        success: false,
        message: error.message,
      });
    }
    return next(error);
  }
};

export const getOrderByOrderNumber = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const rawOrderNumber = req.params.orderNumber;
    const orderNumber = typeof rawOrderNumber === 'string' ? rawOrderNumber : Array.isArray(rawOrderNumber) ? rawOrderNumber[0] : '';

    if (!orderNumber) {
      return res.status(400).json({
        success: false,
        message: 'Order number is required',
      });
    }

    const order = await orderService.getOrderByOrderNumber(orderNumber);

    if (!order) {
      return res.status(404).json({
        success: false,
        message: 'Order not found',
      });
    }

    return res.status(200).json({
      success: true,
      data: order,
    });
  } catch (error) {
    return next(error);
  }
};
