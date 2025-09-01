// Master Modules Export
// This file provides centralized exports for all school management modules

// Attendance Management Module
export * from './attendance-management/types';
export { AttendanceProgress } from './attendance-management/components/ui/attendance-progress';
export { AttendanceStatusSelect } from './attendance-management/components/ui/attendance-status-select';

// Student Information System Module
export * from './student-information-system';

// Module Registry
export const MODULES = [
  {
    id: 'attendance-management',
    name: 'Attendance Management',
    description: 'Digital attendance tracking, leave requests, parent notifications',
    icon: '✅',
    status: 'IN_PROGRESS',
    progress: 15,
    path: '/modules/attendance-management',
    entities: ['Student', 'Attendance', 'LeaveRequest', 'Parent'],
    features: ['Real-time tracking', 'Leave management', 'Parent notifications', 'Reporting']
  },
  {
    id: 'financial-accounting',
    name: 'Financial Accounting',
    description: 'Ledger, transactions, reports, centralized cloud-based accounting',
    icon: '📊',
    status: 'TODO',
    progress: 0,
    path: '/modules/financial-accounting',
    entities: ['Account', 'Transaction', 'Report'],
    features: ['Double-entry bookkeeping', 'Financial reports', 'Bank reconciliation', 'Audit trail']
  },
  {
    id: 'fee-management',
    name: 'Fee Management',
    description: 'Online fee collection, alerts, defaulter tracking',
    icon: '💰',
    status: 'TODO',
    progress: 0,
    path: '/modules/fee-management',
    entities: ['FeeStructure', 'Invoice', 'Payment', 'Alert'],
    features: ['Online payments', 'Invoice generation', 'Automated reminders', 'Defaulter tracking']
  },
  {
    id: 'library-management',
    name: 'Library Management',
    description: 'Cataloging, issue/return, fines, availability tracking',
    icon: '📚',
    status: 'TODO',
    progress: 0,
    path: '/modules/library-management',
    entities: ['LibraryItem', 'IssueRecord', 'Fine', 'Student'],
    features: ['Digital catalog', 'Issue/return system', 'Fine management', 'Search & discovery']
  },
  {
    id: 'exam-result-management',
    name: 'Exam & Result Management',
    description: 'Exam scheduling, grading, report cards, progress tracking',
    icon: '📝',
    status: 'TODO',
    progress: 0,
    path: '/modules/exam-result-management',
    entities: ['Exam', 'Result', 'ReportCard', 'Student', 'Subject'],
    features: ['Exam scheduling', 'Grading system', 'Report generation', 'Performance analytics']
  },
  {
    id: 'student-information-system',
    name: 'Student Information System',
    description: 'Centralized student profiles, homework workflow, academic tracking',
    icon: '👥',
    status: 'IN_PROGRESS',
    progress: 35,
    path: '/modules/student-information-system',
    entities: ['Student', 'Guardian', 'Homework', 'Grade', 'Timetable'],
    features: ['Profile management', 'Homework workflow', 'Grade tracking', 'Timetable management', 'Parent communication']
  },
  {
    id: 'bus-transport-gps',
    name: 'Bus Transport & GPS',
    description: 'Route planning, GPS tracking, driver logs, vehicle management',
    icon: '🚌',
    status: 'TODO',
    progress: 0,
    path: '/modules/bus-transport-gps',
    entities: ['Bus', 'Route', 'Stop', 'Driver', 'GPSLocation', 'Incident'],
    features: ['Fleet management', 'Route planning', 'Real-time tracking', 'Safety management']
  },
  {
    id: 'online-registration',
    name: 'Online Registration',
    description: 'Remote student registration, verification workflows',
    icon: '📋',
    status: 'TODO',
    progress: 0,
    path: '/modules/online-registration',
    entities: ['Registration', 'Verification', 'Student'],
    features: ['Online application', 'Document verification', 'Workflow management', 'Status tracking']
  }
] as const;

export type Module = typeof MODULES[number];
export type ModuleId = typeof MODULES[number]['id'];
export type ModuleStatus = 'TODO' | 'IN_PROGRESS' | 'COMPLETED';

// Helper functions
export const getModuleById = (id: ModuleId) => MODULES.find(module => module.id === id);
export const getModulesByStatus = (status: ModuleStatus) => MODULES.filter(module => module.status === status);
export const getTotalProgress = () => MODULES.reduce((sum, module) => sum + module.progress, 0) / MODULES.length;