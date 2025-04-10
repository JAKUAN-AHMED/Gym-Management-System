import config from "../../config";
import AppError from "../../errors/AppError";
import { IUser } from "../User/user.interface";
import { UserModel } from "../User/user.model";
import { TLoginUser } from "./auth.interface";
import { createToken } from "./auth.utils";
import httpStatus from 'http-status';
import bcrypt from'bcrypt';


const registerUser=async(payload:IUser)=>{
  return await UserModel.create(payload);
}

//login

 const loginUser = async (payload: TLoginUser) => {
   //   check if user exist
   const user = await UserModel.isUserExistsByCustomEmail(payload.email);
   if (!user) {
     throw new AppError(false, httpStatus.NOT_FOUND, 'User not found');
   }

   // check if password match
   const storedHashedPassword = user.password;
   if (
     !(await UserModel.isPasswordMatch(payload.password, storedHashedPassword))
   ) {
     throw new AppError(false, httpStatus.UNAUTHORIZED, 'Invalid password');
   }

   // access granted:send accestoken,refreshtoken

   const JwtPayload = {
     email: user.email,
     role: user.role,
   };

   //create toke and send to the client
   const accessToken = createToken(
     JwtPayload,
     config.access_token_secret as string,
     config.access_token_expires as string,
   );

   //refresh token
   const refreshToken = createToken(
     JwtPayload,
     config.refress_token_secret as string,
     config.refresh_token_expires as string,
   );

   return {
     accessToken,
     refreshToken,
   };
 };


 //change password
 const changePassword=async (email: string, oldPassword: string, newPassword: string) => {
    const user = await UserModel.isUserExistsByCustomEmail(email);
    if (!user) {
      throw new AppError(false, httpStatus.NOT_FOUND, 'User not found');
    }

    const isMatch = await UserModel.isPasswordMatch(oldPassword, user.password);
    if (!isMatch) {
      throw new AppError(false, httpStatus.UNAUTHORIZED, 'Old password is incorrect');
    }

    // Hash new password and update
    const hashedPassword = await bcrypt.hash(newPassword, 10);
    return await UserModel.findByIdAndUpdate(user?._id, { password: hashedPassword },{new:true,runValidators:true});
  }
export const AuthServices={registerUser,loginUser,changePassword};