import { z } from 'zod';

// UserName Schema
const userNameValidationSchema = z.object({
  firstName: z
    .string()
    .trim()
    .max(20, 'First Name cannot be more than 20 characters')
    .refine(
      (value) => value.charAt(0).toUpperCase() + value.slice(1) === value,
      { message: 'First Name must be in capitalize format' }
    ),
  middleName: z.string().trim().optional(),
  lastName: z
    .string()
    .trim()
    .nonempty('Last Name is required')
    .refine((value) => /^[A-Za-z]+$/.test(value), {
      message: 'Last Name must only contain alphabetic characters',
    }),
});

// Guardian Schema
const guardianValidationSchema = z.object({
  fatherName: z.string().trim().nonempty('Father Name is required'),
  fatherOccupation: z.string().trim().nonempty('Father Occupation is required'),
  fatherContactNo: z.string().trim().nonempty('Father Contact No is required'),
  motherName: z.string().trim().nonempty('Mother Name is required'),
  motherOccupation: z.string().trim().nonempty('Mother Occupation is required'),
  motherContactNo: z.string().trim().nonempty('Mother Contact No is required'),
});

// LocalGuardian Schema
const localGuardianValidationSchema = z.object({
  name: z.string().trim().nonempty('Name is required'),
  occupation: z.string().trim().nonempty('Occupation is required'),
  contactNo: z.string().trim().nonempty('Contact No is required'),
  address: z.string().trim().nonempty('Address is required'),
});

// Student Schema
const studentValidationSchema = z.object({
  id: z.string().nonempty('ID is required'),
  password: z.string().max(20).nonempty('Password is required'),
  name: userNameValidationSchema,
  gender: z.enum(['male', 'female', 'others'], { errorMap: () => ({ message: 'Invalid gender value' }) }),
  dateOfBirth: z.string().optional(),
  email: z
    .string()
    .nonempty('Email is required')
    .email('Invalid email format'),
  contactNo: z.string().nonempty('Contact No is required'),
  emergencyContactNo: z.string().nonempty('Emergency Contact No is required'),
  bloodGroup: z.enum(['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'], {
    errorMap: () => ({ message: 'Invalid blood group value' }),
  }),
  presentAddress: z.string().nonempty('Present Address is required'),
  permanentAddress: z.string().nonempty('Permanent Address is required'),
  guardian: guardianValidationSchema,
  localGuardian: localGuardianValidationSchema,
  profileImg: z.string().optional(),
  isActive: z.enum(['active', 'blocked']).default('active'),
  isDelted: z.boolean(),
});

export { studentValidationSchema };
