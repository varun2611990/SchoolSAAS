// Student Information System Module - TypeScript Types

export enum HomeworkStatus {
  PENDING = 'PENDING',
  SUBMITTED = 'SUBMITTED',
  GRADED = 'GRADED',
  RETURNED = 'RETURNED',
  LATE_SUBMISSION = 'LATE_SUBMISSION'
}

export enum HomeworkNotificationType {
  ASSIGNMENT_CREATED = 'ASSIGNMENT_CREATED',
  SUBMISSION_RECEIVED = 'SUBMISSION_RECEIVED',
  GRADE_ASSIGNED = 'GRADE_ASSIGNED',
  DUE_DATE_REMINDER = 'DUE_DATE_REMINDER',
  LATE_SUBMISSION = 'LATE_SUBMISSION'
}

export enum UserRole {
  SUPER_ADMIN = 'SUPER_ADMIN',
  ADMIN = 'ADMIN',
  PRINCIPAL = 'PRINCIPAL',
  TEACHER = 'TEACHER',
  STUDENT = 'STUDENT',
  PARENT = 'PARENT',
  MEMBER = 'MEMBER'
}

// Core Student Information
export interface StudentProfile {
  id: string;
  workspaceUserId: string;
  schoolId: string;
  classId: string;
  sectionId?: string;
  rollNumber: string;
  admissionNumber: string;
  admissionDate: Date;
  dateOfBirth: Date;
  gender: 'MALE' | 'FEMALE' | 'OTHER';
  bloodGroup?: string;
  address?: string;
  emergencyContact?: string;
  medicalInfo?: string;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;

  // Relationships
  workspaceUser?: {
    id: string;
    user: {
      id: string;
      name?: string;
      email: string;
      phone?: string;
      image?: string;
    };
  };
  school?: {
    id: string;
    name: string;
  };
  class?: {
    id: string;
    name: string;
    grade: number;
  };
  section?: {
    id: string;
    name: string;
  };
  parents?: StudentParent[];
}

// Guardian/Parent Information  
export interface GuardianProfile {
  id: string;
  workspaceUserId: string;
  schoolId: string;
  fatherName?: string;
  motherName?: string;
  occupation?: string;
  income?: number;
  address?: string;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;

  // Relationships
  workspaceUser?: {
    id: string;
    user: {
      id: string;
      name?: string;
      email: string;
      phone?: string;
    };
  };
  children?: StudentParent[];
}

export interface StudentParent {
  id: string;
  studentId: string;
  parentId: string;
  relation: string;
  student?: StudentProfile;
  parent?: GuardianProfile;
}

// Academic Management
export interface AcademicRecord {
  id: string;
  studentId: string;
  academicYearId: string;
  classId: string;
  sectionId?: string;
  promotionStatus: 'PROMOTED' | 'DETAINED' | 'TRANSFERRED';
  overallGrade?: string;
  percentage?: number;
  rank?: number;
  remarks?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface SubjectInfo {
  id: string;
  schoolId: string;
  name: string;
  code: string;
  description?: string;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface ClassInfo {
  id: string;
  schoolId: string;
  academicYearId: string;
  name: string;
  grade: number;
  description?: string;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;

  // Relationships
  sections?: SectionInfo[];
  subjects?: ClassSubject[];
  students?: StudentProfile[];
}

export interface SectionInfo {
  id: string;
  classId: string;
  name: string;
  capacity?: number;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface ClassSubject {
  id: string;
  classId: string;
  subjectId: string;
  createdAt: Date;
  class?: ClassInfo;
  subject?: SubjectInfo;
}

// Homework & Assignment Management
export interface HomeworkAssignment {
  id: string;
  schoolId: string;
  classId: string;
  subjectId: string;
  teacherId: string;
  title: string;
  description?: string;
  instructions?: string;
  dueDate: Date;
  maxMarks?: number;
  attachments: string[];
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;

  // Relationships
  school?: {
    id: string;
    name: string;
  };
  class?: ClassInfo;
  subject?: SubjectInfo;
  teacher?: {
    id: string;
    workspaceUser: {
      user: {
        name?: string;
      };
    };
  };
  submissions?: HomeworkSubmission[];
}

export interface HomeworkSubmission {
  id: string;
  homeworkId: string;
  studentId: string;
  content?: string;
  attachments: string[];
  status: HomeworkStatus;
  submittedAt?: Date;
  grade?: number;
  maxGrade?: number;
  feedback?: string;
  gradedAt?: Date;
  gradedBy?: string;
  isLate: boolean;
  createdAt: Date;
  updatedAt: Date;

  // Relationships
  homework?: HomeworkAssignment;
  student?: StudentProfile;
}

// Timetable Management
export interface TimetableEntry {
  id: string;
  classId: string;
  subjectId: string;
  teacherId: string;
  dayOfWeek: number; // 1-7 (Monday-Sunday)
  startTime: string; // HH:MM format
  endTime: string; // HH:MM format
  room?: string;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;

  // Relationships
  class?: ClassInfo;
  subject?: SubjectInfo;
  teacher?: {
    id: string;
    workspaceUser: {
      user: {
        name?: string;
      };
    };
  };
}

// Grade Management
export interface GradeRecord {
  id: string;
  studentId: string;
  subjectId: string;
  examId: string;
  marks: number;
  maxMarks: number;
  grade?: string;
  remarks?: string;
  createdAt: Date;
  updatedAt: Date;

  // Relationships
  student?: StudentProfile;
  subject?: SubjectInfo;
  exam?: {
    id: string;
    name: string;
    type: string;
  };
}

// Communication & Notifications
export interface NotificationInfo {
  id: string;
  userId: string;
  type: string;
  title: string;
  message: string;
  data?: any;
  isRead: boolean;
  readAt?: Date;
  createdAt: Date;
}

// Form interfaces for API operations
export interface StudentRegistrationForm {
  // Personal Information
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  dateOfBirth: Date;
  gender: 'MALE' | 'FEMALE' | 'OTHER';
  bloodGroup?: string;
  address?: string;
  emergencyContact?: string;
  medicalInfo?: string;

  // Academic Information
  classId: string;
  sectionId?: string;
  rollNumber: string;
  admissionNumber: string;
  admissionDate: Date;

  // Guardian Information
  fatherName?: string;
  motherName?: string;
  parentEmail?: string;
  parentPhone?: string;
  guardianOccupation?: string;
  guardianAddress?: string;
}

export interface HomeworkCreationForm {
  classId: string;
  subjectId: string;
  title: string;
  description?: string;
  instructions?: string;
  dueDate: Date;
  maxMarks?: number;
  attachments?: FileList;
}

export interface HomeworkSubmissionForm {
  content?: string;
  attachments?: FileList;
}

export interface GradeAssignmentForm {
  homeworkSubmissionId: string;
  grade: number;
  maxGrade: number;
  feedback?: string;
}

// Dashboard & Analytics
export interface StudentDashboardData {
  profile: StudentProfile;
  upcomingHomework: HomeworkAssignment[];
  recentGrades: GradeRecord[];
  todayTimetable: TimetableEntry[];
  attendancePercentage: number;
  notifications: NotificationInfo[];
}

export interface TeacherDashboardData {
  assignedClasses: ClassInfo[];
  pendingSubmissions: HomeworkSubmission[];
  upcomingDeadlines: HomeworkAssignment[];
  todaySchedule: TimetableEntry[];
  recentActivity: NotificationInfo[];
}

export interface ParentDashboardData {
  children: {
    student: StudentProfile;
    upcomingHomework: HomeworkAssignment[];
    recentGrades: GradeRecord[];
    attendancePercentage: number;
  }[];
  notifications: NotificationInfo[];
}

export interface AdminDashboardData {
  totalStudents: number;
  totalTeachers: number;
  totalClasses: number;
  totalSubjects: number;
  pendingHomework: number;
  recentActivity: NotificationInfo[];
  classDistribution: {
    className: string;
    studentCount: number;
  }[];
}

// API Response interfaces
export interface StudentListResponse {
  students: StudentProfile[];
  total: number;
  page: number;
  pageSize: number;
}

export interface HomeworkListResponse {
  homework: HomeworkAssignment[];
  total: number;
  page: number;
  pageSize: number;
}

export interface SubmissionListResponse {
  submissions: HomeworkSubmission[];
  total: number;
  page: number;
  pageSize: number;
}

// Filter interfaces
export interface StudentFilters {
  classId?: string;
  sectionId?: string;
  isActive?: boolean;
  search?: string;
}

export interface HomeworkFilters {
  classId?: string;
  subjectId?: string;
  teacherId?: string;
  status?: string;
  dueDateFrom?: Date;
  dueDateTo?: Date;
}

export interface GradeFilters {
  studentId?: string;
  subjectId?: string;
  examId?: string;
  academicYearId?: string;
}