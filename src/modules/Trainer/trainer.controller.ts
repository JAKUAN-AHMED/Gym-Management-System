import catchAsync from "../../utitlity/catchAsync"
import sendResponse from "../../utitlity/sendResponse";
import { TrainerServices } from "./trainer.services"

const trainerClasses=catchAsync(async(req,res)=>{
    
   
    const result = await TrainerServices.getTrainerClasses(req.params.traineeId);

    sendResponse(res, {
      statusCode: result ? 200 : 500,
      success: true,
      message: result ? 'got my scheduled data successfully' : 'Unauthorized access',
      Data:result?result:[]
    });
    
})
export const TrainerController={trainerClasses}