import AppError from "../../errors/AppError";
import catchAsync from "../../utitlity/catchAsync";
import sendResponse from "../../utitlity/sendResponse";
import { ClassModel, ScheduleClass } from "../Class/class.model";
import { AdminServices } from "./admin.services";


//change role
const changeRole=catchAsync(async(req,res)=>{
    const {id}=req.params;
    const result=await AdminServices.changeRole(id,req.body);
  
    sendResponse(res, {
      statusCode: result ? 200 : 500,
      success: true,
      message: result ? `user changed into ${result.role}  successfully` : 'User not found',
      Data:result?result:[]
    });
})

const deleteUser=catchAsync(async(req,res)=>{
  const {userId}=req.params;
  const result=await AdminServices.deleteUser(userId);
  sendResponse(res, {
    statusCode: result ? 200 : 500,
    success: true,
    message: result
      ? `user deleted  successfully`
      : 'User Not Found',
  });
})


//delete class
const deleteClass=catchAsync(async(req,res)=>{
  const classId = req.params.classId;
  //check class exist or not
  const isExistClass = await ClassModel.findById(classId);
  if (!isExistClass) {
    throw new AppError(false, 404, 'class not found');
  }
  const deletedClass = await AdminServices.deleteClass(classId);
  const isTrue: boolean = deletedClass ? true : false;

  sendResponse(res, {
    statusCode: isTrue ? 200 : 500,
    success: isTrue,
    message: isTrue
      ? 'Delete a class successfully!'
      : 'failed to  delete class!',
    Data: isTrue ? deleteClass : [],
  });
})
export const AdminController={changeRole,deleteUser,deleteClass};