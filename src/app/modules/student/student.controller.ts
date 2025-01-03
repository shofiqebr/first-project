import { NextFunction, Request, Response } from 'express';
import { StudentServices } from './student.service';




const getAllStudents = async (req : Request , res : Response, next: NextFunction) => {
  try{
    const result = await StudentServices.getAllStudentsfomDB();
    res.status(200).json({
      success: true,
      message : 'Students retrieved successfully',
      data: result
    })
  }catch(err){
    next(err)
  }
}

const getSingleStudent = async (req : Request , res : Response, next: NextFunction) => {
  try{
    const {studentId} = req.params;
    const result = await StudentServices.getSingleStudentFromDB(studentId);

    res.status(200).json({
      success : true,
      message: 'Student is retrieved successfully',
      data: result
    })

  }catch(err){
   next(err)
  }
}

const deleteStudent = async (req: Request, res: Response, next: NextFunction) =>{
  try{
      const {studentId} =req.params;
      const result = await StudentServices.deleteStudentFromDB(studentId)

      res.status(200).json({
        success: true,
        message: 'Student is Deleted successfully',
        data: result
      })
  }catch(err){
    next(err)
  }
}



export const StudentControllers = {
 
  getAllStudents,
  getSingleStudent,
  deleteStudent
};
