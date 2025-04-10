import { model, Schema, Types } from 'mongoose';
import { IClass, IScheduleClass } from './class.interface';

const classSchema = new Schema<IClass>({
  name: { type: String, required: true },
  description: { type: String, requird: true },
});


const scheduleClassSchema = new Schema<IScheduleClass>({
  className: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  trainerId: {
    type: String,
    required: true,
  },
  schedule: {
    date: {
      type: String,
      required: true,
    },
    startTime: {
      type: String,
      required: true,
    },
    endTime: {
      type: String,
      required: true,
    },
    trainees: [{ type: Schema.Types.ObjectId }],
  },
});

export const ClassModel = model<IClass>('class', classSchema);
export const ScheduleClass =model<IScheduleClass>(
  'ScheduleClass',
  scheduleClassSchema,
);