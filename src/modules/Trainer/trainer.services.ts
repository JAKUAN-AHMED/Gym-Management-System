import { Types } from "mongoose";
import { ScheduleClass } from "../Class/class.model";

const getTrainerClasses = async (trainerId: string ) => {
    const trainerObjectId =new Types.ObjectId(trainerId);
  const classes = await ScheduleClass.aggregate([
    {
      $match: {
        trainerId:trainerObjectId,
      },
    },
    {
      $project: {
        _id: 1,
        className: 1,
        description: 1,
        'schedule.date': 1,
        'schedule.startTime': 1,
        'schedule.endTime': 1,
        'schedule.trainees': 1,
      },
    },
  ]);

  return classes;
};

export const TrainerServices = { getTrainerClasses };