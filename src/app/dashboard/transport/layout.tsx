'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  TruckIcon, 
  UserGroupIcon, 
  MapPinIcon, 
  UsersIcon,
  ExclamationTriangleIcon,
  CurrencyDollarIcon,
  HomeIcon 
} from '@heroicons/react/24/outline';

const navigation = [
  { name: 'Dashboard', href: '/dashboard/transport', icon: HomeIcon },
  { name: 'Buses', href: '/dashboard/transport/buses', icon: TruckIcon },
  { name: 'Drivers', href: '/dashboard/transport/drivers', icon: UserGroupIcon },
  { name: 'Routes', href: '/dashboard/transport/routes', icon: MapPinIcon },
  { name: 'Assignments', href: '/dashboard/transport/assignments', icon: UsersIcon },
  { name: 'Incidents', href: '/dashboard/transport/incidents', icon: ExclamationTriangleIcon },
  { name: 'Fees', href: '/dashboard/transport/fees', icon: CurrencyDollarIcon },
];

export default function TransportLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation */}
      <nav className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <Link href="/" className="text-xl font-bold text-gray-900 mr-8">
                SchoolSaaS
              </Link>
              <div className="hidden md:flex space-x-8">
                {navigation.map((item) => {
                  const IconComponent = item.icon;
                  const isActive = pathname === item.href;
                  return (
                    <Link
                      key={item.name}
                      href={item.href}
                      className={`flex items-center px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                        isActive
                          ? 'bg-blue-100 text-blue-700'
                          : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                      }`}
                    >
                      <IconComponent className="h-4 w-4 mr-2" />
                      {item.name}
                    </Link>
                  );
                })}
              </div>
            </div>
            <div className="text-sm text-gray-600">
              Transport Management System
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Navigation */}
      <div className="md:hidden bg-white border-b border-gray-200">
        <div className="px-4 py-3">
          <div className="flex space-x-4 overflow-x-auto">
            {navigation.map((item) => {
              const IconComponent = item.icon;
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`flex items-center px-3 py-2 rounded-md text-sm font-medium whitespace-nowrap transition-colors ${
                    isActive
                      ? 'bg-blue-100 text-blue-700'
                      : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                  }`}
                >
                  <IconComponent className="h-4 w-4 mr-2" />
                  {item.name}
                </Link>
              );
            })}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <main>{children}</main>
    </div>
  );
}