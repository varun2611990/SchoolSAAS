'use client';

import { useState, useEffect } from 'react';
import { 
  MapPinIcon, 
  PlusIcon, 
  PencilIcon, 
  EyeIcon,
  ClockIcon 
} from '@heroicons/react/24/outline';

interface Route {
  id: string;
  name: string;
  description?: string;
  startTime: string;
  endTime: string;
  distance?: number;
  estimatedDuration?: number;
  isActive: boolean;
  bus: {
    number: string;
    capacity: number;
  };
  stops: Array<{
    id: string;
    name: string;
    arrivalTime: string;
    sequence: number;
  }>;
  transportAssignments: Array<{
    student: {
      workspaceUser: {
        user: {
          name: string;
        };
      };
    };
  }>;
}

export default function RoutesPage() {
  const [routes, setRoutes] = useState<Route[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    // Simulate API call - replace with actual API call
    setTimeout(() => {
      setRoutes([
        {
          id: '1',
          name: 'Route A - City Center',
          description: 'Main city route covering central areas',
          startTime: '07:00',
          endTime: '08:30',
          distance: 15.5,
          estimatedDuration: 90,
          isActive: true,
          bus: {
            number: 'BUS-001',
            capacity: 45
          },
          stops: [
            { id: '1', name: 'City Center', arrivalTime: '07:00', sequence: 1 },
            { id: '2', name: 'Park Street', arrivalTime: '07:15', sequence: 2 },
            { id: '3', name: 'School Gate', arrivalTime: '08:30', sequence: 3 }
          ],
          transportAssignments: [
            { student: { workspaceUser: { user: { name: 'John Doe' } } } },
            { student: { workspaceUser: { user: { name: 'Jane Smith' } } } }
          ]
        },
        {
          id: '2',
          name: 'Route B - Suburbs',
          description: 'Suburban areas and residential zones',
          startTime: '06:45',
          endTime: '08:45',
          distance: 22.3,
          estimatedDuration: 120,
          isActive: true,
          bus: {
            number: 'BUS-002',
            capacity: 50
          },
          stops: [
            { id: '4', name: 'Suburb Plaza', arrivalTime: '06:45', sequence: 1 },
            { id: '5', name: 'Market Square', arrivalTime: '07:30', sequence: 2 },
            { id: '6', name: 'School Gate', arrivalTime: '08:45', sequence: 3 }
          ],
          transportAssignments: [
            { student: { workspaceUser: { user: { name: 'Alice Johnson' } } } }
          ]
        }
      ]);
      setLoading(false);
    }, 1000);
  }, []);

  const filteredRoutes = routes.filter(route =>
    route.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    route.bus.number.toLowerCase().includes(searchTerm.toLowerCase()) ||
    route.description?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 p-4">
        <div className="max-w-7xl mx-auto">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-200 rounded w-1/4 mb-4"></div>
            <div className="h-4 bg-gray-200 rounded w-1/3 mb-8"></div>
            <div className="space-y-4">
              {[...Array(3)].map((_, i) => (
                <div key={i} className="h-32 bg-gray-200 rounded"></div>
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
                <MapPinIcon className="h-8 w-8 text-purple-500 mr-3" />
                Route Management
              </h1>
              <p className="text-gray-600 mt-2">Manage bus routes, stops, and schedules</p>
            </div>
            <a
              href="/dashboard/transport/routes/new"
              className="bg-purple-500 text-white px-4 py-2 rounded-lg hover:bg-purple-600 transition-colors flex items-center"
            >
              <PlusIcon className="h-5 w-5 mr-2" />
              Create Route
            </a>
          </div>
        </div>

        {/* Search */}
        <div className="mb-6">
          <input
            type="text"
            placeholder="Search routes by name, bus number, or description..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
          />
        </div>

        {/* Routes List */}
        <div className="space-y-6">
          {filteredRoutes.map((route) => (
            <div key={route.id} className="bg-white rounded-lg shadow-sm p-6 hover:shadow-md transition-shadow">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-xl font-semibold text-gray-900">{route.name}</h3>
                  {route.description && (
                    <p className="text-gray-600 mt-1">{route.description}</p>
                  )}
                  <div className="flex items-center mt-2 text-sm text-gray-500">
                    <ClockIcon className="h-4 w-4 mr-1" />
                    {route.startTime} - {route.endTime}
                    {route.estimatedDuration && (
                      <span className="ml-4">({route.estimatedDuration} mins)</span>
                    )}
                  </div>
                </div>
                <div className="flex space-x-2">
                  <button className="p-2 text-gray-600 hover:text-blue-600">
                    <EyeIcon className="h-5 w-5" />
                  </button>
                  <button className="p-2 text-gray-600 hover:text-green-600">
                    <PencilIcon className="h-5 w-5" />
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Bus Information */}
                <div>
                  <h4 className="font-medium text-gray-900 mb-2">Assigned Bus</h4>
                  <div className="bg-blue-50 p-3 rounded-lg">
                    <p className="font-medium text-blue-900">{route.bus.number}</p>
                    <p className="text-sm text-blue-700">Capacity: {route.bus.capacity} seats</p>
                  </div>
                </div>

                {/* Stops */}
                <div>
                  <h4 className="font-medium text-gray-900 mb-2">Stops ({route.stops.length})</h4>
                  <div className="space-y-2">
                    {route.stops.slice(0, 3).map((stop) => (
                      <div key={stop.id} className="flex justify-between items-center text-sm">
                        <span className="text-gray-700">{stop.name}</span>
                        <span className="text-gray-500">{stop.arrivalTime}</span>
                      </div>
                    ))}
                    {route.stops.length > 3 && (
                      <p className="text-xs text-gray-500">+{route.stops.length - 3} more stops</p>
                    )}
                  </div>
                </div>

                {/* Students */}
                <div>
                  <h4 className="font-medium text-gray-900 mb-2">
                    Students ({route.transportAssignments.length})
                  </h4>
                  <div className="space-y-1">
                    {route.transportAssignments.slice(0, 3).map((assignment, index) => (
                      <p key={index} className="text-sm text-gray-700">
                        {assignment.student.workspaceUser.user.name}
                      </p>
                    ))}
                    {route.transportAssignments.length > 3 && (
                      <p className="text-xs text-gray-500">
                        +{route.transportAssignments.length - 3} more students
                      </p>
                    )}
                  </div>
                </div>
              </div>

              {/* Route Stats */}
              <div className="mt-4 pt-4 border-t border-gray-200">
                <div className="flex justify-between items-center text-sm text-gray-600">
                  <span>Distance: {route.distance ? `${route.distance} km` : 'Not specified'}</span>
                  <span>
                    Occupancy: {route.transportAssignments.length}/{route.bus.capacity} 
                    ({Math.round((route.transportAssignments.length / route.bus.capacity) * 100)}%)
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredRoutes.length === 0 && (
          <div className="text-center py-12">
            <MapPinIcon className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No routes found</h3>
            <p className="text-gray-600 mb-4">
              {searchTerm ? 'Try adjusting your search criteria' : 'Get started by creating your first route'}
            </p>
            <a
              href="/dashboard/transport/routes/new"
              className="bg-purple-500 text-white px-4 py-2 rounded-lg hover:bg-purple-600 transition-colors inline-flex items-center"
            >
              <PlusIcon className="h-5 w-5 mr-2" />
              Create Your First Route
            </a>
          </div>
        )}
      </div>
    </div>
  );
}