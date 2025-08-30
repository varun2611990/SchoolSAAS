'use client'

import React from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { DataTable } from '@/components/ui/data-table'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { 
  Plus, 
  MoreHorizontal, 
  Eye, 
  Edit, 
  Download,
  Users,
  UserCheck,
  UserX,
  Clock
} from 'lucide-react'

// Mock student data
const mockStudents = [
  {
    id: 1,
    studentId: 'STU-2024-001',
    name: 'Alice Johnson',
    email: 'alice.johnson@email.com',
    class: 'Grade 10',
    section: 'A',
    status: 'Active',
    phone: '+1 234-567-8901',
    admissionDate: '2024-01-15',
    avatar: null
  },
  {
    id: 2,
    studentId: 'STU-2024-002',
    name: 'Bob Smith',
    email: 'bob.smith@email.com',
    class: 'Grade 9',
    section: 'B',
    status: 'Active',
    phone: '+1 234-567-8902',
    admissionDate: '2024-01-16',
    avatar: null
  },
  {
    id: 3,
    studentId: 'STU-2024-003',
    name: 'Charlie Brown',
    email: 'charlie.brown@email.com',
    class: 'Grade 11',
    section: 'A',
    status: 'Leave',
    phone: '+1 234-567-8903',
    admissionDate: '2024-01-17',
    avatar: null
  },
  {
    id: 4,
    studentId: 'STU-2024-004',
    name: 'Diana Prince',
    email: 'diana.prince@email.com',
    class: 'Grade 10',
    section: 'B',
    status: 'Active',
    phone: '+1 234-567-8904',
    admissionDate: '2024-01-18',
    avatar: null
  },
  {
    id: 5,
    studentId: 'STU-2024-005',
    name: 'Edward Wilson',
    email: 'edward.wilson@email.com',
    class: 'Grade 12',
    section: 'A',
    status: 'Suspended',
    phone: '+1 234-567-8905',
    admissionDate: '2024-01-19',
    avatar: null
  },
  {
    id: 6,
    studentId: 'STU-2024-006',
    name: 'Fiona Davis',
    email: 'fiona.davis@email.com',
    class: 'Grade 9',
    section: 'C',
    status: 'Active',
    phone: '+1 234-567-8906',
    admissionDate: '2024-01-20',
    avatar: null
  },
  {
    id: 7,
    studentId: 'STU-2024-007',
    name: 'George Miller',
    email: 'george.miller@email.com',
    class: 'Grade 11',
    section: 'B',
    status: 'Active',
    phone: '+1 234-567-8907',
    admissionDate: '2024-01-21',
    avatar: null
  },
  {
    id: 8,
    studentId: 'STU-2024-008',
    name: 'Hannah Taylor',
    email: 'hannah.taylor@email.com',
    class: 'Grade 10',
    section: 'C',
    status: 'Active',
    phone: '+1 234-567-8908',
    admissionDate: '2024-01-22',
    avatar: null
  }
]

type Student = typeof mockStudents[0]

const getStatusBadgeVariant = (status: string) => {
  switch (status) {
    case 'Active':
      return 'success'
    case 'Leave':
      return 'warning'
    case 'Suspended':
      return 'destructive'
    default:
      return 'secondary'
  }
}

const getStatusIcon = (status: string) => {
  switch (status) {
    case 'Active':
      return <UserCheck className="h-3 w-3" />
    case 'Leave':
      return <Clock className="h-3 w-3" />
    case 'Suspended':
      return <UserX className="h-3 w-3" />
    default:
      return <Users className="h-3 w-3" />
  }
}

export default function StudentsPage() {
  const columns = [
    {
      id: 'name' as keyof Student,
      header: 'Student',
      cell: (value: any, row: Student) => (
        <div className="flex items-center space-x-3">
          <Avatar className="h-8 w-8">
            <AvatarImage src={row.avatar || ''} alt={row.name} />
            <AvatarFallback>{row.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
          </Avatar>
          <div>
            <div className="font-medium">{row.name}</div>
            <div className="text-sm text-gray-500">{row.studentId}</div>
          </div>
        </div>
      ),
      sortable: true
    },
    {
      id: 'email' as keyof Student,
      header: 'Email',
      sortable: true
    },
    {
      id: 'class' as keyof Student,
      header: 'Class',
      sortable: true,
      filterable: true
    },
    {
      id: 'section' as keyof Student,
      header: 'Section',
      sortable: true,
      filterable: true
    },
    {
      id: 'status' as keyof Student,
      header: 'Status',
      cell: (value: any) => (
        <Badge variant={getStatusBadgeVariant(value) as any} className="flex items-center space-x-1">
          {getStatusIcon(value)}
          <span>{value}</span>
        </Badge>
      ),
      sortable: true,
      filterable: true
    },
    {
      id: 'admissionDate' as keyof Student,
      header: 'Admission Date',
      cell: (value: any) => new Date(value).toLocaleDateString(),
      sortable: true
    },
    {
      id: 'actions' as keyof Student,
      header: 'Actions',
      cell: (value: any, row: Student) => (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="sm">
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem>
              <Eye className="mr-2 h-4 w-4" />
              View Profile
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Edit className="mr-2 h-4 w-4" />
              Edit Student
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Download className="mr-2 h-4 w-4" />
              Download Records
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )
    }
  ]

  const stats = [
    {
      title: 'Total Students',
      value: mockStudents.length,
      description: 'All enrolled students',
      icon: Users,
      color: 'bg-blue-100 text-blue-600'
    },
    {
      title: 'Active Students',
      value: mockStudents.filter(s => s.status === 'Active').length,
      description: 'Currently attending',
      icon: UserCheck,
      color: 'bg-green-100 text-green-600'
    },
    {
      title: 'On Leave',
      value: mockStudents.filter(s => s.status === 'Leave').length,
      description: 'Temporary absence',
      icon: Clock,
      color: 'bg-yellow-100 text-yellow-600'
    },
    {
      title: 'Suspended',
      value: mockStudents.filter(s => s.status === 'Suspended').length,
      description: 'Disciplinary action',
      icon: UserX,
      color: 'bg-red-100 text-red-600'
    }
  ]

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Student Management</h1>
          <p className="text-gray-600">Manage student profiles, enrollment, and academic records</p>
        </div>
        <div className="flex space-x-3 mt-4 sm:mt-0">
          <Button variant="outline">
            <Download className="mr-2 h-4 w-4" />
            Export Data
          </Button>
          <Link href="/dashboard/students/new">
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Add Student
            </Button>
          </Link>
        </div>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => {
          const Icon = stat.icon
          return (
            <Card key={index}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-gray-600">
                  {stat.title}
                </CardTitle>
                <div className={`p-2 rounded-lg ${stat.color}`}>
                  <Icon className="h-4 w-4" />
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stat.value}</div>
                <p className="text-xs text-gray-500 mt-1">{stat.description}</p>
              </CardContent>
            </Card>
          )
        })}
      </div>

      {/* Students Data Table */}
      <DataTable
        data={mockStudents}
        columns={columns}
        onRowClick={(student) => {
          // Navigate to student profile
          console.log('Navigate to student:', student.id)
        }}
      />
    </div>
  )
}