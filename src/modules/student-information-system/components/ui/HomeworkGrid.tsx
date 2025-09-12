'use client';

import { HomeworkAssignment } from '../../types';
import { format } from 'date-fns';

interface HomeworkCardProps {
  homework: HomeworkAssignment;
  onSelect?: (homework: HomeworkAssignment) => void;
  showTeacher?: boolean;
  showClass?: boolean;
  userRole?: 'TEACHER' | 'STUDENT' | 'PARENT' | 'ADMIN';
}

export function HomeworkCard({ 
  homework, 
  onSelect, 
  showTeacher = true, 
  showClass = true,
  userRole = 'STUDENT'
}: HomeworkCardProps) {
  const isOverdue = new Date(homework.dueDate) < new Date();
  const daysUntilDue = Math.ceil((new Date(homework.dueDate).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24));

  const getStatusColor = () => {
    if (isOverdue) return 'bg-red-100 text-red-800';
    if (daysUntilDue <= 1) return 'bg-yellow-100 text-yellow-800';
    return 'bg-green-100 text-green-800';
  };

  const getStatusText = () => {
    if (isOverdue) return 'Overdue';
    if (daysUntilDue === 0) return 'Due Today';
    if (daysUntilDue === 1) return 'Due Tomorrow';
    return `${daysUntilDue} days left`;
  };

  return (
    <div
      className="p-4 border rounded-lg hover:shadow-md transition-shadow cursor-pointer"
      onClick={() => onSelect?.(homework)}
    >
      <div className="flex justify-between items-start mb-3">
        <h3 className="text-lg font-semibold text-gray-900 line-clamp-2">
          {homework.title}
        </h3>
        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor()}`}>
          {getStatusText()}
        </span>
      </div>

      {homework.description && (
        <p className="text-gray-600 text-sm mb-3 line-clamp-2">
          {homework.description}
        </p>
      )}

      <div className="space-y-2 text-sm text-gray-500">
        <div className="flex items-center">
          <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
          Due: {format(new Date(homework.dueDate), 'MMM d, yyyy h:mm a')}
        </div>

        <div className="flex items-center">
          <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
          </svg>
          Subject: {homework.subject?.name}
        </div>

        {showClass && homework.class && (
          <div className="flex items-center">
            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
            </svg>
            Class: {homework.class.name}
          </div>
        )}

        {showTeacher && homework.teacher && (
          <div className="flex items-center">
            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
            Teacher: {homework.teacher.workspaceUser.user.name || 'Unknown'}
          </div>
        )}

        {homework.maxMarks && (
          <div className="flex items-center">
            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
            </svg>
            Max Marks: {homework.maxMarks}
          </div>
        )}

        {homework.attachments && homework.attachments.length > 0 && (
          <div className="flex items-center">
            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13" />
            </svg>
            {homework.attachments.length} attachment(s)
          </div>
        )}
      </div>

      {userRole === 'TEACHER' && homework.submissions && (
        <div className="mt-3 pt-3 border-t border-gray-200">
          <div className="text-sm text-gray-600">
            Submissions: {homework.submissions.length} / {homework.class?.students?.length || 0}
          </div>
        </div>
      )}
    </div>
  );
}

interface HomeworkGridProps {
  homework: HomeworkAssignment[];
  onSelectHomework?: (homework: HomeworkAssignment) => void;
  showTeacher?: boolean;
  showClass?: boolean;
  userRole?: 'TEACHER' | 'STUDENT' | 'PARENT' | 'ADMIN';
  isLoading?: boolean;
}

export function HomeworkGrid({ 
  homework, 
  onSelectHomework, 
  showTeacher = true, 
  showClass = true,
  userRole = 'STUDENT',
  isLoading = false 
}: HomeworkGridProps) {
  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {[...Array(6)].map((_, index) => (
          <div key={index} className="animate-pulse">
            <div className="p-4 border rounded-lg">
              <div className="h-6 bg-gray-300 rounded mb-3"></div>
              <div className="h-4 bg-gray-300 rounded mb-2"></div>
              <div className="h-4 bg-gray-300 rounded w-3/4 mb-2"></div>
              <div className="space-y-2">
                <div className="h-3 bg-gray-300 rounded"></div>
                <div className="h-3 bg-gray-300 rounded"></div>
                <div className="h-3 bg-gray-300 rounded w-1/2"></div>
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (homework.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="w-16 h-16 mx-auto mb-4 text-gray-400">
          <svg fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
        </div>
        <h3 className="text-lg font-medium text-gray-900 mb-1">No homework assigned</h3>
        <p className="text-gray-500">
          {userRole === 'TEACHER' 
            ? 'You haven\'t assigned any homework yet.' 
            : 'No homework has been assigned for your classes.'
          }
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {homework.map((hw) => (
        <HomeworkCard
          key={hw.id}
          homework={hw}
          onSelect={onSelectHomework}
          showTeacher={showTeacher}
          showClass={showClass}
          userRole={userRole}
        />
      ))}
    </div>
  );
}