import { Router } from 'express';
import { createReservation, getReservationByNumber } from '../controllers/reservationController';

const router = Router();

router.post('/', createReservation);
router.get('/:reservationNumber', getReservationByNumber);

export default router;
