import catchAsync from '../../utitlity/catchAsync';
import { ClassModel, ScheduleClass } from '../Class/class.model';
import { IUser } from '../User/user.interface';
import { UserModel } from '../User/user.model';

const changeRole = async (id: string, payload: Partial<IUser>) => {
  return await UserModel.findByIdAndUpdate(id, payload, {
    new: true,
    runValidators: true,
  });
};


//delete user

const deleteUser=async(id:string)=>{
  return await UserModel.findByIdAndDelete(id);
}

//delete class
const deleteClass=async(id:string)=>{
  console.log(id);
  return await ClassModel.findByIdAndDelete(id);
}


//get all class
const allclass=async()=>{
  return await ClassModel.find();
}
export const AdminServices = {changeRole,deleteUser,deleteClass,allclass};
