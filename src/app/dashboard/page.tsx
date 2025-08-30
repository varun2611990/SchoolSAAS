"use client"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { 
  Bell, 
  BookOpen, 
  Bus, 
  ChevronDown, 
  DollarSign, 
  GraduationCap, 
  Home, 
  Menu, 
  Package, 
  Settings, 
  Users, 
  Plus,
  Mail,
  FileText
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

export default function DashboardPage() {
  const [sidebarOpen, setSidebarOpen] = useState(false)

  const sidebarItems = [
    { icon: <Home className="h-4 w-4" />, label: "Dashboard", href: "/dashboard", active: true },
    { icon: <Users className="h-4 w-4" />, label: "Students", count: 245, href: "/dashboard/students" },
    { icon: <GraduationCap className="h-4 w-4" />, label: "Teachers", count: 18, href: "/dashboard/teachers" },
    { icon: <Users className="h-4 w-4" />, label: "Parents", count: 198, href: "/dashboard/parents" },
    { icon: <DollarSign className="h-4 w-4" />, label: "Finance", href: "/dashboard/finance" },
    { icon: <Bus className="h-4 w-4" />, label: "Transport", href: "/dashboard/transport" },
    { icon: <BookOpen className="h-4 w-4" />, label: "Library", href: "/dashboard/library" },
    { icon: <Package className="h-4 w-4" />, label: "Inventory", href: "/dashboard/inventory" },
    { icon: <Settings className="h-4 w-4" />, label: "Settings", href: "/dashboard/settings" },
  ]

  const stats = [
    { title: "Students", value: "245", change: "+5 new", changeType: "positive", description: "this week" },
    { title: "Teachers", value: "18", change: "2 leave", changeType: "neutral", description: "requests" },
    { title: "Parents", value: "198", change: "12 new", changeType: "positive", description: "messages" },
    { title: "Revenue", value: "$45,230", change: "+8%", changeType: "positive", description: "this month" },
  ]

  const recentActivities = [
    "New student admission",
    "Fee payment received", 
    "Leave request approved",
    "Transport route updated"
  ]

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
          <div className="mb-8">
            <h1 className="text-2xl font-bold text-gray-900 mb-2">Welcome back, John! 👋</h1>
            <p className="text-gray-600">Here&apos;s what&apos;s happening at your school today.</p>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {stats.map((stat, index) => (
              <Card key={index}>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{stat.value}</div>
                  <p className="text-xs text-gray-500">
                    <span className={`${
                      stat.changeType === 'positive' ? 'text-green-600' : 
                      stat.changeType === 'negative' ? 'text-red-600' : 'text-gray-600'
                    }`}>
                      {stat.change}
                    </span>
                    {' '}
                    {stat.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Recent Activities */}
            <Card className="lg:col-span-2">
              <CardHeader>
                <CardTitle>Recent Activities</CardTitle>
                <CardDescription>Latest events in your school</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentActivities.map((activity, index) => (
                    <div key={index} className="flex items-center space-x-3">
                      <div className="h-2 w-2 bg-indigo-600 rounded-full"></div>
                      <span className="text-sm text-gray-600">{activity}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card>
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
                <CardDescription>Common tasks</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button className="w-full justify-start" variant="outline">
                  <Plus className="mr-2 h-4 w-4" />
                  Add Student
                </Button>
                <Button className="w-full justify-start" variant="outline">
                  <Plus className="mr-2 h-4 w-4" />
                  Add Teacher
                </Button>
                <Button className="w-full justify-start" variant="outline">
                  <Mail className="mr-2 h-4 w-4" />
                  Send Notice
                </Button>
                <Button className="w-full justify-start" variant="outline">
                  <FileText className="mr-2 h-4 w-4" />
                  View Report
                </Button>
              </CardContent>
            </Card>
          </div>
        </main>
      </div>
    </div>
  )
}