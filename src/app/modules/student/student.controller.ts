
import { Request, Response } from "express";
import { StudentService } from "./student.service";


const createStudent = async (req : Request, res : Response) => {
    
    try{

        const { student : Studentdata}  = req.body;
        const result  = await StudentService.createStudentIntoDB(Studentdata)
    
        res.status(200).json({
            success : true,
            message : 'student is created successfully',
            data : result
        })
    }catch(err){
        console.log(err)
    }
}

export const StudentControllers ={
    createStudent
}