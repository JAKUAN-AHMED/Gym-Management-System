import AppError from "../../errors/AppError";
import catchAsync from "../../utitlity/catchAsync";
import sendResponse from "../../utitlity/sendResponse";
import { ScheduleClass } from "../Class/class.model";
import { TraineeServices } from "./trainee.services";

const bookClass = catchAsync(async (req, res) => {
  const classId = req.params.schedule_classId;
  const traineeId = req.body.traineeId;

  //check class exist or not
  const isExistClass = await ScheduleClass.findById(classId);
  if (!isExistClass) {
    throw new AppError(false, 404, 'class not found');
  }

  // is already booked
  if (isExistClass.schedule.trainees.includes(traineeId)) {
    throw new AppError(false, 400, 'Already Booked');
  }

  //check class is full or not
  if (isExistClass.schedule.trainees.length >= 10) {
    throw new AppError(false, 501, 'Class is Full');
  }

 const { schedule } = isExistClass;

 const existingBooking = await ScheduleClass.findOne({
   'schedule.date': schedule.date,
   'schedule.trainess': traineeId,
   $or: [
     {
       'schedule.startTime': { $lt: schedule.endTime },
       'schedule.endTime': { $gt: schedule.startTime },
     },
   ],
 });


  if (existingBooking) {
    throw new AppError(
      false,
      400,
      'Trainee cannot book multiple classes in the same time slot.',
    );
  }

  const bookedClass = await TraineeServices.bookClass(classId, traineeId);

  const isTrue: boolean = bookedClass ? true : false;

  sendResponse(res, {
    statusCode: isTrue ? 200 : 500,
    success: isTrue,
    message: isTrue ? 'Booking successfully Completed!' : 'failed to  book!',
    Data: isTrue ? bookedClass : [],
  });
});


const cancelBooking = catchAsync(async (req, res) => {
  const classId = req.params.schedule_classId;
  const traineeId = req.body.traineeId;

  //check class exist or not
  const isExistClass = await ScheduleClass.findById(classId);
  if (!isExistClass) {
    throw new AppError(false, 404, 'class not found');
  }

  // is already booked
  if (!isExistClass.schedule.trainees.includes(traineeId)) {
    throw new AppError(false, 400, 'Booking not found');
  }

  const bookedClass = await TraineeServices.cancelClass(classId, traineeId);
  const isTrue: boolean = bookedClass ? true : false;

  sendResponse(res, {
    statusCode: isTrue ? 200 : 500,
    success: isTrue,
    message: isTrue
      ? 'cancelled Booking a class successfully!'
      : 'failed to  cancel booked class!',
    Data: isTrue ? bookedClass : [],
  });
});
export const TraineeController = { bookClass, cancelBooking };