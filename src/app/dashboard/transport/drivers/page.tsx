'use client';

import { useState, useEffect } from 'react';
import { 
  UserGroupIcon, 
  PlusIcon, 
  PencilIcon, 
  EyeIcon,
  ClockIcon,
  ExclamationTriangleIcon 
} from '@heroicons/react/24/outline';

interface Driver {
  id: string;
  employeeId: string;
  name: string;
  phone: string;
  email?: string;
  licenseNumber: string;
  licenseExpiry: string;
  dateOfJoining: string;
  address?: string;
  emergencyContact?: string;
  salary?: number;
  isActive: boolean;
  buses: Array<{
    id: string;
    bus: {
      number: string;
      routes: Array<{ name: string }>;
    };
  }>;
  attendance: Array<{
    date: string;
    status: string;
  }>;
  incidentReports: Array<{
    id: string;
    type: string;
    status: string;
  }>;
}

export default function DriversPage() {
  const [drivers, setDrivers] = useState<Driver[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    // Simulate API call - replace with actual API call
    setTimeout(() => {
      setDrivers([
        {
          id: '1',
          employeeId: 'DRV-001',
          name: 'John Doe',
          phone: '+91-9876543210',
          email: 'john.doe@school.com',
          licenseNumber: 'KA01-20190123456',
          licenseExpiry: '2025-06-15',
          dateOfJoining: '2020-01-15',
          address: '123 Main Street, Bangalore',
          emergencyContact: '+91-9876543211',
          salary: 25000,
          isActive: true,
          buses: [{
            id: '1',
            bus: {
              number: 'BUS-001',
              routes: [{ name: 'Route A' }]
            }
          }],
          attendance: [
            { date: '2024-01-15', status: 'PRESENT' },
            { date: '2024-01-14', status: 'PRESENT' }
          ],
          incidentReports: []
        },
        {
          id: '2',
          employeeId: 'DRV-002',
          name: 'Jane Smith',
          phone: '+91-9876543220',
          email: 'jane.smith@school.com',
          licenseNumber: 'KA01-20200234567',
          licenseExpiry: '2024-12-20',
          dateOfJoining: '2021-03-10',
          address: '456 Park Road, Bangalore',
          emergencyContact: '+91-9876543221',
          salary: 28000,
          isActive: true,
          buses: [{
            id: '2',
            bus: {
              number: 'BUS-002',
              routes: [{ name: 'Route B' }]
            }
          }],
          attendance: [
            { date: '2024-01-15', status: 'PRESENT' },
            { date: '2024-01-14', status: 'LATE' }
          ],
          incidentReports: [{
            id: '1',
            type: 'DELAY',
            status: 'OPEN'
          }]
        }
      ]);
      setLoading(false);
    }, 1000);
  }, []);

  const filteredDrivers = drivers.filter(driver =>
    driver.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    driver.employeeId.toLowerCase().includes(searchTerm.toLowerCase()) ||
    driver.phone.includes(searchTerm) ||
    driver.licenseNumber.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getStatusColor = (date: string) => {
    const expiryDate = new Date(date);
    const today = new Date();
    const daysUntilExpiry = Math.ceil((expiryDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
    
    if (daysUntilExpiry < 0) return 'text-red-600';
    if (daysUntilExpiry <= 30) return 'text-yellow-600';
    return 'text-green-600';
  };

  const getAttendancePercentage = (attendance: Array<{ status: string }>) => {
    if (attendance.length === 0) return 0;
    const presentDays = attendance.filter(a => a.status === 'PRESENT').length;
    return Math.round((presentDays / attendance.length) * 100);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 p-4">
        <div className="max-w-7xl mx-auto">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-200 rounded w-1/4 mb-4"></div>
            <div className="h-4 bg-gray-200 rounded w-1/3 mb-8"></div>
            <div className="space-y-4">
              {[...Array(5)].map((_, i) => (
                <div key={i} className="h-20 bg-gray-200 rounded"></div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 flex items-center">
                <UserGroupIcon className="h-8 w-8 text-green-500 mr-3" />
                Driver Management
              </h1>
              <p className="text-gray-600 mt-2">Manage drivers, track attendance, and monitor performance</p>
            </div>
            <a
              href="/dashboard/transport/drivers/new"
              className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition-colors flex items-center"
            >
              <PlusIcon className="h-5 w-5 mr-2" />
              Add Driver
            </a>
          </div>
        </div>

        {/* Search */}
        <div className="mb-6">
          <input
            type="text"
            placeholder="Search drivers by name, employee ID, phone, or license..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
          />
        </div>

        {/* Drivers Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {filteredDrivers.map((driver) => (
            <div key={driver.id} className="bg-white rounded-lg shadow-sm p-6 hover:shadow-md transition-shadow">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">{driver.name}</h3>
                  <p className="text-sm text-gray-600">{driver.employeeId}</p>
                  <p className="text-sm text-gray-600">{driver.phone}</p>
                </div>
                <div className="flex space-x-2">
                  <button className="p-2 text-gray-600 hover:text-blue-600">
                    <EyeIcon className="h-4 w-4" />
                  </button>
                  <button className="p-2 text-gray-600 hover:text-green-600">
                    <PencilIcon className="h-4 w-4" />
                  </button>
                  <button className="p-2 text-gray-600 hover:text-yellow-600">
                    <ClockIcon className="h-4 w-4" />
                  </button>
                </div>
              </div>

              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">License:</span>
                  <span className="font-medium">{driver.licenseNumber}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">License Expiry:</span>
                  <span className={getStatusColor(driver.licenseExpiry)}>
                    {new Date(driver.licenseExpiry).toLocaleDateString()}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Joining Date:</span>
                  <span className="font-medium">{new Date(driver.dateOfJoining).toLocaleDateString()}</span>
                </div>
                {driver.salary && (
                  <div className="flex justify-between">
                    <span className="text-gray-600">Salary:</span>
                    <span className="font-medium">₹{driver.salary.toLocaleString()}</span>
                  </div>
                )}
              </div>

              {/* Bus Assignment */}
              <div className="mt-4 pt-4 border-t border-gray-200">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm font-medium text-gray-900">Assigned Buses</span>
                  <span className="text-xs text-gray-500">{driver.buses.length} buses</span>
                </div>
                {driver.buses.length > 0 ? (
                  <div className="space-y-1">
                    {driver.buses.map((busAssignment, index) => (
                      <div key={index} className="flex justify-between items-center text-xs">
                        <span className="text-blue-600 bg-blue-50 px-2 py-1 rounded">
                          {busAssignment.bus.number}
                        </span>
                        <span className="text-gray-600">
                          {busAssignment.bus.routes[0]?.name || 'No route'}
                        </span>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-xs text-gray-500">No bus assigned</p>
                )}
              </div>

              {/* Performance Indicators */}
              <div className="mt-4 pt-4 border-t border-gray-200">
                <div className="grid grid-cols-2 gap-4 text-xs">
                  <div className="text-center">
                    <p className="text-gray-600">Attendance</p>
                    <p className="text-lg font-bold text-green-600">
                      {getAttendancePercentage(driver.attendance)}%
                    </p>
                  </div>
                  <div className="text-center">
                    <p className="text-gray-600">Open Issues</p>
                    <p className="text-lg font-bold text-red-600">
                      {driver.incidentReports.length}
                    </p>
                    {driver.incidentReports.length > 0 && (
                      <ExclamationTriangleIcon className="h-4 w-4 text-red-500 mx-auto mt-1" />
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredDrivers.length === 0 && (
          <div className="text-center py-12">
            <UserGroupIcon className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No drivers found</h3>
            <p className="text-gray-600 mb-4">
              {searchTerm ? 'Try adjusting your search criteria' : 'Get started by adding your first driver'}
            </p>
            <a
              href="/dashboard/transport/drivers/new"
              className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition-colors inline-flex items-center"
            >
              <PlusIcon className="h-5 w-5 mr-2" />
              Add Your First Driver
            </a>
          </div>
        )}
      </div>
    </div>
  );
}