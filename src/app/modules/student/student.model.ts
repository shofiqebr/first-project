
import { Schema, model } from 'mongoose';
import validator from 'validator';
import { StudentModel, TGuardian, TLocalGuardian, TStudent, TUserName } from './student.interface';


const userNameSchema = new Schema<TUserName>({
  firstName: {
    type: String,
    required: [true, 'First Name is required'],
    trim: true,
    maxlength: [20, "First Name can not be more than 20 characters"],
    validate: {
      validator: function (value : string) {
        const firstNameStr = value.charAt(0).toUpperCase() + value.slice(1);
        return firstNameStr ===value;
    },
    message : '{VALUE} is not in capitalize format'
    }
  },
  middleName: {
    type: String,
    trim: true,
  },
  lastName: {
    type: String,
    required: [true, 'Last Name is required'],
    // trim: true,
    validate: {
      validator: (value: string) => validator.isAlpha(value),
      message: '{VALUE} is not valid'
    }
  },
});

const guardianSchema = new Schema<TGuardian>({
  fatherName: {
    type: String,
    required: [true, 'Father Name is required'],
    trim: true,
  },
  fatherOccupation: {
    type: String,
    required: [true, 'Father Occupation is required'],
    trim: true,
  },
  fatherContactNo: {
    type: String,
    required: [true, 'Father ContactNo is required'],
    trim: true,
  },
  motherName: {
    type: String,
    required: [true, 'Mother Name is required'],
    trim: true,
  },
  motherOccupation: {
    type: String,
    required: [true, 'Mother Occupation is required'],
  },
  motherContactNo: {
    type: String,
    required: [true, 'Mother ContactNo is required'],
  },
});

const localGuradianSchema = new Schema<TLocalGuardian>({
  name: {
    type: String,
    required: [true, 'name is required'],
    trim: true,
  },
  occupation: {
    type: String,
    required: [true, 'occupation is required'],
  },
  contactNo: {
    type: String,
    required: [true, '  contactNo is required'],
  },
  address: {
    type: String,
    required: [true, 'address is required'],
  },
});

const studentSchema = new Schema<TStudent, StudentModel>({
  id: { type: String, required: true, unique: true },
  user: {
    type: Schema.Types.ObjectId,
    required: [true, 'ID is required'],
    unique: true,
    ref: 'User',

  },
  name: {
    type : userNameSchema,
    required : [true, 'name is required']
  },
  gender:  { type: String, 
    enum: {
      values : ['male', 'female', 'others'], 
      message : "{VALUE} is not valid"
    },
    required : true
    },
  dateOfBirth: { type: String },
  email: { type: String, required: [true, 'email is required'], unique: true , 
    validate:{
      validator: (value : string) => validator.isEmail(value),
      message: '{VALUE} is not a valid email type'
    }
  },
  contactNo: { type: String, required: [true, 'contactNo is required'] },
  emergencyContactNo: { type: String, required: [true, 'emergencyContactNo is required'] },
  bloodGroup: {
    type: String,
    enum : ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'],
    required : true
  },
  presentAddress: { type: String, required: true },
  permanentAddress: { type: String, required: true },
  guardian: guardianSchema,
  localGuardian: localGuradianSchema,
  profileImg: { type: String },
 
  isDeleted: {
    type: Boolean,
    default: false
  }
},
{
  toJSON: {
    virtuals: true
  }
});

// virtual

studentSchema.virtual('fullName').get(function(){
  return `${this.name.firstName} ${this.name.middleName} ${this.name.lastName}`
  
});

// Query Middleware

studentSchema.pre('find',function(next){
  this.find({isDeleted: {$ne: true}});
  next();
})
studentSchema.pre('aggregate',function(next){
  // this.find({isDeleted: {$ne: true}});
  this.pipeline().unshift({$match:{isDeleted: {$ne: true}}})
  next();
})




// creating a custom static method
studentSchema.statics.isUserExists = async function (id:string): Promise<TStudent | null>                                   {
  const existingUser = await Student.findOne({id});
  return existingUser
}


// creating a custom instance
// studentSchema.methods.isUserExists = async function (id:string ): Promise<TStudent | null> {
//   const existingUser = await Student.findOne({id});
//   return existingUser
// };

export const Student = model<TStudent, StudentModel>('Student', studentSchema);
