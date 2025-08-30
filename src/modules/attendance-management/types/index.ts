// Attendance Management Module - TypeScript Types

export enum AttendanceStatus {
  PRESENT = 'PRESENT',
  ABSENT = 'ABSENT',
  LATE = 'LATE',
  HALF_DAY = 'HALF_DAY',
  EXCUSED = 'EXCUSED'
}

export enum LeaveStatus {
  PENDING = 'PENDING',
  APPROVED = 'APPROVED',
  REJECTED = 'REJECTED',
  CANCELLED = 'CANCELLED'
}

export enum LeaveType {
  SICK = 'SICK',
  PERSONAL = 'PERSONAL',
  EMERGENCY = 'EMERGENCY',
  VACATION = 'VACATION',
  MEDICAL = 'MEDICAL',
  FAMILY = 'FAMILY',
  OTHER = 'OTHER'
}

export interface AttendanceRecord {
  id: string;
  workspaceId: string;
  studentId: string;
  classId: string;
  date: Date;
  status: AttendanceStatus;
  checkedInAt?: Date;
  checkedOutAt?: Date;
  remarks?: string;
  markedBy: string;
  createdAt: Date;
  updatedAt: Date;
  isDeleted: boolean;
  
  // Relationships
  student?: {
    id: string;
    name: string;
    rollNumber: string;
    photo?: string;
  };
  markedByUser?: {
    id: string;
    name: string;
  };
}

export interface LeaveRequest {
  id: string;
  workspaceId: string;
  studentId: string;
  type: LeaveType;
  startDate: Date;
  endDate: Date;
  reason: string;
  status: LeaveStatus;
  appliedBy: string;
  approvedBy?: string;
  approvedAt?: Date;
  rejectedAt?: Date;
  rejectionReason?: string;
  documents: string[];
  createdAt: Date;
  updatedAt: Date;
  isDeleted: boolean;
  
  // Relationships
  student?: {
    id: string;
    name: string;
    rollNumber: string;
    class: string;
  };
  appliedByUser?: {
    id: string;
    name: string;
  };
  approvedByUser?: {
    id: string;
    name: string;
  };
}

export interface AttendanceNotificationSettings {
  id: string;
  workspaceId: string;
  parentId: string;
  studentId: string;
  emailEnabled: boolean;
  smsEnabled: boolean;
  pushEnabled: boolean;
  dailySummary: boolean;
  absentAlert: boolean;
  lateAlert: boolean;
  reminderTime?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface AttendanceSummary {
  id: string;
  workspaceId: string;
  studentId: string;
  classId: string;
  month: number;
  year: number;
  totalDays: number;
  presentDays: number;
  absentDays: number;
  lateDays: number;
  halfDays: number;
  excusedDays: number;
  attendancePercentage: number;
  createdAt: Date;
  updatedAt: Date;
  
  // Relationships
  student?: {
    id: string;
    name: string;
    rollNumber: string;
  };
}

// Form interfaces
export interface AttendanceFormData {
  studentId: string;
  date: Date;
  status: AttendanceStatus;
  checkedInAt?: Date;
  checkedOutAt?: Date;
  remarks?: string;
}

export interface LeaveRequestFormData {
  studentId: string;
  type: LeaveType;
  startDate: Date;
  endDate: Date;
  reason: string;
  documents?: FileList;
}

export interface BulkAttendanceData {
  classId: string;
  date: Date;
  attendance: {
    studentId: string;
    status: AttendanceStatus;
    remarks?: string;
  }[];
}

// API Response interfaces
export interface AttendanceResponse {
  attendance: AttendanceRecord[];
  total: number;
  page: number;
  pageSize: number;
}

export interface AttendanceStatsResponse {
  totalStudents: number;
  presentToday: number;
  absentToday: number;
  lateToday: number;
  attendancePercentage: number;
  monthlyStats: {
    month: string;
    percentage: number;
  }[];
}

export interface LeaveRequestResponse {
  requests: LeaveRequest[];
  total: number;
  page: number;
  pageSize: number;
  pendingCount: number;
}

// Filter and search interfaces
export interface AttendanceFilters {
  classId?: string;
  studentId?: string;
  status?: AttendanceStatus;
  dateFrom?: Date;
  dateTo?: Date;
  markedBy?: string;
}

export interface LeaveRequestFilters {
  studentId?: string;
  status?: LeaveStatus;
  type?: LeaveType;
  dateFrom?: Date;
  dateTo?: Date;
  appliedBy?: string;
}

// Dashboard interfaces
export interface AttendanceDashboardData {
  todayStats: {
    totalStudents: number;
    present: number;
    absent: number;
    late: number;
    percentage: number;
  };
  weeklyTrend: {
    date: string;
    percentage: number;
  }[];
  topAbsentees: {
    studentId: string;
    studentName: string;
    absentDays: number;
    totalDays: number;
    percentage: number;
  }[];
  pendingLeaveRequests: number;
  recentLeaveRequests: LeaveRequest[];
}