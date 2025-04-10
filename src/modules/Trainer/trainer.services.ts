import { Types } from "mongoose";
import { ScheduleClass } from "../Class/class.model";

const getTrainerClasses = async (trainerId: string ) => {
  return await ScheduleClass.find();
};

export const TrainerServices = { getTrainerClasses };