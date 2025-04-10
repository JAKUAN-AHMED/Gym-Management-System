import catchAsync from "../../utitlity/catchAsync";
import sendResponse from "../../utitlity/sendResponse";
import { IScheduleClass } from "./class.interface";
import { ClassModel } from "./class.model";
import { ClassServices } from "./class.services";

const createClass=catchAsync(async(req,res)=>{
    const result=await ClassServices.createClass(req.body);
    sendResponse(res, {
      statusCode: result ? 200 : 500,
      success: true,
      message: result
        ? `${result.name} class created successfully`
        : 'data not found',
      Data: result ? result : [],
    });
})




export const createScheduleClass = catchAsync(async (req, res) => {
    const {classId}=req.params;
    const result=await ClassServices.createClassSchedule(classId,req.body);

   sendResponse(res, {
     statusCode: result ? 200 : 500,
     success: true,
     message: result
       ? `Class scheduled successfully`
       : 'data not found',
     Data: result ? result : [],
   });
});

export const ClassController={createClass,createScheduleClass};