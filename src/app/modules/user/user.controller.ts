import { NextFunction, Request, Response } from "express";
// import { studentValidationSchema } from "../student/student.validation";
import { UserServices } from "./user.service";



const createStudent = async ( req: Request, res: Response, next: NextFunction) => {
    try{
        const {password,student: studentData} = req.body;
        // const zodParseData = studentValidationSchema.parse(studentData);
        const result = await UserServices.createUserIntoDB(password, studentData);
        res.status(200).json({
            success: true,
            message: 'Student is created successfully',
            data: result
        })
    }catch(err){
        next(err)
    }
}

export const UserController = {
    createStudent
} 