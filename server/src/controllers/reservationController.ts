import { Request, Response, NextFunction } from 'express';
import { createReservationSchema } from '../schemas/reservationSchema';
import * as reservationService from '../services/reservationService';

export const createReservation = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const parseResult = createReservationSchema.safeParse(req.body);
    if (!parseResult.success) {
      return res.status(400).json({
        success: false,
        message: 'Validation failed',
        errors: parseResult.error.flatten().fieldErrors,
      });
    }

    const reservation = await reservationService.createReservation(parseResult.data);

    return res.status(201).json({
      success: true,
      message: 'Reservation submitted successfully',
      data: reservation,
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

export const getReservationByNumber = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const rawNumber = req.params.reservationNumber;
    const reservationNumber = typeof rawNumber === 'string' ? rawNumber : Array.isArray(rawNumber) ? rawNumber[0] : '';

    if (!reservationNumber) {
      return res.status(400).json({
        success: false,
        message: 'Reservation number is required',
      });
    }

    const reservation = await reservationService.getReservationByNumber(reservationNumber);

    if (!reservation) {
      return res.status(404).json({
        success: false,
        message: 'Reservation not found',
      });
    }

    return res.status(200).json({
      success: true,
      data: reservation,
    });
  } catch (error) {
    return next(error);
  }
};
