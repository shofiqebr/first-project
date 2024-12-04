
import { Student } from './student.interface';
import { StudentModel } from './student.model';

const createStudentIntoDB = async (student: Student) => {
  console.log('Received student data:', student);
  const result = await StudentModel.create(student);
  console.log('Student successfully created:', result);
  return result;
};

const getAllStudentsfomDB = async () => {
  const result = await StudentModel.find();
  return result;
}

const getSingleStudentFromDB = async (id : string) => {
  const result = await StudentModel.findOne({id});
  return result;
}

export const StudentServices = {
  createStudentIntoDB,
  getAllStudentsfomDB,
  getSingleStudentFromDB,
};
