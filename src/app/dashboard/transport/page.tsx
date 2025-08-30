'use client';

import { useState, useEffect } from 'react';
import { 
  TruckIcon, 
  UserGroupIcon, 
  MapPinIcon, 
  ClockIcon,
  ExclamationTriangleIcon,
  CurrencyDollarIcon 
} from '@heroicons/react/24/outline';

interface DashboardStats {
  totalBuses: number;
  totalDrivers: number;
  totalRoutes: number;
  totalStudents: number;
  activeIncidents: number;
  pendingFees: number;
}

export default function TransportDashboard() {
  const [stats, setStats] = useState<DashboardStats>({
    totalBuses: 0,
    totalDrivers: 0,
    totalRoutes: 0,
    totalStudents: 0,
    activeIncidents: 0,
    pendingFees: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate API call - replace with actual API calls
    setTimeout(() => {
      setStats({
        totalBuses: 12,
        totalDrivers: 18,
        totalRoutes: 8,
        totalStudents: 245,
        activeIncidents: 2,
        pendingFees: 15,
      });
      setLoading(false);
    }, 1000);
  }, []);

  const statCards = [
    {
      title: 'Total Buses',
      value: stats.totalBuses,
      icon: TruckIcon,
      color: 'bg-blue-500',
      href: '/dashboard/transport/buses',
    },
    {
      title: 'Drivers',
      value: stats.totalDrivers,
      icon: UserGroupIcon,
      color: 'bg-green-500',
      href: '/dashboard/transport/drivers',
    },
    {
      title: 'Routes',
      value: stats.totalRoutes,
      icon: MapPinIcon,
      color: 'bg-purple-500',
      href: '/dashboard/transport/routes',
    },
    {
      title: 'Students',
      value: stats.totalStudents,
      icon: UserGroupIcon,
      color: 'bg-indigo-500',
      href: '/dashboard/transport/assignments',
    },
    {
      title: 'Active Incidents',
      value: stats.activeIncidents,
      icon: ExclamationTriangleIcon,
      color: 'bg-red-500',
      href: '/dashboard/transport/incidents',
    },
    {
      title: 'Pending Fees',
      value: stats.pendingFees,
      icon: CurrencyDollarIcon,
      color: 'bg-yellow-500',
      href: '/dashboard/transport/fees',
    },
  ];

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 p-4">
        <div className="max-w-7xl mx-auto">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900">Transport Management</h1>
            <p className="text-gray-600 mt-2">Manage buses, drivers, routes, and student transportation</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="bg-white rounded-lg shadow-sm p-6 animate-pulse">
                <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
                <div className="h-8 bg-gray-200 rounded w-1/2"></div>
              </div>
            ))}
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
          <h1 className="text-3xl font-bold text-gray-900">🚌 Transport Management</h1>
          <p className="text-gray-600 mt-2">Manage buses, drivers, routes, and student transportation</p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {statCards.map((card, index) => {
            const IconComponent = card.icon;
            return (
              <a
                key={index}
                href={card.href}
                className="bg-white rounded-lg shadow-sm p-6 hover:shadow-md transition-shadow cursor-pointer"
              >
                <div className="flex items-center">
                  <div className={`${card.color} p-3 rounded-lg`}>
                    <IconComponent className="h-6 w-6 text-white" />
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-600">{card.title}</p>
                    <p className="text-2xl font-bold text-gray-900">{card.value}</p>
                  </div>
                </div>
              </a>
            );
          })}
        </div>

        {/* Quick Actions */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Quick Actions</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <a
              href="/dashboard/transport/buses/new"
              className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors text-center"
            >
              Add New Bus
            </a>
            <a
              href="/dashboard/transport/drivers/new"
              className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition-colors text-center"
            >
              Add Driver
            </a>
            <a
              href="/dashboard/transport/routes/new"
              className="bg-purple-500 text-white px-4 py-2 rounded-lg hover:bg-purple-600 transition-colors text-center"
            >
              Create Route
            </a>
            <a
              href="/dashboard/transport/assignments/new"
              className="bg-indigo-500 text-white px-4 py-2 rounded-lg hover:bg-indigo-600 transition-colors text-center"
            >
              Assign Student
            </a>
          </div>
        </div>

        {/* Recent Activities */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Recent Activities</h2>
            <div className="space-y-3">
              <div className="flex items-center text-sm">
                <ClockIcon className="h-4 w-4 text-gray-400 mr-2" />
                <span className="text-gray-600">Bus #101 completed Route A at 8:45 AM</span>
              </div>
              <div className="flex items-center text-sm">
                <ClockIcon className="h-4 w-4 text-gray-400 mr-2" />
                <span className="text-gray-600">Driver John Doe marked attendance</span>
              </div>
              <div className="flex items-center text-sm">
                <ClockIcon className="h-4 w-4 text-gray-400 mr-2" />
                <span className="text-gray-600">New student assigned to Route B</span>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Upcoming Maintenance</h2>
            <div className="space-y-3">
              <div className="flex justify-between items-center text-sm">
                <span className="text-gray-600">Bus #102 - Routine Service</span>
                <span className="text-yellow-600 font-medium">Due Tomorrow</span>
              </div>
              <div className="flex justify-between items-center text-sm">
                <span className="text-gray-600">Bus #105 - Insurance Renewal</span>
                <span className="text-red-600 font-medium">Overdue</span>
              </div>
              <div className="flex justify-between items-center text-sm">
                <span className="text-gray-600">Bus #103 - Fitness Certificate</span>
                <span className="text-green-600 font-medium">Next Week</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}