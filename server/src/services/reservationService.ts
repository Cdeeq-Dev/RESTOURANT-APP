import { ReservationStatus } from '@prisma/client';
import { prisma } from '../lib/prisma';
import { CreateReservationInput } from '../schemas/reservationSchema';
import { generateReservationNumber } from '../utils/reservationNumber';

export const createReservation = async (input: CreateReservationInput) => {
  let attempts = 0;
  while (attempts < 3) {
    try {
      const reservationNumber = generateReservationNumber();

      const reservation = await prisma.reservation.create({
        data: {
          reservationNumber,
          customerName: input.customerName,
          phone: input.phone,
          email: input.email && input.email.trim() !== '' ? input.email : null,
          reservationDate: input.reservationDate,
          guestCount: input.guestCount,
          specialRequests: input.specialRequests && input.specialRequests.trim() !== '' ? input.specialRequests : null,
          status: ReservationStatus.PENDING,
        },
        select: {
          reservationNumber: true,
          customerName: true,
          reservationDate: true,
          guestCount: true,
          status: true,
        },
      });

      return reservation;
    } catch (error: any) {
      if (error.code === 'P2002' && error.meta?.target?.includes('reservationNumber')) {
        attempts++;
        if (attempts >= 3) throw error;
      } else {
        throw error;
      }
    }
  }

  throw new Error('Failed to generate unique reservation number after multiple attempts');
};

export const getReservationByNumber = async (reservationNumber: string) => {
  return prisma.reservation.findUnique({
    where: { reservationNumber },
    select: {
      reservationNumber: true,
      customerName: true,
      reservationDate: true,
      guestCount: true,
      specialRequests: true,
      status: true,
      createdAt: true,
    },
  });
};
