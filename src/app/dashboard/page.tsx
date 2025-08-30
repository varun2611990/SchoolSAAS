'use client'

import React from 'react'
import Link from 'next/link'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import {
  Users,
  UserCheck,
  DollarSign,
  TrendingUp,
  TrendingDown,
  Plus,
  Mail,
  BarChart3,
  Calendar,
  Clock,
  AlertCircle
} from 'lucide-react'

const statsCards = [
  {
    title: 'Total Students',
    value: '245',
    change: '+5 new',
    changeType: 'positive',
    period: 'this week',
    icon: Users,
    href: '/dashboard/students'
  },
  {
    title: 'Teachers',
    value: '18',
    change: '2 leave',
    changeType: 'neutral',
    period: 'requests',
    icon: UserCheck,
    href: '/dashboard/teachers'
  },
  {
    title: 'Parents',
    value: '198',
    change: '12 new',
    changeType: 'positive', 
    period: 'messages',
    icon: Users,
    href: '/dashboard/parents'
  },
  {
    title: 'Revenue',
    value: '$45,230',
    change: '+8%',
    changeType: 'positive',
    period: 'this month',
    icon: DollarSign,
    href: '/dashboard/finance'
  },
]

const recentActivities = [
  {
    id: 1,
    type: 'student',
    title: 'New student admission',
    description: 'Sarah Wilson has been admitted to Grade 10',
    time: '2 minutes ago',
    icon: Users,
    color: 'bg-blue-100 text-blue-600'
  },
  {
    id: 2,
    type: 'payment',
    title: 'Fee payment received',
    description: 'Monthly fee payment of $500 from John Smith',
    time: '15 minutes ago',
    icon: DollarSign,
    color: 'bg-green-100 text-green-600'
  },
  {
    id: 3,
    type: 'leave',
    title: 'Leave request approved',
    description: 'Teacher Mary Johnson\'s leave request has been approved',
    time: '1 hour ago',
    icon: Calendar,
    color: 'bg-yellow-100 text-yellow-600'
  },
  {
    id: 4,
    type: 'transport',
    title: 'Transport route updated',
    description: 'Route B timing has been updated for tomorrow',
    time: '2 hours ago',
    icon: Clock,
    color: 'bg-purple-100 text-purple-600'
  },
  {
    id: 5,
    type: 'alert',
    title: 'System maintenance',
    description: 'Scheduled maintenance tonight from 2:00 AM to 4:00 AM',
    time: '3 hours ago',
    icon: AlertCircle,
    color: 'bg-orange-100 text-orange-600'
  }
]

const quickActions = [
  { name: 'Add Student', href: '/dashboard/students/new', icon: Plus },
  { name: 'Send Notice', href: '/dashboard/communication/new', icon: Mail },
  { name: 'View Reports', href: '/dashboard/reports', icon: BarChart3 },
]

export default function DashboardPage() {
  return (
    <div className="space-y-6">
      {/* Welcome Section */}
      <div className="bg-gradient-to-r from-indigo-500 to-purple-600 rounded-xl p-6 text-white">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold mb-2">Welcome back, John! 👋</h1>
            <p className="text-indigo-100">
              Here&apos;s what&apos;s happening at Springfield High today.
            </p>
          </div>
          <div className="hidden md:block">
            <div className="text-right">
              <p className="text-sm text-indigo-100">Today</p>
              <p className="text-lg font-semibold">{new Date().toLocaleDateString('en-US', { 
                weekday: 'long', 
                year: 'numeric', 
                month: 'long', 
                day: 'numeric' 
              })}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {statsCards.map((stat) => {
          const Icon = stat.icon
          return (
            <Link key={stat.title} href={stat.href}>
              <Card className="hover:shadow-lg transition-shadow cursor-pointer">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium text-gray-600">
                    {stat.title}
                  </CardTitle>
                  <Icon className="h-4 w-4 text-gray-400" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{stat.value}</div>
                  <div className="flex items-center text-xs text-gray-500 mt-1">
                    <span className={`flex items-center ${
                      stat.changeType === 'positive' 
                        ? 'text-green-600' 
                        : stat.changeType === 'negative' 
                          ? 'text-red-600' 
                          : 'text-gray-600'
                    }`}>
                      {stat.changeType === 'positive' && <TrendingUp className="h-3 w-3 mr-1" />}
                      {stat.changeType === 'negative' && <TrendingDown className="h-3 w-3 mr-1" />}
                      {stat.change}
                    </span>
                    <span className="ml-1">{stat.period}</span>
                  </div>
                </CardContent>
              </Card>
            </Link>
          )
        })}
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Activities */}
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle>Recent Activities</CardTitle>
              <CardDescription>Latest updates from your school</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentActivities.map((activity) => {
                  const Icon = activity.icon
                  return (
                    <div key={activity.id} className="flex items-start space-x-4">
                      <div className={`p-2 rounded-lg ${activity.color}`}>
                        <Icon className="h-4 w-4" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-gray-900">{activity.title}</p>
                        <p className="text-sm text-gray-500">{activity.description}</p>
                        <p className="text-xs text-gray-400 mt-1">{activity.time}</p>
                      </div>
                    </div>
                  )
                })}
              </div>
              <div className="mt-6">
                <Button variant="outline" className="w-full">
                  View All Activities
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Quick Actions */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
              <CardDescription>Common tasks and shortcuts</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              {quickActions.map((action) => {
                const Icon = action.icon
                return (
                  <Link key={action.name} href={action.href}>
                    <Button variant="outline" className="w-full justify-start">
                      <Icon className="h-4 w-4 mr-2" />
                      {action.name}
                    </Button>
                  </Link>
                )
              })}
            </CardContent>
          </Card>

          {/* Today's Schedule */}
          <Card>
            <CardHeader>
              <CardTitle>Today&apos;s Schedule</CardTitle>
              <CardDescription>Upcoming events and classes</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
                  <div>
                    <p className="text-sm font-medium">Morning Assembly</p>
                    <p className="text-xs text-gray-500">All grades</p>
                  </div>
                  <Badge variant="outline">9:00 AM</Badge>
                </div>
                <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                  <div>
                    <p className="text-sm font-medium">Parent Meeting</p>
                    <p className="text-xs text-gray-500">Grade 10 parents</p>
                  </div>
                  <Badge variant="outline">2:00 PM</Badge>
                </div>
                <div className="flex items-center justify-between p-3 bg-yellow-50 rounded-lg">
                  <div>
                    <p className="text-sm font-medium">Staff Meeting</p>
                    <p className="text-xs text-gray-500">All teachers</p>
                  </div>
                  <Badge variant="outline">4:00 PM</Badge>
                </div>
              </div>
              <div className="mt-4">
                <Button variant="ghost" size="sm" className="w-full">
                  View Full Calendar
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Pending Tasks */}
          <Card>
            <CardHeader>
              <CardTitle>Pending Tasks</CardTitle>
              <CardDescription>Items requiring your attention</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex items-center justify-between p-3 border border-red-200 bg-red-50 rounded-lg">
                  <div>
                    <p className="text-sm font-medium text-red-800">Leave Requests</p>
                    <p className="text-xs text-red-600">2 pending approvals</p>
                  </div>
                  <Badge variant="destructive">2</Badge>
                </div>
                <div className="flex items-center justify-between p-3 border border-yellow-200 bg-yellow-50 rounded-lg">
                  <div>
                    <p className="text-sm font-medium text-yellow-800">Fee Reminders</p>
                    <p className="text-xs text-yellow-600">15 students pending</p>
                  </div>
                  <Badge variant="warning">15</Badge>
                </div>
                <div className="flex items-center justify-between p-3 border border-blue-200 bg-blue-50 rounded-lg">
                  <div>
                    <p className="text-sm font-medium text-blue-800">New Registrations</p>
                    <p className="text-xs text-blue-600">3 awaiting review</p>
                  </div>
                  <Badge variant="info">3</Badge>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}