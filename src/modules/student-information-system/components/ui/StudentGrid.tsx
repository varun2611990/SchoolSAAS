'use client';

import { useState } from 'react';
import { StudentProfile } from '../types';

interface StudentCardProps {
  student: StudentProfile;
  onSelect?: (student: StudentProfile) => void;
  isSelected?: boolean;
}

export function StudentCard({ student, onSelect, isSelected = false }: StudentCardProps) {
  return (
    <div
      className={`p-4 border rounded-lg cursor-pointer transition-colors ${
        isSelected 
          ? 'border-blue-500 bg-blue-50' 
          : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
      }`}
      onClick={() => onSelect?.(student)}
    >
      <div className="flex items-center space-x-3">
        {student.workspaceUser?.user.image ? (
          <img
            src={student.workspaceUser.user.image}
            alt={student.workspaceUser.user.name || 'Student'}
            className="w-10 h-10 rounded-full object-cover"
          />
        ) : (
          <div className="w-10 h-10 rounded-full bg-gray-300 flex items-center justify-center">
            <span className="text-gray-600 font-medium">
              {student.workspaceUser?.user.name?.charAt(0).toUpperCase() || 'S'}
            </span>
          </div>
        )}
        
        <div className="flex-1 min-w-0">
          <h3 className="text-sm font-medium text-gray-900 truncate">
            {student.workspaceUser?.user.name || 'Unknown Student'}
          </h3>
          <p className="text-sm text-gray-500">
            Roll No: {student.rollNumber} | Class: {student.class?.name}
          </p>
          <p className="text-xs text-gray-400">
            Admission: {student.admissionNumber}
          </p>
        </div>
        
        <div className="flex flex-col items-end">
          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
            student.isActive 
              ? 'bg-green-100 text-green-800' 
              : 'bg-red-100 text-red-800'
          }`}>
            {student.isActive ? 'Active' : 'Inactive'}
          </span>
          {student.section && (
            <span className="text-xs text-gray-500 mt-1">
              Section: {student.section.name}
            </span>
          )}
        </div>
      </div>
    </div>
  );
}

interface StudentGridProps {
  students: StudentProfile[];
  selectedStudents?: StudentProfile[];
  onSelectStudent?: (student: StudentProfile) => void;
  onSelectMultiple?: (students: StudentProfile[]) => void;
  multiSelect?: boolean;
  isLoading?: boolean;
}

export function StudentGrid({ 
  students, 
  selectedStudents = [], 
  onSelectStudent, 
  onSelectMultiple, 
  multiSelect = false,
  isLoading = false 
}: StudentGridProps) {
  const [internalSelected, setInternalSelected] = useState<StudentProfile[]>([]);
  
  const handleStudentSelect = (student: StudentProfile) => {
    if (multiSelect) {
      const newSelected = internalSelected.some(s => s.id === student.id)
        ? internalSelected.filter(s => s.id !== student.id)
        : [...internalSelected, student];
      
      setInternalSelected(newSelected);
      onSelectMultiple?.(newSelected);
    } else {
      onSelectStudent?.(student);
    }
  };

  const isStudentSelected = (student: StudentProfile) => {
    if (multiSelect) {
      return internalSelected.some(s => s.id === student.id);
    }
    return selectedStudents.some(s => s.id === student.id);
  };

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {[...Array(6)].map((_, index) => (
          <div key={index} className="animate-pulse">
            <div className="p-4 border rounded-lg">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-gray-300 rounded-full"></div>
                <div className="flex-1">
                  <div className="h-4 bg-gray-300 rounded mb-1"></div>
                  <div className="h-3 bg-gray-300 rounded w-3/4"></div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (students.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="w-16 h-16 mx-auto mb-4 text-gray-400">
          <svg fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z" />
          </svg>
        </div>
        <h3 className="text-lg font-medium text-gray-900 mb-1">No students found</h3>
        <p className="text-gray-500">No students match your current filters.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {students.map((student) => (
        <StudentCard
          key={student.id}
          student={student}
          onSelect={handleStudentSelect}
          isSelected={isStudentSelected(student)}
        />
      ))}
    </div>
  );
}