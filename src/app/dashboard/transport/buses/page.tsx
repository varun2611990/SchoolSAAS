'use client';

import { useState, useEffect } from 'react';
import { 
  TruckIcon, 
  PlusIcon, 
  PencilIcon, 
  EyeIcon,
  WrenchScrewdriverIcon
} from '@heroicons/react/24/outline';

interface Route {
  id: string;
  name: string;
}

interface Driver {
  id: string;
  driver: {
    name: string;
  };
}

interface Bus {
  id: string;
  number: string;
  registrationNumber: string;
  model?: string;
  capacity: number;
  manufacturingYear?: number;
  fuelType?: string;
  insuranceExpiry?: string;
  fitnessExpiry?: string;
  isActive: boolean;
  routes: Route[];
  drivers: Driver[];
  maintenanceLogs: unknown[];
}

export default function BusesPage() {
  const [buses, setBuses] = useState<Bus[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    // Simulate API call - replace with actual API call
    setTimeout(() => {
      setBuses([
        {
          id: '1',
          number: 'BUS-001',
          registrationNumber: 'KA-01-AB-1234',
          model: 'Tata Starbus',
          capacity: 45,
          manufacturingYear: 2020,
          fuelType: 'Diesel',
          insuranceExpiry: '2024-12-31',
          fitnessExpiry: '2024-11-30',
          isActive: true,
          routes: [{ id: '1', name: 'Route A' }],
          drivers: [{ id: '1', driver: { name: 'John Doe' } }],
          maintenanceLogs: [],
        },
        {
          id: '2',
          number: 'BUS-002',
          registrationNumber: 'KA-01-AB-1235',
          model: 'Ashok Leyland',
          capacity: 50,
          manufacturingYear: 2019,
          fuelType: 'CNG',
          insuranceExpiry: '2024-10-15',
          fitnessExpiry: '2024-09-30',
          isActive: true,
          routes: [{ id: '2', name: 'Route B' }],
          drivers: [{ id: '2', driver: { name: 'Jane Smith' } }],
          maintenanceLogs: [],
        },
      ]);
      setLoading(false);
    }, 1000);
  }, []);

  const filteredBuses = buses.filter(bus =>
    bus.number.toLowerCase().includes(searchTerm.toLowerCase()) ||
    bus.registrationNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
    bus.model?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getStatusColor = (date: string) => {
    const expiryDate = new Date(date);
    const today = new Date();
    const daysUntilExpiry = Math.ceil((expiryDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
    
    if (daysUntilExpiry < 0) return 'text-red-600';
    if (daysUntilExpiry <= 30) return 'text-yellow-600';
    return 'text-green-600';
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
                <TruckIcon className="h-8 w-8 text-blue-500 mr-3" />
                Bus Management
              </h1>
              <p className="text-gray-600 mt-2">Manage your school fleet and vehicle information</p>
            </div>
            <a
              href="/dashboard/transport/buses/new"
              className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors flex items-center"
            >
              <PlusIcon className="h-5 w-5 mr-2" />
              Add Bus
            </a>
          </div>
        </div>

        {/* Search */}
        <div className="mb-6">
          <input
            type="text"
            placeholder="Search buses by number, registration, or model..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>

        {/* Buses Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
          {filteredBuses.map((bus) => (
            <div key={bus.id} className="bg-white rounded-lg shadow-sm p-6 hover:shadow-md transition-shadow">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">{bus.number}</h3>
                  <p className="text-sm text-gray-600">{bus.registrationNumber}</p>
                </div>
                <div className="flex space-x-2">
                  <button className="p-2 text-gray-600 hover:text-blue-600">
                    <EyeIcon className="h-4 w-4" />
                  </button>
                  <button className="p-2 text-gray-600 hover:text-green-600">
                    <PencilIcon className="h-4 w-4" />
                  </button>
                  <button className="p-2 text-gray-600 hover:text-yellow-600">
                    <WrenchScrewdriverIcon className="h-4 w-4" />
                  </button>
                </div>
              </div>

              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">Model:</span>
                  <span className="font-medium">{bus.model || 'Not specified'}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Capacity:</span>
                  <span className="font-medium">{bus.capacity} seats</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Year:</span>
                  <span className="font-medium">{bus.manufacturingYear || 'N/A'}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Fuel:</span>
                  <span className="font-medium">{bus.fuelType || 'N/A'}</span>
                </div>
              </div>

              <div className="mt-4 pt-4 border-t border-gray-200">
                <div className="space-y-1 text-xs">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Insurance:</span>
                    <span className={bus.insuranceExpiry ? getStatusColor(bus.insuranceExpiry) : 'text-gray-400'}>
                      {bus.insuranceExpiry ? new Date(bus.insuranceExpiry).toLocaleDateString() : 'Not set'}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Fitness:</span>
                    <span className={bus.fitnessExpiry ? getStatusColor(bus.fitnessExpiry) : 'text-gray-400'}>
                      {bus.fitnessExpiry ? new Date(bus.fitnessExpiry).toLocaleDateString() : 'Not set'}
                    </span>
                  </div>
                </div>
              </div>

              <div className="mt-4 pt-4 border-t border-gray-200">
                <div className="flex justify-between items-center text-sm">
                  <span className="text-gray-600">
                    Routes: {bus.routes.length}
                  </span>
                  <span className="text-gray-600">
                    Drivers: {bus.drivers.length}
                  </span>
                </div>
                {bus.routes.length > 0 && (
                  <div className="mt-2">
                    <span className="text-xs text-blue-600 bg-blue-50 px-2 py-1 rounded">
                      {bus.routes[0].name}
                    </span>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        {filteredBuses.length === 0 && (
          <div className="text-center py-12">
            <TruckIcon className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No buses found</h3>
            <p className="text-gray-600 mb-4">
              {searchTerm ? 'Try adjusting your search criteria' : 'Get started by adding your first bus'}
            </p>
            <a
              href="/dashboard/transport/buses/new"
              className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors inline-flex items-center"
            >
              <PlusIcon className="h-5 w-5 mr-2" />
              Add Your First Bus
            </a>
          </div>
        )}
      </div>
    </div>
  );
}