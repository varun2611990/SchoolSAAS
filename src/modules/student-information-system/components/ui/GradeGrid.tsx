'use client';

import { GradeRecord } from '../../types';
import { format } from 'date-fns';

interface GradeCardProps {
  grade: GradeRecord;
  showStudent?: boolean;
}

export function GradeCard({ grade, showStudent = false }: GradeCardProps) {
  const percentage = (grade.marks / grade.maxMarks) * 100;
  
  const getGradeColor = (percentage: number) => {
    if (percentage >= 90) return 'bg-green-100 text-green-800 border-green-200';
    if (percentage >= 80) return 'bg-blue-100 text-blue-800 border-blue-200';
    if (percentage >= 70) return 'bg-yellow-100 text-yellow-800 border-yellow-200';
    if (percentage >= 60) return 'bg-orange-100 text-orange-800 border-orange-200';
    return 'bg-red-100 text-red-800 border-red-200';
  };

  const getLetterGrade = (percentage: number) => {
    if (percentage >= 90) return 'A+';
    if (percentage >= 80) return 'A';
    if (percentage >= 70) return 'B';
    if (percentage >= 60) return 'C';
    return 'F';
  };

  return (
    <div className={`p-4 rounded-lg border ${getGradeColor(percentage)}`}>
      <div className="flex justify-between items-start mb-3">
        <div>
          <h3 className="font-semibold text-lg">{grade.subject?.name}</h3>
          {showStudent && grade.student && (
            <p className="text-sm opacity-75">
              {grade.student.workspaceUser?.user.name} (Roll: {grade.student.rollNumber})
            </p>
          )}
          <p className="text-sm opacity-75">{grade.exam?.name}</p>
        </div>
        <div className="text-right">
          <div className="text-2xl font-bold">{getLetterGrade(percentage)}</div>
          <div className="text-sm">{percentage.toFixed(1)}%</div>
        </div>
      </div>
      
      <div className="flex justify-between items-center">
        <div className="text-sm">
          <span className="font-medium">{grade.marks}</span> / {grade.maxMarks} marks
        </div>
        <div className="text-xs text-gray-600">
          {format(new Date(grade.createdAt), 'MMM d, yyyy')}
        </div>
      </div>
      
      {grade.remarks && (
        <div className="mt-3 pt-3 border-t border-current border-opacity-20">
          <p className="text-sm">{grade.remarks}</p>
        </div>
      )}
    </div>
  );
}

interface GradeProgressProps {
  grades: GradeRecord[];
  subjectName: string;
}

export function GradeProgress({ grades, subjectName }: GradeProgressProps) {
  const sortedGrades = [...grades].sort((a, b) => 
    new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
  );

  const averagePercentage = grades.length > 0 
    ? grades.reduce((sum, grade) => sum + (grade.marks / grade.maxMarks) * 100, 0) / grades.length
    : 0;

  const getProgressColor = (percentage: number) => {
    if (percentage >= 80) return 'text-green-600';
    if (percentage >= 60) return 'text-yellow-600';
    return 'text-red-600';
  };

  return (
    <div className="bg-white p-4 rounded-lg border">
      <div className="flex justify-between items-center mb-4">
        <h3 className="font-semibold text-lg">{subjectName}</h3>
        <div className={`text-lg font-semibold ${getProgressColor(averagePercentage)}`}>
          {averagePercentage.toFixed(1)}%
        </div>
      </div>
      
      {grades.length === 0 ? (
        <p className="text-gray-500 text-center py-4">No grades available</p>
      ) : (
        <div className="space-y-3">
          {sortedGrades.map((grade) => (
            <div key={grade.id} className="flex justify-between items-center p-3 bg-gray-50 rounded">
              <div>
                <p className="font-medium">{grade.exam?.name}</p>
                <p className="text-sm text-gray-600">
                  {format(new Date(grade.createdAt), 'MMM d, yyyy')}
                </p>
              </div>
              <div className="text-right">
                <p className="font-semibold">
                  {grade.marks}/{grade.maxMarks}
                </p>
                <p className="text-sm text-gray-600">
                  {((grade.marks / grade.maxMarks) * 100).toFixed(1)}%
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

interface GradeGridProps {
  grades: GradeRecord[];
  showStudent?: boolean;
  groupBySubject?: boolean;
  isLoading?: boolean;
}

export function GradeGrid({ 
  grades, 
  showStudent = false, 
  groupBySubject = false,
  isLoading = false 
}: GradeGridProps) {
  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {[...Array(6)].map((_, index) => (
          <div key={index} className="animate-pulse">
            <div className="p-4 border rounded-lg">
              <div className="h-6 bg-gray-300 rounded mb-3"></div>
              <div className="h-4 bg-gray-300 rounded mb-2"></div>
              <div className="h-4 bg-gray-300 rounded w-3/4"></div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (grades.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="w-16 h-16 mx-auto mb-4 text-gray-400">
          <svg fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
          </svg>
        </div>
        <h3 className="text-lg font-medium text-gray-900 mb-1">No grades available</h3>
        <p className="text-gray-500">Grades will appear here once they are published.</p>
      </div>
    );
  }

  if (groupBySubject) {
    const gradesBySubject = grades.reduce((acc, grade) => {
      const subjectName = grade.subject?.name || 'Unknown Subject';
      if (!acc[subjectName]) {
        acc[subjectName] = [];
      }
      acc[subjectName].push(grade);
      return acc;
    }, {} as Record<string, GradeRecord[]>);

    return (
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {Object.entries(gradesBySubject).map(([subjectName, subjectGrades]) => (
          <GradeProgress
            key={subjectName}
            grades={subjectGrades}
            subjectName={subjectName}
          />
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {grades.map((grade) => (
        <GradeCard
          key={grade.id}
          grade={grade}
          showStudent={showStudent}
        />
      ))}
    </div>
  );
}