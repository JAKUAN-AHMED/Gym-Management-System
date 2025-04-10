import { Router } from 'express';
import auth from '../../middlewares/auth';
import { USER_ROLE } from '../User/user.constant';
import { TraineeController } from './trainee.controller';

const router = Router();
router.patch(
  '/booking-class/:schedule_classId',
  auth(USER_ROLE.trainee),
  TraineeController.bookClass,
);
router.patch(
  '/cancel-booking/:schedule_classId',
  auth(USER_ROLE.trainee),
  TraineeController.cancelBooking,
);

export const TraineeRoutes = router;
