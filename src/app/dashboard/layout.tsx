'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { Badge } from '@/components/ui/badge'
import {
  LayoutDashboard,
  Users,
  UserCheck,
  DollarSign,
  Bus,
  BookOpen,
  Package,
  Settings,
  Menu,
  X,
  Bell,
  ChevronDown,
  LogOut,
  User,
  GraduationCap
} from 'lucide-react'

const navigation = [
  { name: 'Dashboard', href: '/dashboard', icon: LayoutDashboard, count: null },
  { name: 'Students', href: '/dashboard/students', icon: Users, count: 245 },
  { name: 'SIS Module', href: '/dashboard/sis', icon: GraduationCap, count: null },
  { name: 'Teachers', href: '/dashboard/teachers', icon: UserCheck, count: 18 },
  { name: 'Parents', href: '/dashboard/parents', icon: Users, count: 198 },
  { name: 'Finance', href: '/dashboard/finance', icon: DollarSign, count: null },
  { name: 'Transport', href: '/dashboard/transport', icon: Bus, count: null },
  { name: 'Library', href: '/dashboard/library', icon: BookOpen, count: null },
  { name: 'Inventory', href: '/dashboard/inventory', icon: Package, count: null },
  { name: 'Settings', href: '/dashboard/settings', icon: Settings, count: null },
]

interface DashboardLayoutProps {
  children: React.ReactNode
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const pathname = usePathname()

  return (
    <div className="h-screen flex bg-gray-50">
      {/* Mobile sidebar overlay */}
      {sidebarOpen && (
        <div className="fixed inset-0 z-40 lg:hidden">
          <div className="fixed inset-0 bg-black bg-opacity-50" onClick={() => setSidebarOpen(false)} />
        </div>
      )}

      {/* Sidebar */}
      <div className={`
        fixed inset-y-0 left-0 z-50 w-64 bg-white shadow-lg transform transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:inset-0
        ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}
      `}>
        <div className="flex flex-col h-full">
          {/* Sidebar header */}
          <div className="flex items-center justify-between h-16 px-6 border-b border-gray-200">
            <Link href="/dashboard" className="flex items-center space-x-2">
              <span className="text-2xl">🏫</span>
              <span className="text-xl font-bold text-gray-900">SchoolSaaS</span>
            </Link>
            <button
              onClick={() => setSidebarOpen(false)}
              className="lg:hidden p-1 rounded-md hover:bg-gray-100"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          {/* School selector */}
          <div className="px-6 py-4 border-b border-gray-200">
            <DropdownMenu>
              <DropdownMenuTrigger className="w-full">
                <div className="flex items-center justify-between p-2 rounded-lg hover:bg-gray-50 cursor-pointer">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-indigo-100 rounded-lg flex items-center justify-center">
                      <span className="text-sm font-medium text-indigo-600">SH</span>
                    </div>
                    <div className="text-left">
                      <p className="text-sm font-medium text-gray-900">Springfield High</p>
                      <p className="text-xs text-gray-500">Primary School</p>
                    </div>
                  </div>
                  <ChevronDown className="h-4 w-4 text-gray-400" />
                </div>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56">
                <DropdownMenuLabel>Switch School</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <div className="flex items-center space-x-2">
                    <div className="w-6 h-6 bg-indigo-100 rounded flex items-center justify-center">
                      <span className="text-xs font-medium text-indigo-600">SH</span>
                    </div>
                    <span>Springfield High</span>
                  </div>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <div className="flex items-center space-x-2">
                    <div className="w-6 h-6 bg-green-100 rounded flex items-center justify-center">
                      <span className="text-xs font-medium text-green-600">ME</span>
                    </div>
                    <span>Maple Elementary</span>
                  </div>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem>+ Add School</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          {/* Navigation */}
          <nav className="flex-1 px-4 py-4 space-y-1 overflow-y-auto">
            {navigation.map((item) => {
              const Icon = item.icon
              const isActive = pathname === item.href
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`
                    flex items-center justify-between px-3 py-2 rounded-lg text-sm font-medium transition-colors
                    ${isActive 
                      ? 'bg-indigo-100 text-indigo-700' 
                      : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                    }
                  `}
                  onClick={() => setSidebarOpen(false)}
                >
                  <div className="flex items-center space-x-3">
                    <Icon className="h-5 w-5" />
                    <span>{item.name}</span>
                  </div>
                  {item.count && (
                    <Badge variant="secondary" className="text-xs">
                      {item.count}
                    </Badge>
                  )}
                </Link>
              )
            })}
          </nav>

          {/* Sidebar footer */}
          <div className="p-4 border-t border-gray-200">
            <div className="text-xs text-gray-500 mb-2">Need help?</div>
            <Button variant="ghost" size="sm" className="w-full justify-start">
              <span className="text-xs">Contact Support</span>
            </Button>
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top bar */}
        <header className="bg-white shadow-sm border-b border-gray-200">
          <div className="flex items-center justify-between h-16 px-6">
            <div className="flex items-center space-x-4">
              <button
                onClick={() => setSidebarOpen(true)}
                className="lg:hidden p-1 rounded-md hover:bg-gray-100"
              >
                <Menu className="h-5 w-5" />
              </button>
              
              <div className="hidden lg:block">
                <h1 className="text-lg font-semibold text-gray-900">
                  {navigation.find(item => item.href === pathname)?.name || 'Dashboard'}
                </h1>
              </div>
            </div>

            <div className="flex items-center space-x-4">
              {/* Search */}
              <div className="hidden md:block">
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Search..."
                    className="w-64 pl-8 pr-4 py-2 text-sm bg-gray-100 border-0 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center">
                    <svg className="h-4 w-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                  </div>
                </div>
              </div>

              {/* Notifications */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="sm" className="relative">
                    <Bell className="h-5 w-5" />
                    <Badge className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 text-xs bg-red-500">
                      3
                    </Badge>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-80">
                  <DropdownMenuLabel>Notifications</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <div className="space-y-1">
                    <DropdownMenuItem className="flex-col items-start p-4">
                      <div className="font-medium">New student registration</div>
                      <div className="text-sm text-gray-500">John Smith has submitted a registration form</div>
                      <div className="text-xs text-gray-400 mt-1">2 minutes ago</div>
                    </DropdownMenuItem>
                    <DropdownMenuItem className="flex-col items-start p-4">
                      <div className="font-medium">Fee payment received</div>
                      <div className="text-sm text-gray-500">Payment of $500 received from Mary Johnson</div>
                      <div className="text-xs text-gray-400 mt-1">1 hour ago</div>
                    </DropdownMenuItem>
                    <DropdownMenuItem className="flex-col items-start p-4">
                      <div className="font-medium">Leave request</div>
                      <div className="text-sm text-gray-500">Teacher Alice Brown requested leave for tomorrow</div>
                      <div className="text-xs text-gray-400 mt-1">3 hours ago</div>
                    </DropdownMenuItem>
                  </div>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem className="text-center">
                    View all notifications
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>

              {/* User menu */}
              <DropdownMenu>
                <DropdownMenuTrigger className="flex items-center space-x-2 p-1 rounded-lg hover:bg-gray-100">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src="/placeholder-avatar.jpg" alt="User avatar" />
                    <AvatarFallback>JD</AvatarFallback>
                  </Avatar>
                  <div className="hidden md:block text-left">
                    <p className="text-sm font-medium text-gray-900">John Doe</p>
                    <p className="text-xs text-gray-500">Administrator</p>
                  </div>
                  <ChevronDown className="h-4 w-4 text-gray-400" />
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuLabel>My Account</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>
                    <User className="mr-2 h-4 w-4" />
                    Profile
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Settings className="mr-2 h-4 w-4" />
                    Settings
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>
                    <LogOut className="mr-2 h-4 w-4" />
                    Sign out
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </header>

        {/* Page content */}
        <main className="flex-1 overflow-y-auto p-6">
          {children}
        </main>
      </div>
    </div>
  )
}