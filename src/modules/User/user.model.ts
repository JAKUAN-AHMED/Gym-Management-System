import { model, Schema } from 'mongoose';
import { IUser, UserInterfaceModel } from './user.interface';
import bcrypt from 'bcrypt';
const UserSchema = new Schema<IUser, UserInterfaceModel>({
  name: { type: String, required: true },
  email: { type: String, unique: true, required: true },
  password: { type: String, required: true },
  role: {
    type: String,
    enum: ['admin', 'trainer', 'trainee'],
    default: 'trainee',
  },
  phone:{type:String,required:true},
  address:{type:String,required:true}
},{
    timestamps:true
});

//check user exist or not
UserSchema.statics.isUserExistsByCustomEmail = async function (email: string) {
  return await UserModel.findOne({ email }).select('+password');
};

//pass check
UserSchema.statics.isPasswordMatch = async function (password, hashed) {
  return await bcrypt.compare(password, hashed);
};
export const UserModel = model<IUser, UserInterfaceModel>('User', UserSchema);
