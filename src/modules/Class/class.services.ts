import { Types } from "mongoose";
import { IClass, IScheduleClass } from "./class.interface";
import { ClassModel, ScheduleClass } from "./class.model";
const createClass=async(payload:IClass)=>{
    return await ClassModel.create(payload);
}




export const createClassSchedule = async (
  classId: string,
  classData: IScheduleClass,
) => {
  const { schedule } = classData;
  const { date, startTime, endTime, trainees } = schedule;

  const start = new Date(`${date}T${startTime}`);
  const end = new Date(`${date}T${endTime}`);
  const durationInHours = (end.getTime() - start.getTime()) / (1000 * 60 * 60);

  //  1. Duration should not exceed 2 hours
  if (durationInHours > 2 || durationInHours<2) {
    throw new Error('Class duration cannot exceed 2 hours or its less.');
  }

  //  2. Check time conflict with existing scheduled classes on same date
  const conflictingClass = await ScheduleClass.findOne({
    'schedule.date': date,
    $or: [
      {
        'schedule.startTime': { $lt: endTime },
        'schedule.endTime': { $gt: startTime },
      },
    ],
  });

  if (conflictingClass) {
    throw new Error('Time conflict with another scheduled class.');
  }

  //  3. Ensure not more than 5 classes are scheduled on the same date
  const sameDateCount = await ScheduleClass.countDocuments({
    'schedule.date': date,
  });

  if (sameDateCount >= 5) {
    throw new Error('Cannot schedule more than 5 classes on the same date.');
  }

  //  4. Check trainee count
  if (trainees.length > 10 ) {
    throw new Error('A class cannot have more than 10 trainees.');
  }

  const classInfo=await ClassModel.findById(classId);

  //  Create schedule if all checks pass
  const scheduledClass = await ScheduleClass.create({
    className: classInfo?.name,
    description:classInfo?.description,
    trainerId:classData.trainerId,
    schedule,
  });

  return scheduledClass;
};



export const ClassServices={createClass,createClassSchedule};