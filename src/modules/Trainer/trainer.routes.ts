import { Router } from "express";
import auth from "../../middlewares/auth";
import { TrainerController } from "./trainer.controller";

const router=Router();
router.get('/trainerclasses',auth('trainer','admin'),TrainerController.trainerClasses)
export const TrainerRoutes=router;