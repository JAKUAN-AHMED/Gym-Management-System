import catchAsync from "../../utitlity/catchAsync";
import sendResponse from "../../utitlity/sendResponse";
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
export const AdminController={changeRole,deleteUser};