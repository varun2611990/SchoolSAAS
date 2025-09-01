'use client';

import { useState, useEffect } from 'react';
import { 
  StudentGrid, 
  HomeworkGrid, 
  TimetableView, 
  GradeGrid 
} from '@/modules/student-information-system';
import type { 
  StudentProfile, 
  HomeworkAssignment, 
  TimetableEntry, 
  GradeRecord 
} from '@/modules/student-information-system';

export default function SISOverviewPage() {
  const [students, setStudents] = useState<StudentProfile[]>([]);
  const [homework, setHomework] = useState<HomeworkAssignment[]>([]);
  const [timetable, setTimetable] = useState<TimetableEntry[]>([]);
  const [grades, setGrades] = useState<GradeRecord[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<'students' | 'homework' | 'timetable' | 'grades'>('students');

  useEffect(() => {
    // Simulate API calls
    const fetchData = async () => {
      setIsLoading(true);
      
      // Mock data - in real implementation, these would be API calls
      setTimeout(() => {
        // Mock students data
        setStudents([
          {
            id: '1',
            workspaceUserId: 'wu1',
            schoolId: 'school1',
            classId: 'class1',
            rollNumber: '001',
            admissionNumber: 'ADM2024001',
            admissionDate: new Date('2024-01-15'),
            dateOfBirth: new Date('2008-05-15'),
            gender: 'MALE',
            isActive: true,
            createdAt: new Date(),
            updatedAt: new Date(),
            workspaceUser: {
              id: 'wu1',
              user: {
                id: 'u1',
                name: 'John Doe',
                email: 'john.doe@student.school.com'
              }
            },
            class: {
              id: 'class1',
              name: 'Class 10-A',
              grade: 10
            },
            section: {
              id: 'section1',
              name: 'A'
            }
          }
        ]);

        // Mock homework data
        setHomework([
          {
            id: 'hw1',
            schoolId: 'school1',
            classId: 'class1',
            subjectId: 'subject1',
            teacherId: 'teacher1',
            title: 'Mathematics Assignment - Quadratic Equations',
            description: 'Solve all problems from Chapter 5 on Quadratic Equations',
            dueDate: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000), // 3 days from now
            maxMarks: 100,
            attachments: [],
            isActive: true,
            createdAt: new Date(),
            updatedAt: new Date(),
            subject: {
              id: 'subject1',
              schoolId: 'school1',
              name: 'Mathematics',
              code: 'MATH10',
              isActive: true,
              createdAt: new Date(),
              updatedAt: new Date()
            },
            teacher: {
              id: 'teacher1',
              workspaceUser: {
                user: {
                  name: 'Mr. Smith'
                }
              }
            }
          }
        ]);

        // Mock timetable data
        setTimetable([
          {
            id: 'tt1',
            classId: 'class1',
            subjectId: 'subject1',
            teacherId: 'teacher1',
            dayOfWeek: 1, // Monday
            startTime: '09:00',
            endTime: '10:00',
            room: 'Room 101',
            isActive: true,
            createdAt: new Date(),
            updatedAt: new Date(),
            subject: {
              id: 'subject1',
              schoolId: 'school1',
              name: 'Mathematics',
              code: 'MATH10',
              isActive: true,
              createdAt: new Date(),
              updatedAt: new Date()
            },
            teacher: {
              id: 'teacher1',
              workspaceUser: {
                user: {
                  name: 'Mr. Smith'
                }
              }
            }
          }
        ]);

        // Mock grades data
        setGrades([
          {
            id: 'grade1',
            studentId: 'student1',
            subjectId: 'subject1',
            examId: 'exam1',
            marks: 85,
            maxMarks: 100,
            grade: 'A',
            createdAt: new Date(),
            updatedAt: new Date(),
            subject: {
              id: 'subject1',
              schoolId: 'school1',
              name: 'Mathematics',
              code: 'MATH10',
              isActive: true,
              createdAt: new Date(),
              updatedAt: new Date()
            },
            exam: {
              id: 'exam1',
              name: 'Mid-term Exam',
              type: 'QUARTERLY'
            }
          }
        ]);

        setIsLoading(false);
      }, 1000);
    };

    fetchData();
  }, []);

  const tabs = [
    { id: 'students', name: 'Students', icon: '👥' },
    { id: 'homework', name: 'Homework', icon: '📝' },
    { id: 'timetable', name: 'Timetable', icon: '📅' },
    { id: 'grades', name: 'Grades', icon: '📊' },
  ] as const;

  return (
    <div className="p-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          Student Information System
        </h1>
        <p className="text-gray-600">
          Comprehensive student management, homework workflow, and academic tracking
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="bg-white p-6 rounded-lg border shadow-sm">
          <div className="flex items-center">
            <div className="p-2 bg-blue-100 rounded-lg">
              <span className="text-2xl">👥</span>
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Total Students</p>
              <p className="text-2xl font-semibold text-gray-900">{students.length}</p>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg border shadow-sm">
          <div className="flex items-center">
            <div className="p-2 bg-green-100 rounded-lg">
              <span className="text-2xl">📝</span>
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Active Homework</p>
              <p className="text-2xl font-semibold text-gray-900">{homework.length}</p>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg border shadow-sm">
          <div className="flex items-center">
            <div className="p-2 bg-purple-100 rounded-lg">
              <span className="text-2xl">📅</span>
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Timetable Entries</p>
              <p className="text-2xl font-semibold text-gray-900">{timetable.length}</p>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg border shadow-sm">
          <div className="flex items-center">
            <div className="p-2 bg-yellow-100 rounded-lg">
              <span className="text-2xl">📊</span>
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Recent Grades</p>
              <p className="text-2xl font-semibold text-gray-900">{grades.length}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="border-b border-gray-200 mb-6">
        <nav className="-mb-px flex space-x-8">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`py-2 px-1 border-b-2 font-medium text-sm ${
                activeTab === tab.id
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              <span className="mr-2">{tab.icon}</span>
              {tab.name}
            </button>
          ))}
        </nav>
      </div>

      {/* Tab Content */}
      <div className="bg-white rounded-lg border shadow-sm p-6">
        {activeTab === 'students' && (
          <div>
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-semibold text-gray-900">Students</h2>
              <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
                Add Student
              </button>
            </div>
            <StudentGrid students={students} isLoading={isLoading} />
          </div>
        )}

        {activeTab === 'homework' && (
          <div>
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-semibold text-gray-900">Homework & Assignments</h2>
              <button className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors">
                Create Assignment
              </button>
            </div>
            <HomeworkGrid homework={homework} isLoading={isLoading} userRole="ADMIN" />
          </div>
        )}

        {activeTab === 'timetable' && (
          <div>
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-semibold text-gray-900">Class Timetable</h2>
              <button className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition-colors">
                Manage Timetable
              </button>
            </div>
            <TimetableView timetable={timetable} isLoading={isLoading} viewMode="week" />
          </div>
        )}

        {activeTab === 'grades' && (
          <div>
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-semibold text-gray-900">Academic Grades</h2>
              <button className="bg-yellow-600 text-white px-4 py-2 rounded-lg hover:bg-yellow-700 transition-colors">
                Grade Submissions
              </button>
            </div>
            <GradeGrid grades={grades} isLoading={isLoading} groupBySubject={true} />
          </div>
        )}
      </div>
    </div>
  );
}