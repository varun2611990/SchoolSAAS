"use client"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { 
  Bell, 
  BookOpen, 
  Bus, 
  ChevronDown, 
  DollarSign, 
  FileText,
  GraduationCap, 
  Home, 
  Mail,
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

export default function FinancePage() {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [activeTab, setActiveTab] = useState("transactions")

  const sidebarItems = [
    { icon: <Home className="h-4 w-4" />, label: "Dashboard", href: "/dashboard" },
    { icon: <Users className="h-4 w-4" />, label: "Students", count: 245, href: "/dashboard/students" },
    { icon: <GraduationCap className="h-4 w-4" />, label: "Teachers", count: 18, href: "/dashboard/teachers" },
    { icon: <Users className="h-4 w-4" />, label: "Parents", count: 198, href: "/dashboard/parents" },
    { icon: <DollarSign className="h-4 w-4" />, label: "Finance", href: "/dashboard/finance", active: true },
    { icon: <Bus className="h-4 w-4" />, label: "Transport", href: "/dashboard/transport" },
    { icon: <BookOpen className="h-4 w-4" />, label: "Library", href: "/dashboard/library" },
    { icon: <Package className="h-4 w-4" />, label: "Inventory", href: "/dashboard/inventory" },
    { icon: <Settings className="h-4 w-4" />, label: "Settings", href: "/dashboard/settings" },
  ]

  const financeStats = [
    { title: "Total Fees Generated", value: "$125,450", description: "This academic year" },
    { title: "Collected", value: "$98,760", description: "78.7% collection rate" },
    { title: "Pending", value: "$26,690", description: "21.3% pending" },
    { title: "Overdue", value: "$15,230", description: "12.1% overdue" },
  ]

  const recentTransactions = [
    { date: "15/03/24", student: "John Smith", amount: "$1,200", status: "Paid", action: "View" },
    { date: "14/03/24", student: "Sarah Johnson", amount: "$1,200", status: "Pending", action: "Send" },
    { date: "13/03/24", student: "Mike Wilson", amount: "$1,200", status: "Overdue", action: "Remind" },
    { date: "12/03/24", student: "Lisa Brown", amount: "$1,200", status: "Paid", action: "View" },
    { date: "11/03/24", student: "Tom Davis", amount: "$1,200", status: "Pending", action: "Send" },
  ]

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Paid":
        return "bg-green-100 text-green-800"
      case "Pending":
        return "bg-yellow-100 text-yellow-800"
      case "Overdue":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getActionButton = (action: string, status: string) => {
    switch (action) {
      case "View":
        return <Button variant="ghost" size="sm">View</Button>
      case "Send":
        return <Button variant="ghost" size="sm">Send</Button>
      case "Remind":
        return <Button variant="ghost" size="sm" className="text-red-600">Remind</Button>
      default:
        return <Button variant="ghost" size="sm">View</Button>
    }
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
          <div className="mb-8">
            <h1 className="text-2xl font-bold text-gray-900 mb-2">Finance Management</h1>
            <p className="text-gray-600">Track payments, manage invoices, and monitor financial health</p>
          </div>

          {/* Finance Stats */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {financeStats.map((stat, index) => (
              <Card key={index}>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
                  <DollarSign className="h-4 w-4 text-gray-600" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{stat.value}</div>
                  <p className="text-xs text-gray-500">{stat.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Tabs */}
          <Card className="mb-6">
            <CardHeader>
              <div className="flex space-x-4 border-b">
                <button
                  className={`px-4 py-2 text-sm font-medium border-b-2 transition-colors ${
                    activeTab === "transactions"
                      ? "border-indigo-600 text-indigo-600"
                      : "border-transparent text-gray-600 hover:text-gray-900"
                  }`}
                  onClick={() => setActiveTab("transactions")}
                >
                  Recent Transactions
                </button>
                <button
                  className={`px-4 py-2 text-sm font-medium border-b-2 transition-colors ${
                    activeTab === "structure"
                      ? "border-indigo-600 text-indigo-600"
                      : "border-transparent text-gray-600 hover:text-gray-900"
                  }`}
                  onClick={() => setActiveTab("structure")}
                >
                  Fee Structure
                </button>
                <button
                  className={`px-4 py-2 text-sm font-medium border-b-2 transition-colors ${
                    activeTab === "invoices"
                      ? "border-indigo-600 text-indigo-600"
                      : "border-transparent text-gray-600 hover:text-gray-900"
                  }`}
                  onClick={() => setActiveTab("invoices")}
                >
                  Invoices
                </button>
                <button
                  className={`px-4 py-2 text-sm font-medium border-b-2 transition-colors ${
                    activeTab === "reports"
                      ? "border-indigo-600 text-indigo-600"
                      : "border-transparent text-gray-600 hover:text-gray-900"
                  }`}
                  onClick={() => setActiveTab("reports")}
                >
                  Reports
                </button>
              </div>
            </CardHeader>
            <CardContent className="p-0">
              {activeTab === "transactions" && (
                <div>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Date</TableHead>
                        <TableHead>Student</TableHead>
                        <TableHead>Amount</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Action</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {recentTransactions.map((transaction, index) => (
                        <TableRow key={index}>
                          <TableCell className="font-medium">{transaction.date}</TableCell>
                          <TableCell>{transaction.student}</TableCell>
                          <TableCell>{transaction.amount}</TableCell>
                          <TableCell>
                            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(transaction.status)}`}>
                              {transaction.status}
                            </span>
                          </TableCell>
                          <TableCell>
                            {getActionButton(transaction.action, transaction.status)}
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              )}
              {activeTab === "structure" && (
                <div className="p-6">
                  <p className="text-gray-600">Fee structure management coming soon...</p>
                </div>
              )}
              {activeTab === "invoices" && (
                <div className="p-6">
                  <p className="text-gray-600">Invoice management coming soon...</p>
                </div>
              )}
              {activeTab === "reports" && (
                <div className="p-6">
                  <p className="text-gray-600">Financial reports coming soon...</p>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Quick Actions */}
          <Card>
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
              <CardDescription>Common financial tasks</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-4">
                <Button>
                  <FileText className="mr-2 h-4 w-4" />
                  Generate Invoices
                </Button>
                <Button variant="outline">
                  <Mail className="mr-2 h-4 w-4" />
                  Send Reminders
                </Button>
                <Button variant="outline">
                  <DollarSign className="mr-2 h-4 w-4" />
                  Payment Link
                </Button>
                <Button variant="outline">
                  <FileText className="mr-2 h-4 w-4" />
                  Financial Report
                </Button>
              </div>
            </CardContent>
          </Card>
        </main>
      </div>
    </div>
  )
}