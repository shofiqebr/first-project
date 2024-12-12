import config from "../../config";
import { TStudent } from "../student/student.interface";
import { NewUser, TUser } from "./user.interface";

import { User } from "./user.model";


const createUserIntoDB = async  (password: string, studentData: TStudent) => {
    // create a user object
    const userData: Partial<TUser> = {};

    // if password is not given, use default password
    userData.password = password || (config.default_password as string)

    // set student role
    userData.role = 'student'

    // set manually generated id
    userData.id = '2030100001'

    // create a user
    const newUser = await User.create(userData);
 
    // create a student 
    if( Object.keys(newUser).length){
        //set id, _id as user
        studentData.id = newUser.id;
        studentData.user= newUser._id; //reference_id
    }
}

export const UserServices = {
    createUserIntoDB,
}