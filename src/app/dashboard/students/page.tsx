"use client"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { 
  Bell, 
  BookOpen, 
  Bus, 
  ChevronDown, 
  ChevronLeft,
  ChevronRight,
  DollarSign, 
  Edit,
  Eye,
  GraduationCap, 
  Home, 
  Menu, 
  Package, 
  Plus,
  Search,
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

export default function StudentsPage() {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedClass, setSelectedClass] = useState("all")
  const [selectedSection, setSelectedSection] = useState("all")
  const [selectedStatus, setSelectedStatus] = useState("all")
  const [currentPage, setCurrentPage] = useState(1)
  const [studentsPerPage] = useState(5)

  const sidebarItems = [
    { icon: <Home className="h-4 w-4" />, label: "Dashboard", href: "/dashboard" },
    { icon: <Users className="h-4 w-4" />, label: "Students", count: 245, href: "/dashboard/students", active: true },
    { icon: <GraduationCap className="h-4 w-4" />, label: "Teachers", count: 18, href: "/dashboard/teachers" },
    { icon: <Users className="h-4 w-4" />, label: "Parents", count: 198, href: "/dashboard/parents" },
    { icon: <DollarSign className="h-4 w-4" />, label: "Finance", href: "/dashboard/finance" },
    { icon: <Bus className="h-4 w-4" />, label: "Transport", href: "/dashboard/transport" },
    { icon: <BookOpen className="h-4 w-4" />, label: "Library", href: "/dashboard/library" },
    { icon: <Package className="h-4 w-4" />, label: "Inventory", href: "/dashboard/inventory" },
    { icon: <Settings className="h-4 w-4" />, label: "Settings", href: "/dashboard/settings" },
  ]

  // Sample student data
  const students = [
    { id: "01", name: "John Smith", class: "10", section: "A", roll: "001", status: "Active" },
    { id: "02", name: "Sarah Johnson", class: "10", section: "A", roll: "002", status: "Active" },
    { id: "03", name: "Mike Wilson", class: "10", section: "B", roll: "003", status: "Active" },
    { id: "04", name: "Lisa Brown", class: "9", section: "A", roll: "001", status: "Active" },
    { id: "05", name: "Tom Davis", class: "9", section: "A", roll: "002", status: "Leave" },
    { id: "06", name: "Emma Garcia", class: "10", section: "A", roll: "004", status: "Active" },
    { id: "07", name: "Alex Chen", class: "9", section: "B", roll: "003", status: "Active" },
    { id: "08", name: "Maria Rodriguez", class: "10", section: "B", roll: "005", status: "Active" },
  ]

  // Filter students based on search and filters
  const filteredStudents = students.filter(student => {
    const matchesSearch = student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         student.id.includes(searchTerm)
    const matchesClass = selectedClass === "all" || student.class === selectedClass
    const matchesSection = selectedSection === "all" || student.section === selectedSection
    const matchesStatus = selectedStatus === "all" || student.status.toLowerCase() === selectedStatus.toLowerCase()
    
    return matchesSearch && matchesClass && matchesSection && matchesStatus
  })

  // Pagination
  const totalPages = Math.ceil(filteredStudents.length / studentsPerPage)
  const startIndex = (currentPage - 1) * studentsPerPage
  const paginatedStudents = filteredStudents.slice(startIndex, startIndex + studentsPerPage)

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
              <h1 className="text-2xl font-bold text-gray-900">Students Management</h1>
              <p className="text-gray-600">Manage all student information and records</p>
            </div>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              Add Student
            </Button>
          </div>

          {/* Filters */}
          <Card className="mb-6">
            <CardContent className="pt-6">
              <div className="flex flex-col sm:flex-row gap-4">
                <div className="flex-1">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                    <Input
                      placeholder="Search students..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                </div>
                <Select value={selectedClass} onValueChange={setSelectedClass}>
                  <SelectTrigger className="w-full sm:w-32">
                    <SelectValue placeholder="Class" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Classes</SelectItem>
                    <SelectItem value="9">Class 9</SelectItem>
                    <SelectItem value="10">Class 10</SelectItem>
                    <SelectItem value="11">Class 11</SelectItem>
                    <SelectItem value="12">Class 12</SelectItem>
                  </SelectContent>
                </Select>
                <Select value={selectedSection} onValueChange={setSelectedSection}>
                  <SelectTrigger className="w-full sm:w-32">
                    <SelectValue placeholder="Section" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Sections</SelectItem>
                    <SelectItem value="A">Section A</SelectItem>
                    <SelectItem value="B">Section B</SelectItem>
                    <SelectItem value="C">Section C</SelectItem>
                    <SelectItem value="D">Section D</SelectItem>
                  </SelectContent>
                </Select>
                <Select value={selectedStatus} onValueChange={setSelectedStatus}>
                  <SelectTrigger className="w-full sm:w-32">
                    <SelectValue placeholder="Status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Status</SelectItem>
                    <SelectItem value="active">Active</SelectItem>
                    <SelectItem value="leave">On Leave</SelectItem>
                    <SelectItem value="inactive">Inactive</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>

          {/* Students Table */}
          <Card>
            <CardContent className="p-0">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>ID</TableHead>
                    <TableHead>Name</TableHead>
                    <TableHead>Class</TableHead>
                    <TableHead>Section</TableHead>
                    <TableHead>Roll</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {paginatedStudents.map((student) => (
                    <TableRow key={student.id}>
                      <TableCell className="font-medium">{student.id}</TableCell>
                      <TableCell>{student.name}</TableCell>
                      <TableCell>{student.class}</TableCell>
                      <TableCell>{student.section}</TableCell>
                      <TableCell>{student.roll}</TableCell>
                      <TableCell>
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                          student.status === 'Active' 
                            ? 'bg-green-100 text-green-800' 
                            : 'bg-yellow-100 text-yellow-800'
                        }`}>
                          {student.status}
                        </span>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center space-x-2">
                          <Button variant="ghost" size="icon">
                            <Eye className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="icon">
                            <Edit className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>

          {/* Pagination */}
          <div className="flex items-center justify-between mt-6">
            <div className="text-sm text-gray-600">
              Showing {startIndex + 1}-{Math.min(startIndex + studentsPerPage, filteredStudents.length)} of {filteredStudents.length} students
            </div>
            <div className="flex items-center space-x-2">
              <Button 
                variant="outline" 
                size="icon"
                onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                disabled={currentPage === 1}
              >
                <ChevronLeft className="h-4 w-4" />
              </Button>
              
              {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                const pageNum = i + 1
                return (
                  <Button
                    key={pageNum}
                    variant={currentPage === pageNum ? "default" : "outline"}
                    size="icon"
                    onClick={() => setCurrentPage(pageNum)}
                  >
                    {pageNum}
                  </Button>
                )
              })}
              
              {totalPages > 5 && (
                <>
                  <span className="text-gray-400">...</span>
                  <Button
                    variant={currentPage === totalPages ? "default" : "outline"}
                    size="icon"
                    onClick={() => setCurrentPage(totalPages)}
                  >
                    {totalPages}
                  </Button>
                </>
              )}
              
              <Button 
                variant="outline" 
                size="icon"
                onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                disabled={currentPage === totalPages}
              >
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}