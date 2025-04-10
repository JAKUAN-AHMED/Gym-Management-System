import { Types } from "mongoose";

export interface IClass{
    name:string,
    description:string
}

//schedule class
export interface IScheduleClass {
  className: string;
  description: string;
  trainerId: string;
  schedule: {
    date: string;  
    startTime: string;  
    endTime: string;  
    trainees:Types.ObjectId[]
  };
}
