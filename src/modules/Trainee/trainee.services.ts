import { ScheduleClass } from "../Class/class.model";

const bookClass = async (classId: string, traineeId: string) => {
    
  const book = await ScheduleClass.findByIdAndUpdate(
    classId,
    {
      $push: { 'schedule.trainees': traineeId },
    },
    { new: true, runValidators: true },
  );
  return book;
};

const cancelClass = async (classId: string, traineeId: string) => {
  return await ScheduleClass.findByIdAndUpdate(
    classId,
    {
      $pull: { 'schedule.trainees': traineeId },
    },
    { new: true, runValidators: true },
  );
};

export const TraineeServices = { bookClass, cancelClass };
