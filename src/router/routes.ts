import express from 'express';
import { AuthRoutes } from '../modules/Auth/auth.routes';
import { AdminRoutes } from '../modules/Admin/admin.routes';
import { TraineeRoutes } from '../modules/Trainee/trainee.route';
import { TrainerRoutes } from '../modules/Trainer/trainer.routes';

const router = express.Router();

const moduleRoutes = [
  {
    path: '/auth',
    route: AuthRoutes,
  },
  {
    path: '/admin',
    route: AdminRoutes,
  },
  {
    path: '/trainee',
    route: TraineeRoutes,
  },
  {
    path: '/trainer',
    route: TrainerRoutes,
  },
];
moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;
