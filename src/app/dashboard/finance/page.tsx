'use client'

import React, { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { DataTable } from '@/components/ui/data-table'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import {
  DollarSign,
  TrendingUp,
  TrendingDown,
  CreditCard,
  Receipt,
  FileText,
  Download,
  Plus,
  Send,
  Eye,
  MoreHorizontal
} from 'lucide-react'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'

// Mock transaction data
const mockTransactions = [
  {
    id: 1,
    transactionId: 'TXN-2024-001',
    date: '2024-08-30',
    studentName: 'Alice Johnson',
    studentId: 'STU-2024-001',
    type: 'Fee Payment',
    amount: 500.00,
    status: 'Completed',
    method: 'Online',
    description: 'Monthly tuition fee'
  },
  {
    id: 2,
    transactionId: 'TXN-2024-002',
    date: '2024-08-29',
    studentName: 'Bob Smith',
    studentId: 'STU-2024-002',
    type: 'Late Fee',
    amount: 25.00,
    status: 'Pending',
    method: 'Cash',
    description: 'Late submission penalty'
  },
  {
    id: 3,
    transactionId: 'TXN-2024-003',
    date: '2024-08-28',
    studentName: 'Charlie Brown',
    studentId: 'STU-2024-003',
    type: 'Refund',
    amount: -100.00,
    status: 'Completed',
    method: 'Bank Transfer',
    description: 'Exam fee refund'
  },
  {
    id: 4,
    transactionId: 'TXN-2024-004',
    date: '2024-08-27',
    studentName: 'Diana Prince',
    studentId: 'STU-2024-004',
    type: 'Fee Payment',
    amount: 750.00,
    status: 'Failed',
    method: 'Online',
    description: 'Annual fees'
  },
  {
    id: 5,
    transactionId: 'TXN-2024-005',
    date: '2024-08-26',
    studentName: 'Edward Wilson',
    studentId: 'STU-2024-005',
    type: 'Book Fee',
    amount: 120.00,
    status: 'Completed',
    method: 'Cash',
    description: 'Textbook charges'
  }
]

type Transaction = typeof mockTransactions[0]

const getStatusBadgeVariant = (status: string) => {
  switch (status) {
    case 'Completed':
      return 'success'
    case 'Pending':
      return 'warning'
    case 'Failed':
      return 'destructive'
    default:
      return 'secondary'
  }
}

const getAmountColor = (amount: number, status: string) => {
  if (status === 'Failed') return 'text-gray-500'
  return amount >= 0 ? 'text-green-600' : 'text-red-600'
}

export default function FinancePage() {
  const [activeTab, setActiveTab] = useState('overview')

  // Calculate financial statistics
  const totalRevenue = mockTransactions
    .filter(t => t.status === 'Completed' && t.amount > 0)
    .reduce((sum, t) => sum + t.amount, 0)
  
  const pendingAmount = mockTransactions
    .filter(t => t.status === 'Pending')
    .reduce((sum, t) => sum + t.amount, 0)
  
  const completedTransactions = mockTransactions.filter(t => t.status === 'Completed').length
  const failedTransactions = mockTransactions.filter(t => t.status === 'Failed').length

  const transactionColumns = [
    {
      id: 'transactionId' as keyof Transaction,
      header: 'Transaction ID',
      sortable: true
    },
    {
      id: 'date' as keyof Transaction,
      header: 'Date',
      cell: (value: any) => new Date(value).toLocaleDateString(),
      sortable: true
    },
    {
      id: 'studentName' as keyof Transaction,
      header: 'Student',
      cell: (value: any, row: Transaction) => (
        <div>
          <div className="font-medium">{row.studentName}</div>
          <div className="text-sm text-gray-500">{row.studentId}</div>
        </div>
      ),
      sortable: true
    },
    {
      id: 'type' as keyof Transaction,
      header: 'Type',
      sortable: true,
      filterable: true
    },
    {
      id: 'amount' as keyof Transaction,
      header: 'Amount',
      cell: (value: any, row: Transaction) => (
        <span className={`font-medium ${getAmountColor(value, row.status)}`}>
          ${Math.abs(value).toFixed(2)}
          {value < 0 && ' (Refund)'}
        </span>
      ),
      sortable: true
    },
    {
      id: 'status' as keyof Transaction,
      header: 'Status',
      cell: (value: any) => (
        <Badge variant={getStatusBadgeVariant(value) as any}>
          {value}
        </Badge>
      ),
      sortable: true,
      filterable: true
    },
    {
      id: 'method' as keyof Transaction,
      header: 'Method',
      sortable: true,
      filterable: true
    },
    {
      id: 'actions' as keyof Transaction,
      header: 'Actions',
      cell: (value: any, row: Transaction) => (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="sm">
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem>
              <Eye className="mr-2 h-4 w-4" />
              View Details
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Download className="mr-2 h-4 w-4" />
              Download Receipt
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Send className="mr-2 h-4 w-4" />
              Send Reminder
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )
    }
  ]

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Finance Dashboard</h1>
          <p className="text-gray-600">Manage payments, fees, and financial transactions</p>
        </div>
        <div className="flex space-x-3 mt-4 sm:mt-0">
          <Button variant="outline">
            <Download className="mr-2 h-4 w-4" />
            Export Report
          </Button>
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            New Invoice
          </Button>
        </div>
      </div>

      {/* Financial Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
            <DollarSign className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">${totalRevenue.toFixed(2)}</div>
            <div className="flex items-center text-xs text-green-600 mt-1">
              <TrendingUp className="h-3 w-3 mr-1" />
              +12% from last month
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pending Payments</CardTitle>
            <CreditCard className="h-4 w-4 text-yellow-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-yellow-600">${pendingAmount.toFixed(2)}</div>
            <div className="text-xs text-gray-500 mt-1">
              Awaiting collection
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Completed</CardTitle>
            <Receipt className="h-4 w-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{completedTransactions}</div>
            <div className="text-xs text-gray-500 mt-1">
              Successful transactions
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Failed Payments</CardTitle>
            <FileText className="h-4 w-4 text-red-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">{failedTransactions}</div>
            <div className="flex items-center text-xs text-red-600 mt-1">
              <TrendingDown className="h-3 w-3 mr-1" />
              Requires attention
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Finance Management Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="transactions">Transactions</TabsTrigger>
          <TabsTrigger value="invoices">Invoices</TabsTrigger>
          <TabsTrigger value="reports">Reports</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Recent Transactions */}
            <Card>
              <CardHeader>
                <CardTitle>Recent Transactions</CardTitle>
                <CardDescription>Latest payment activities</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {mockTransactions.slice(0, 5).map(transaction => (
                    <div key={transaction.id} className="flex items-center justify-between p-3 border border-gray-200 rounded-lg">
                      <div>
                        <div className="font-medium text-sm">{transaction.studentName}</div>
                        <div className="text-xs text-gray-500">{transaction.type}</div>
                      </div>
                      <div className="text-right">
                        <div className={`font-medium text-sm ${getAmountColor(transaction.amount, transaction.status)}`}>
                          ${Math.abs(transaction.amount).toFixed(2)}
                        </div>
                        <Badge variant={getStatusBadgeVariant(transaction.status) as any} className="text-xs">
                          {transaction.status}
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card>
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
                <CardDescription>Common financial tasks</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button className="w-full justify-start">
                  <Plus className="mr-2 h-4 w-4" />
                  Generate Invoice
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <Send className="mr-2 h-4 w-4" />
                  Send Payment Reminder
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <Download className="mr-2 h-4 w-4" />
                  Export Financial Report
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <Receipt className="mr-2 h-4 w-4" />
                  Record Manual Payment
                </Button>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="transactions" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>All Transactions</CardTitle>
              <CardDescription>Complete transaction history with filtering and search</CardDescription>
            </CardHeader>
            <CardContent>
              <DataTable
                data={mockTransactions}
                columns={transactionColumns}
                onRowClick={(transaction) => {
                  console.log('View transaction:', transaction.id)
                }}
              />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="invoices" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Invoice Management</CardTitle>
              <CardDescription>Create and manage student invoices</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <Label htmlFor="student">Select Student</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Choose student" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="alice">Alice Johnson</SelectItem>
                        <SelectItem value="bob">Bob Smith</SelectItem>
                        <SelectItem value="charlie">Charlie Brown</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div>
                    <Label htmlFor="amount">Amount</Label>
                    <Input id="amount" placeholder="0.00" type="number" />
                  </div>
                  
                  <div>
                    <Label htmlFor="dueDate">Due Date</Label>
                    <Input id="dueDate" type="date" />
                  </div>
                </div>
                
                <div>
                  <Label htmlFor="description">Description</Label>
                  <Input id="description" placeholder="Invoice description" />
                </div>
                
                <div className="flex space-x-3">
                  <Button>Generate Invoice</Button>
                  <Button variant="outline">Save as Draft</Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="reports" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Financial Reports</CardTitle>
              <CardDescription>Generate comprehensive financial reports</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <h3 className="font-medium">Monthly Reports</h3>
                  <div className="space-y-2">
                    <Button variant="outline" className="w-full justify-start">
                      <Download className="mr-2 h-4 w-4" />
                      August 2024 Revenue Report
                    </Button>
                    <Button variant="outline" className="w-full justify-start">
                      <Download className="mr-2 h-4 w-4" />
                      July 2024 Revenue Report
                    </Button>
                    <Button variant="outline" className="w-full justify-start">
                      <Download className="mr-2 h-4 w-4" />
                      June 2024 Revenue Report
                    </Button>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <h3 className="font-medium">Custom Reports</h3>
                  <div className="space-y-3">
                    <div>
                      <Label htmlFor="reportType">Report Type</Label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Select report type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="revenue">Revenue Summary</SelectItem>
                          <SelectItem value="outstanding">Outstanding Payments</SelectItem>
                          <SelectItem value="student">Student Payment History</SelectItem>
                          <SelectItem value="method">Payment Method Analysis</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <Label htmlFor="startDate">Start Date</Label>
                        <Input id="startDate" type="date" />
                      </div>
                      <div>
                        <Label htmlFor="endDate">End Date</Label>
                        <Input id="endDate" type="date" />
                      </div>
                    </div>
                    
                    <Button className="w-full">Generate Custom Report</Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}