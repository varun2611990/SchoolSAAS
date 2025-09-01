// Student Information System Module - Main Export

// Types
export * from './types';

// Validation Schemas
export * from './schema';

// UI Components
export * from './components/ui';

// Module metadata
export const SIS_MODULE = {
  name: 'Student Information System',
  description: 'Centralized student profile management with academic tracking and homework workflow',
  version: '1.0.0',
  status: 'IN_PROGRESS',
  features: [
    'Student Profile Management',
    'Homework & Assignment Workflow', 
    'Grade Management',
    'Timetable Management',
    'Parent-Teacher Communication',
    'Academic Record Tracking'
  ]
};