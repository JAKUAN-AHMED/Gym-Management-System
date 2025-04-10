import { Router } from 'express';
import auth from '../../middlewares/auth';
import { USER_ROLE } from '../User/user.constant';
import { TraineeController } from './trainee.controller';

const router = Router();
router.patch(
  '/booking-class/:schedule_classId',
  auth(USER_ROLE.trainee,USER_ROLE.admin),
  TraineeController.bookClass,
);
router.patch(
  '/cancel-booking/:schedule_classId',
  auth(USER_ROLE.trainee,USER_ROLE.admin),
  TraineeController.cancelBooking,
);

export const TraineeRoutes = router;
