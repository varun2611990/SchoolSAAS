// Student Information System Module - Zod Validation Schemas

import { z } from 'zod';

// Enum schemas
export const HomeworkStatusSchema = z.enum(['PENDING', 'SUBMITTED', 'GRADED', 'RETURNED', 'LATE_SUBMISSION']);
export const GenderSchema = z.enum(['MALE', 'FEMALE', 'OTHER']);
export const UserRoleSchema = z.enum(['SUPER_ADMIN', 'ADMIN', 'PRINCIPAL', 'TEACHER', 'STUDENT', 'PARENT', 'MEMBER']);

// Core validation schemas
export const StudentRegistrationSchema = z.object({
  // Personal Information
  firstName: z.string().min(2, 'First name must be at least 2 characters').max(50, 'First name must be less than 50 characters'),
  lastName: z.string().min(2, 'Last name must be at least 2 characters').max(50, 'Last name must be less than 50 characters'),
  email: z.string().email('Invalid email address'),
  phone: z.string().optional(),
  dateOfBirth: z.date({
    required_error: 'Date of birth is required',
    invalid_type_error: 'Invalid date format'
  }),
  gender: GenderSchema,
  bloodGroup: z.string().optional(),
  address: z.string().optional(),
  emergencyContact: z.string().optional(),
  medicalInfo: z.string().optional(),

  // Academic Information
  classId: z.string().min(1, 'Class is required'),
  sectionId: z.string().optional(),
  rollNumber: z.string().min(1, 'Roll number is required'),
  admissionNumber: z.string().min(1, 'Admission number is required'),
  admissionDate: z.date({
    required_error: 'Admission date is required',
    invalid_type_error: 'Invalid date format'
  }),

  // Guardian Information
  fatherName: z.string().optional(),
  motherName: z.string().optional(),
  parentEmail: z.string().email('Invalid parent email').optional().or(z.literal('')),
  parentPhone: z.string().optional(),
  guardianOccupation: z.string().optional(),
  guardianAddress: z.string().optional(),
});

export const HomeworkCreationSchema = z.object({
  classId: z.string().min(1, 'Class is required'),
  subjectId: z.string().min(1, 'Subject is required'),
  title: z.string().min(3, 'Title must be at least 3 characters').max(100, 'Title must be less than 100 characters'),
  description: z.string().optional(),
  instructions: z.string().optional(),
  dueDate: z.date({
    required_error: 'Due date is required',
    invalid_type_error: 'Invalid date format'
  }).refine(date => date > new Date(), {
    message: 'Due date must be in the future'
  }),
  maxMarks: z.number().positive('Max marks must be positive').optional(),
});

export const HomeworkSubmissionSchema = z.object({
  content: z.string().optional(),
  homeworkId: z.string().min(1, 'Homework ID is required'),
});

export const GradeAssignmentSchema = z.object({
  homeworkSubmissionId: z.string().min(1, 'Submission ID is required'),
  grade: z.number().min(0, 'Grade cannot be negative'),
  maxGrade: z.number().positive('Max grade must be positive'),
  feedback: z.string().optional(),
}).refine(data => data.grade <= data.maxGrade, {
  message: 'Grade cannot exceed maximum grade',
  path: ['grade']
});

export const ClassCreationSchema = z.object({
  name: z.string().min(1, 'Class name is required').max(50, 'Class name must be less than 50 characters'),
  grade: z.number().int().min(1).max(12, 'Grade must be between 1 and 12'),
  description: z.string().optional(),
  academicYearId: z.string().min(1, 'Academic year is required'),
});

export const SectionCreationSchema = z.object({
  name: z.string().min(1, 'Section name is required').max(10, 'Section name must be less than 10 characters'),
  capacity: z.number().int().positive('Capacity must be positive').optional(),
  classId: z.string().min(1, 'Class ID is required'),
});

export const SubjectCreationSchema = z.object({
  name: z.string().min(2, 'Subject name must be at least 2 characters').max(50, 'Subject name must be less than 50 characters'),
  code: z.string().min(2, 'Subject code must be at least 2 characters').max(10, 'Subject code must be less than 10 characters'),
  description: z.string().optional(),
});

export const TimetableEntrySchema = z.object({
  classId: z.string().min(1, 'Class is required'),
  subjectId: z.string().min(1, 'Subject is required'),
  teacherId: z.string().min(1, 'Teacher is required'),
  dayOfWeek: z.number().int().min(1).max(7, 'Day of week must be between 1 and 7'),
  startTime: z.string().regex(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/, 'Invalid time format (HH:MM)'),
  endTime: z.string().regex(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/, 'Invalid time format (HH:MM)'),
  room: z.string().optional(),
}).refine(data => {
  const start = data.startTime.split(':').map(Number);
  const end = data.endTime.split(':').map(Number);
  const startMinutes = start[0] * 60 + start[1];
  const endMinutes = end[0] * 60 + end[1];
  return endMinutes > startMinutes;
}, {
  message: 'End time must be after start time',
  path: ['endTime']
});

export const TeacherAssignmentSchema = z.object({
  teacherId: z.string().min(1, 'Teacher is required'),
  subjectId: z.string().min(1, 'Subject is required'),
});

export const StudentProfileUpdateSchema = z.object({
  phone: z.string().optional(),
  address: z.string().optional(),
  emergencyContact: z.string().optional(),
  medicalInfo: z.string().optional(),
  bloodGroup: z.string().optional(),
});

export const GuardianProfileUpdateSchema = z.object({
  fatherName: z.string().optional(),
  motherName: z.string().optional(),
  occupation: z.string().optional(),
  income: z.number().positive('Income must be positive').optional(),
  address: z.string().optional(),
});

// Search and filter schemas
export const StudentFilterSchema = z.object({
  classId: z.string().optional(),
  sectionId: z.string().optional(),
  isActive: z.boolean().optional(),
  search: z.string().optional(),
  page: z.number().int().positive().optional().default(1),
  pageSize: z.number().int().positive().max(100).optional().default(10),
});

export const HomeworkFilterSchema = z.object({
  classId: z.string().optional(),
  subjectId: z.string().optional(),
  teacherId: z.string().optional(),
  status: HomeworkStatusSchema.optional(),
  dueDateFrom: z.date().optional(),
  dueDateTo: z.date().optional(),
  page: z.number().int().positive().optional().default(1),
  pageSize: z.number().int().positive().max(100).optional().default(10),
});

export const GradeFilterSchema = z.object({
  studentId: z.string().optional(),
  subjectId: z.string().optional(),
  examId: z.string().optional(),
  academicYearId: z.string().optional(),
  page: z.number().int().positive().optional().default(1),
  pageSize: z.number().int().positive().max(100).optional().default(10),
});

// Notification schemas
export const NotificationSchema = z.object({
  userId: z.string().min(1, 'User ID is required'),
  type: z.string().min(1, 'Notification type is required'),
  title: z.string().min(1, 'Title is required').max(100, 'Title must be less than 100 characters'),
  message: z.string().min(1, 'Message is required').max(500, 'Message must be less than 500 characters'),
  data: z.record(z.any()).optional(),
});

// Type exports for use in components
export type StudentRegistrationInput = z.infer<typeof StudentRegistrationSchema>;
export type HomeworkCreationInput = z.infer<typeof HomeworkCreationSchema>;
export type HomeworkSubmissionInput = z.infer<typeof HomeworkSubmissionSchema>;
export type GradeAssignmentInput = z.infer<typeof GradeAssignmentSchema>;
export type ClassCreationInput = z.infer<typeof ClassCreationSchema>;
export type SectionCreationInput = z.infer<typeof SectionCreationSchema>;
export type SubjectCreationInput = z.infer<typeof SubjectCreationSchema>;
export type TimetableEntryInput = z.infer<typeof TimetableEntrySchema>;
export type TeacherAssignmentInput = z.infer<typeof TeacherAssignmentSchema>;
export type StudentProfileUpdateInput = z.infer<typeof StudentProfileUpdateSchema>;
export type GuardianProfileUpdateInput = z.infer<typeof GuardianProfileUpdateSchema>;
export type StudentFilterInput = z.infer<typeof StudentFilterSchema>;
export type HomeworkFilterInput = z.infer<typeof HomeworkFilterSchema>;
export type GradeFilterInput = z.infer<typeof GradeFilterSchema>;
export type NotificationInput = z.infer<typeof NotificationSchema>;