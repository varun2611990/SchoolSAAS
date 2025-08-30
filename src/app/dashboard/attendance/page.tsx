"use client"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { 
  Bell, 
  BookOpen, 
  Bus, 
  Calendar,
  ChevronDown, 
  DollarSign, 
  GraduationCap, 
  Home, 
  Menu, 
  Package, 
  Settings, 
  Users, 
} from "lucide-react"
import Link from "next/link"
import { useState } from "react"

interface SidebarItemProps {
  icon: React.ReactNode
  label: string
  count?: number
  href: string
  active?: boolean
}

function SidebarItem({ icon, label, count, href, active = false }: SidebarItemProps) {
  return (
    <Link 
      href={href}
      className={`flex items-center justify-between px-3 py-2 rounded-lg text-sm transition-colors ${
        active 
          ? "bg-indigo-100 text-indigo-700" 
          : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
      }`}
    >
      <div className="flex items-center space-x-3">
        {icon}
        <span>{label}</span>
      </div>
      {count && (
        <span className={`text-xs px-2 py-1 rounded-full ${
          active ? "bg-indigo-200 text-indigo-800" : "bg-gray-200 text-gray-600"
        }`}>
          {count}
        </span>
      )}
    </Link>
  )
}

export default function AttendancePage() {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [selectedDate, setSelectedDate] = useState("2024-03-15")

  const sidebarItems = [
    { icon: <Home className="h-4 w-4" />, label: "Dashboard", href: "/dashboard" },
    { icon: <Users className="h-4 w-4" />, label: "Students", count: 245, href: "/dashboard/students" },
    { icon: <GraduationCap className="h-4 w-4" />, label: "Teachers", count: 18, href: "/dashboard/teachers" },
    { icon: <Users className="h-4 w-4" />, label: "Parents", count: 198, href: "/dashboard/parents" },
    { icon: <DollarSign className="h-4 w-4" />, label: "Finance", href: "/dashboard/finance" },
    { icon: <Bus className="h-4 w-4" />, label: "Transport", href: "/dashboard/transport" },
    { icon: <BookOpen className="h-4 w-4" />, label: "Library", href: "/dashboard/library" },
    { icon: <Package className="h-4 w-4" />, label: "Inventory", href: "/dashboard/inventory" },
    { icon: <Settings className="h-4 w-4" />, label: "Settings", href: "/dashboard/settings" },
  ]

  // Sample student attendance data
  const students = [
    { roll: "001", name: "John Smith", attendance: "P", remarks: "" },
    { roll: "002", name: "Sarah Johnson", attendance: "P", remarks: "" },
    { roll: "003", name: "Mike Wilson", attendance: "A", remarks: "Sick leave" },
    { roll: "004", name: "Lisa Brown", attendance: "L", remarks: "Late arrival" },
    { roll: "005", name: "Tom Davis", attendance: "H", remarks: "Doctor visit" },
  ]

  const [attendanceData, setAttendanceData] = useState(
    students.map(student => ({
      ...student,
      attendance: student.attendance,
      remarks: student.remarks
    }))
  )

  const handleAttendanceChange = (index: number, value: string) => {
    const updated = [...attendanceData]
    updated[index].attendance = value
    setAttendanceData(updated)
  }

  const handleRemarksChange = (index: number, value: string) => {
    const updated = [...attendanceData]
    updated[index].remarks = value
    setAttendanceData(updated)
  }

  const getAttendanceSummary = () => {
    const present = attendanceData.filter(s => s.attendance === "P").length
    const absent = attendanceData.filter(s => s.attendance === "A").length
    const late = attendanceData.filter(s => s.attendance === "L").length
    const halfDay = attendanceData.filter(s => s.attendance === "H").length
    
    return { present, absent, late, halfDay }
  }

  const summary = getAttendanceSummary()

  const markAllPresent = () => {
    setAttendanceData(attendanceData.map(student => ({
      ...student,
      attendance: "P",
      remarks: ""
    })))
  }

  const markAllAbsent = () => {
    setAttendanceData(attendanceData.map(student => ({
      ...student,
      attendance: "A",
      remarks: ""
    })))
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200">
        <div className="flex items-center justify-between px-4 py-3">
          <div className="flex items-center space-x-4">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="lg:hidden"
            >
              <Menu className="h-6 w-6" />
            </Button>
            <div className="text-xl font-bold text-indigo-600">🏫 SchoolSaaS</div>
          </div>

          <div className="flex items-center space-x-4">
            <div className="text-sm text-gray-600 hidden sm:block">Springfield High</div>
            
            <Button variant="ghost" size="icon" className="relative">
              <Bell className="h-5 w-5" />
              <span className="absolute -top-1 -right-1 h-4 w-4 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
                3
              </span>
            </Button>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="flex items-center space-x-2">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src="/placeholder-avatar.jpg" alt="John Admin" />
                    <AvatarFallback>JA</AvatarFallback>
                  </Avatar>
                  <span className="hidden sm:inline">John Admin</span>
                  <ChevronDown className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>Profile</DropdownMenuItem>
                <DropdownMenuItem>Settings</DropdownMenuItem>
                <DropdownMenuItem>Support</DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem>Log out</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </header>

      <div className="flex">
        {/* Sidebar */}
        <aside className={`${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        } lg:translate-x-0 transition-transform duration-200 ease-in-out fixed lg:static inset-y-0 left-0 z-50 w-64 bg-white border-r border-gray-200 lg:block`}>
          <div className="flex flex-col h-full">
            <div className="p-4">
              <nav className="space-y-1">
                {sidebarItems.map((item, index) => (
                  <SidebarItem
                    key={index}
                    icon={item.icon}
                    label={item.label}
                    count={item.count}
                    href={item.href}
                    active={item.active}
                  />
                ))}
              </nav>
            </div>
          </div>
        </aside>

        {/* Overlay for mobile */}
        {sidebarOpen && (
          <div 
            className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
            onClick={() => setSidebarOpen(false)}
          />
        )}

        {/* Main Content */}
        <main className="flex-1 p-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Attendance Management - Class 10-A</h1>
              <p className="text-gray-600">Mark and manage student attendance</p>
            </div>
            <Button>Save Attendance</Button>
          </div>

          {/* Date Selection */}
          <Card className="mb-6">
            <CardContent className="pt-6">
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-2">
                  <Label htmlFor="date">Date:</Label>
                  <Input
                    id="date"
                    type="date"
                    value={selectedDate}
                    onChange={(e) => setSelectedDate(e.target.value)}
                    className="w-auto"
                  />
                  <Button variant="outline" size="icon">
                    <Calendar className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Attendance Table */}
          <Card className="mb-6">
            <CardContent className="p-0">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Roll</TableHead>
                    <TableHead>Name</TableHead>
                    <TableHead>P</TableHead>
                    <TableHead>A</TableHead>
                    <TableHead>L</TableHead>
                    <TableHead>H</TableHead>
                    <TableHead>Remarks</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {attendanceData.map((student, index) => (
                    <TableRow key={student.roll}>
                      <TableCell className="font-medium">{student.roll}</TableCell>
                      <TableCell>{student.name}</TableCell>
                      <TableCell>
                        <RadioGroup
                          value={student.attendance}
                          onValueChange={(value) => handleAttendanceChange(index, value)}
                        >
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="P" id={`${student.roll}-P`} />
                          </div>
                        </RadioGroup>
                      </TableCell>
                      <TableCell>
                        <RadioGroup
                          value={student.attendance}
                          onValueChange={(value) => handleAttendanceChange(index, value)}
                        >
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="A" id={`${student.roll}-A`} />
                          </div>
                        </RadioGroup>
                      </TableCell>
                      <TableCell>
                        <RadioGroup
                          value={student.attendance}
                          onValueChange={(value) => handleAttendanceChange(index, value)}
                        >
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="L" id={`${student.roll}-L`} />
                          </div>
                        </RadioGroup>
                      </TableCell>
                      <TableCell>
                        <RadioGroup
                          value={student.attendance}
                          onValueChange={(value) => handleAttendanceChange(index, value)}
                        >
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="H" id={`${student.roll}-H`} />
                          </div>
                        </RadioGroup>
                      </TableCell>
                      <TableCell>
                        <Input
                          value={student.remarks}
                          onChange={(e) => handleRemarksChange(index, e.target.value)}
                          placeholder="Add remarks..."
                          className="w-full"
                        />
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>

          {/* Summary */}
          <Card className="mb-6">
            <CardHeader>
              <CardTitle>Attendance Summary</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
                <div>
                  <div className="text-2xl font-bold text-green-600">{summary.present}</div>
                  <div className="text-sm text-gray-600">Present</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-red-600">{summary.absent}</div>
                  <div className="text-sm text-gray-600">Absent</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-yellow-600">{summary.late}</div>
                  <div className="text-sm text-gray-600">Late</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-blue-600">{summary.halfDay}</div>
                  <div className="text-sm text-gray-600">Half Day</div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Quick Actions */}
          <Card>
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-4">
                <Button onClick={markAllPresent} variant="outline">
                  Mark All Present
                </Button>
                <Button onClick={markAllAbsent} variant="outline">
                  Mark All Absent
                </Button>
                <Button variant="outline">
                  Previous Records
                </Button>
              </div>
            </CardContent>
          </Card>
        </main>
      </div>
    </div>
  )
}