'use client'

import React, { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { Label } from '@/components/ui/label'
import { Checkbox } from '@/components/ui/checkbox'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Input } from '@/components/ui/input'
import {
  Calendar,
  Save,
  Users,
  UserCheck,
  UserX,
  Clock,
  Download,
  Filter,
  CheckCircle,
  XCircle
} from 'lucide-react'

// Mock student data for attendance
const mockStudents = [
  {
    id: 1,
    studentId: 'STU-2024-001',
    name: 'Alice Johnson',
    class: 'Grade 10',
    section: 'A',
    rollNumber: '001',
    avatar: null,
    attendance: 'present' as AttendanceStatus,
    remarks: ''
  },
  {
    id: 2,
    studentId: 'STU-2024-002',
    name: 'Bob Smith',
    class: 'Grade 10',
    section: 'A',
    rollNumber: '002',
    avatar: null,
    attendance: 'absent' as AttendanceStatus,
    remarks: 'Sick leave'
  },
  {
    id: 3,
    studentId: 'STU-2024-003',
    name: 'Charlie Brown',
    class: 'Grade 10',
    section: 'A',
    rollNumber: '003',
    avatar: null,
    attendance: 'present' as AttendanceStatus,
    remarks: ''
  },
  {
    id: 4,
    studentId: 'STU-2024-004',
    name: 'Diana Prince',
    class: 'Grade 10',
    section: 'A',
    rollNumber: '004',
    avatar: null,
    attendance: 'late' as AttendanceStatus,
    remarks: 'Arrived 30 minutes late'
  },
  {
    id: 5,
    studentId: 'STU-2024-005',
    name: 'Edward Wilson',
    class: 'Grade 10',
    section: 'A',
    rollNumber: '005',
    avatar: null,
    attendance: 'half-day' as AttendanceStatus,
    remarks: 'Left early for appointment'
  },
  {
    id: 6,
    studentId: 'STU-2024-006',
    name: 'Fiona Davis',
    class: 'Grade 10',
    section: 'A',
    rollNumber: '006',
    avatar: null,
    attendance: 'present' as AttendanceStatus,
    remarks: ''
  }
]

type AttendanceStatus = 'present' | 'absent' | 'late' | 'half-day'

interface Student {
  id: number
  studentId: string
  name: string
  class: string
  section: string
  rollNumber: string
  avatar: string | null
  attendance: AttendanceStatus
  remarks: string
}

const attendanceOptions = [
  { value: 'present', label: 'Present', color: 'text-green-600', bgColor: 'bg-green-100' },
  { value: 'absent', label: 'Absent', color: 'text-red-600', bgColor: 'bg-red-100' },
  { value: 'late', label: 'Late', color: 'text-yellow-600', bgColor: 'bg-yellow-100' },
  { value: 'half-day', label: 'Half Day', color: 'text-blue-600', bgColor: 'bg-blue-100' },
]

export default function AttendancePage() {
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0])
  const [selectedClass, setSelectedClass] = useState('Grade 10')
  const [selectedSection, setSelectedSection] = useState('A')
  const [students, setStudents] = useState<Student[]>(mockStudents)
  const [selectAll, setSelectAll] = useState(false)

  const updateAttendance = (studentId: number, status: AttendanceStatus) => {
    setStudents(prev => prev.map(student => 
      student.id === studentId 
        ? { ...student, attendance: status }
        : student
    ))
  }

  const updateRemarks = (studentId: number, remarks: string) => {
    setStudents(prev => prev.map(student => 
      student.id === studentId 
        ? { ...student, remarks }
        : student
    ))
  }

  const markAllPresent = () => {
    setStudents(prev => prev.map(student => ({ ...student, attendance: 'present' as AttendanceStatus })))
  }

  const markAllAbsent = () => {
    setStudents(prev => prev.map(student => ({ ...student, attendance: 'absent' as AttendanceStatus })))
  }

  const saveAttendance = () => {
    // Implement save logic
    console.log('Saving attendance for date:', selectedDate)
    console.log('Students:', students)
    alert('Attendance saved successfully!')
  }

  const getAttendanceStats = () => {
    const present = students.filter(s => s.attendance === 'present').length
    const absent = students.filter(s => s.attendance === 'absent').length
    const late = students.filter(s => s.attendance === 'late').length
    const halfDay = students.filter(s => s.attendance === 'half-day').length
    const total = students.length
    
    return {
      present,
      absent,
      late,
      halfDay,
      total,
      percentage: total > 0 ? Math.round((present / total) * 100) : 0
    }
  }

  const stats = getAttendanceStats()

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Attendance Management</h1>
          <p className="text-gray-600">Mark and track student attendance for daily classes</p>
        </div>
        <div className="flex space-x-3 mt-4 sm:mt-0">
          <Button variant="outline">
            <Download className="mr-2 h-4 w-4" />
            Export Report
          </Button>
          <Button onClick={saveAttendance}>
            <Save className="mr-2 h-4 w-4" />
            Save Attendance
          </Button>
        </div>
      </div>

      {/* Filters and Date Selection */}
      <Card>
        <CardHeader>
          <CardTitle>Attendance Settings</CardTitle>
          <CardDescription>Select date, class, and section to mark attendance</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div>
              <Label htmlFor="date">Date</Label>
              <Input
                id="date"
                type="date"
                value={selectedDate}
                onChange={(e) => setSelectedDate(e.target.value)}
              />
            </div>
            
            <div>
              <Label htmlFor="class">Class</Label>
              <Select value={selectedClass} onValueChange={setSelectedClass}>
                <SelectTrigger>
                  <SelectValue placeholder="Select class" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Grade 9">Grade 9</SelectItem>
                  <SelectItem value="Grade 10">Grade 10</SelectItem>
                  <SelectItem value="Grade 11">Grade 11</SelectItem>
                  <SelectItem value="Grade 12">Grade 12</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div>
              <Label htmlFor="section">Section</Label>
              <Select value={selectedSection} onValueChange={setSelectedSection}>
                <SelectTrigger>
                  <SelectValue placeholder="Select section" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="A">Section A</SelectItem>
                  <SelectItem value="B">Section B</SelectItem>
                  <SelectItem value="C">Section C</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="flex items-end space-x-2">
              <Button onClick={markAllPresent} variant="outline" size="sm">
                <CheckCircle className="mr-1 h-4 w-4" />
                All Present
              </Button>
              <Button onClick={markAllAbsent} variant="outline" size="sm">
                <XCircle className="mr-1 h-4 w-4" />
                All Absent
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Attendance Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Students</CardTitle>
            <Users className="h-4 w-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.total}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Present</CardTitle>
            <UserCheck className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">{stats.present}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Absent</CardTitle>
            <UserX className="h-4 w-4 text-red-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">{stats.absent}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Late</CardTitle>
            <Clock className="h-4 w-4 text-yellow-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-yellow-600">{stats.late}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Attendance %</CardTitle>
            <div className="text-xs font-medium text-gray-500">Overall</div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.percentage}%</div>
          </CardContent>
        </Card>
      </div>

      {/* Student Attendance List */}
      <Card>
        <CardHeader>
          <CardTitle>
            Student Attendance - {selectedClass} {selectedSection}
          </CardTitle>
          <CardDescription>
            Mark attendance for {new Date(selectedDate).toLocaleDateString('en-US', { 
              weekday: 'long', 
              year: 'numeric', 
              month: 'long', 
              day: 'numeric' 
            })}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {students.map((student) => (
              <div
                key={student.id}
                className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50"
              >
                <div className="flex items-center space-x-4">
                  <Avatar className="h-10 w-10">
                    <AvatarImage src={student.avatar || ''} alt={student.name} />
                    <AvatarFallback>{student.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                  </Avatar>
                  
                  <div>
                    <div className="font-medium">{student.name}</div>
                    <div className="text-sm text-gray-500">
                      Roll No: {student.rollNumber} | {student.studentId}
                    </div>
                  </div>
                </div>

                <div className="flex items-center space-x-6">
                  {/* Attendance Radio Buttons */}
                  <RadioGroup
                    value={student.attendance}
                    onValueChange={(value) => updateAttendance(student.id, value as AttendanceStatus)}
                    className="flex space-x-4"
                  >
                    {attendanceOptions.map((option) => (
                      <div key={option.value} className="flex items-center space-x-2">
                        <RadioGroupItem
                          value={option.value}
                          id={`${student.id}-${option.value}`}
                        />
                        <Label
                          htmlFor={`${student.id}-${option.value}`}
                          className={`text-sm font-medium cursor-pointer ${
                            student.attendance === option.value ? option.color : 'text-gray-500'
                          }`}
                        >
                          {option.label}
                        </Label>
                      </div>
                    ))}
                  </RadioGroup>

                  {/* Remarks Input */}
                  <div className="w-48">
                    <Input
                      placeholder="Add remarks..."
                      value={student.remarks}
                      onChange={(e) => updateRemarks(student.id, e.target.value)}
                      className="text-sm"
                    />
                  </div>

                  {/* Status Badge */}
                  <Badge
                    variant={
                      student.attendance === 'present' ? 'success' :
                      student.attendance === 'absent' ? 'destructive' :
                      student.attendance === 'late' ? 'warning' : 'info'
                    }
                  >
                    {attendanceOptions.find(opt => opt.value === student.attendance)?.label}
                  </Badge>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}