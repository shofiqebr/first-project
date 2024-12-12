

import { Student } from './student.model';
// import { Student } from './student.model';



const getAllStudentsfomDB = async () => {
  const result = await Student.find();
  return result;
}

const getSingleStudentFromDB = async (id : string) => {
  // const result = await Student.findOne({id});
  const result = await Student.aggregate([{$match: {id:id}}])
  return result;
}

const deleteStudentFromDB = async (id : string) => {
  const result = await Student.updateOne({id},{isDeleted:true});
  return result;
}
export const StudentServices = {
  getAllStudentsfomDB,
  getSingleStudentFromDB,
  deleteStudentFromDB
};
