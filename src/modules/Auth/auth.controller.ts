import catchAsync from "../../utitlity/catchAsync";
import sendResponse from "../../utitlity/sendResponse";
import bcrypt from "bcrypt";
import { AuthServices } from "./auth.services";
import config from "../../config";
const registerUser = catchAsync(async (req, res) => {
  const { name, email, password, role ,phone,address} = req.body;
  const hashedpass = await bcrypt.hash(password, 10);
  const newUserRole="trainee";
  const result = await AuthServices.registerUser({
    name,
    email,
    password: hashedpass,
    role:newUserRole,
    phone,
    address
  });
  const isTrue: boolean = result ? true : false;
  sendResponse(res, {
    statusCode: isTrue ? 200 : 500,
    success: isTrue,
    message: isTrue
      ? 'Congratulation to the new World!'
      : 'Registration failed!',
    Data: isTrue ? result : [],
  });
});


//login

 const loginUser = catchAsync(async (req, res) => {
   const result = await AuthServices.loginUser(req.body);
   const { accessToken, refreshToken } = result;

   //set cookie
   res.cookie('refreshToken', refreshToken, {
     secure: config.node_env === 'production',
     httpOnly: true,
     sameSite: 'none',
     maxAge: 1000 * 60 * 60 * 24 * 365,
   });

   sendResponse(res, {
     statusCode: accessToken ? 200 : 500,
     success: true,
     message: accessToken ? 'login successful' : 'Unauthorized access',
     Data: accessToken ? { token: accessToken } : [],
   });
 });


 //change password
const changePass=catchAsync(async(req,res)=>{
    const {oldpassword,newpassword}=req.body;
    const userEmail=req?.user?.email;
    const result=await AuthServices.changePassword(userEmail,oldpassword,newpassword);

     sendResponse(res, {
       statusCode: result ? 200 : 500,
       success: true,
       message: result ? 'password changed successfully' : 'Unauthorized access',
     });
    
})


//logout
 const logout = catchAsync(async (req, res) => {
   if (req.cookies.refreshToken && req.headers.authorization) {
     res.clearCookie('refreshToken', {
       httpOnly: true,
       secure: process.env.NODE_ENV === 'production',
       sameSite: 'strict',
     });

     sendResponse(res, {
       statusCode: 200,
       success: true,
       message: 'Logout successful',
       Data: [],
     });
   } else {
     sendResponse(res, {
       statusCode: 400,
       success: false,
       message: 'No token found. User is not logged in.',
       Data: [],
     });
   }
 });
export const AuthController={registerUser,loginUser,changePass,logout}
