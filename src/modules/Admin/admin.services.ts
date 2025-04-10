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
export const AdminServices = {changeRole,deleteUser};
