'use client';

import Link from 'next/link';
import { useState } from 'react';
import * as ProgressPrimitive from '@radix-ui/react-progress';
import * as TabsPrimitive from '@radix-ui/react-tabs';
import { MODULES, getTotalProgress, type Module } from '../../modules';

export default function ModulesPage() {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'COMPLETED':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'IN_PROGRESS':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'TODO':
        return 'bg-gray-100 text-gray-800 border-gray-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const [selectedModule, setSelectedModule] = useState<Module>(MODULES[0]);
  const totalProgress = getTotalProgress();

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Master Modules</h1>
              <p className="text-gray-600 mt-1">School Management System Module Overview</p>
            </div>
            <Link
              href="/"
              className="text-indigo-600 hover:text-indigo-800 font-medium"
            >
              ← Back to Home
            </Link>
          </div>

          {/* Overall Progress */}
          <div className="mt-6 bg-gray-50 rounded-lg p-4">
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm font-medium text-gray-700">Overall Implementation Progress</span>
              <span className="text-sm text-gray-600">{totalProgress.toFixed(1)}%</span>
            </div>
            <ProgressPrimitive.Root
              className="relative overflow-hidden bg-gray-200 rounded-full h-2"
              value={totalProgress}
            >
              <ProgressPrimitive.Indicator
                className="bg-indigo-500 w-full h-full transition-transform duration-[660ms] ease-[cubic-bezier(0.65, 0, 0.35, 1)]"
                style={{ transform: `translateX(-${100 - totalProgress}%)` }}
              />
            </ProgressPrimitive.Root>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <TabsPrimitive.Root defaultValue="grid" className="space-y-6">
          <TabsPrimitive.List className="flex space-x-1 bg-gray-100 rounded-lg p-1">
            <TabsPrimitive.Trigger
              value="grid"
              className="px-4 py-2 text-sm font-medium rounded-md data-[state=active]:bg-white data-[state=active]:text-gray-900 data-[state=inactive]:text-gray-600 data-[state=inactive]:hover:text-gray-900"
            >
              Grid View
            </TabsPrimitive.Trigger>
            <TabsPrimitive.Trigger
              value="table"
              className="px-4 py-2 text-sm font-medium rounded-md data-[state=active]:bg-white data-[state=active]:text-gray-900 data-[state=inactive]:text-gray-600 data-[state=inactive]:hover:text-gray-900"
            >
              Table View
            </TabsPrimitive.Trigger>
            <TabsPrimitive.Trigger
              value="detail"
              className="px-4 py-2 text-sm font-medium rounded-md data-[state=active]:bg-white data-[state=active]:text-gray-900 data-[state=inactive]:text-gray-600 data-[state=inactive]:hover:text-gray-900"
            >
              Detailed View
            </TabsPrimitive.Trigger>
          </TabsPrimitive.List>

          {/* Grid View */}
          <TabsPrimitive.Content value="grid" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {MODULES.map((module) => (
                <div
                  key={module.id}
                  className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow"
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className="text-3xl">{module.icon}</div>
                    <span className={`px-2 py-1 text-xs font-medium rounded-full border ${getStatusColor(module.status)}`}>
                      {module.status}
                    </span>
                  </div>
                  
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">{module.name}</h3>
                  <p className="text-sm text-gray-600 mb-4">{module.description}</p>
                  
                  <div className="space-y-3">
                    <div>
                      <div className="flex justify-between text-xs mb-1">
                        <span className="text-gray-500">Progress</span>
                        <span className="text-gray-700">{module.progress}%</span>
                      </div>
                      <ProgressPrimitive.Root
                        className="relative overflow-hidden bg-gray-200 rounded-full h-1.5"
                        value={module.progress}
                      >
                        <ProgressPrimitive.Indicator
                          className="bg-indigo-500 w-full h-full transition-transform duration-[660ms] ease-[cubic-bezier(0.65, 0, 0.35, 1)]"
                          style={{ transform: `translateX(-${100 - module.progress}%)` }}
                        />
                      </ProgressPrimitive.Root>
                    </div>

                    <div>
                      <p className="text-xs text-gray-500 mb-1">Key Entities:</p>
                      <div className="flex flex-wrap gap-1">
                        {module.entities.slice(0, 3).map((entity) => (
                          <span
                            key={entity}
                            className="inline-block bg-gray-100 text-gray-700 text-xs px-2 py-1 rounded"
                          >
                            {entity}
                          </span>
                        ))}
                        {module.entities.length > 3 && (
                          <span className="text-xs text-gray-500">
                            +{module.entities.length - 3} more
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </TabsPrimitive.Content>

          {/* Table View */}
          <TabsPrimitive.Content value="table" className="space-y-6">
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Module
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Description
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Key Entities
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Progress
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {MODULES.map((module) => (
                    <tr key={module.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <span className="text-2xl mr-3">{module.icon}</span>
                          <div>
                            <div className="text-sm font-medium text-gray-900">{module.name}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="text-sm text-gray-900 max-w-xs">{module.description}</div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex flex-wrap gap-1">
                          {module.entities.map((entity) => (
                            <span
                              key={entity}
                              className="inline-block bg-gray-100 text-gray-700 text-xs px-2 py-1 rounded"
                            >
                              {entity}
                            </span>
                          ))}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-2 py-1 text-xs font-medium rounded-full border ${getStatusColor(module.status)}`}>
                          {module.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="w-24">
                          <div className="flex justify-between text-xs mb-1">
                            <span className="text-gray-700">{module.progress}%</span>
                          </div>
                          <ProgressPrimitive.Root
                            className="relative overflow-hidden bg-gray-200 rounded-full h-1.5"
                            value={module.progress}
                          >
                            <ProgressPrimitive.Indicator
                              className="bg-indigo-500 w-full h-full transition-transform duration-[660ms] ease-[cubic-bezier(0.65, 0, 0.35, 1)]"
                              style={{ transform: `translateX(-${100 - module.progress}%)` }}
                            />
                          </ProgressPrimitive.Root>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </TabsPrimitive.Content>

          {/* Detailed View */}
          <TabsPrimitive.Content value="detail" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Module List */}
              <div className="lg:col-span-1">
                <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
                  <h3 className="text-lg font-medium text-gray-900 mb-4">Modules</h3>
                  <div className="space-y-2">
                    {MODULES.map((module) => (
                      <button
                        key={module.id}
                        onClick={() => setSelectedModule(module)}
                        className={`w-full text-left p-3 rounded-lg border transition-colors ${
                          selectedModule.id === module.id
                            ? 'bg-indigo-50 border-indigo-200 text-indigo-900'
                            : 'bg-white border-gray-200 text-gray-700 hover:bg-gray-50'
                        }`}
                      >
                        <div className="flex items-center">
                          <span className="text-xl mr-3">{module.icon}</span>
                          <div>
                            <div className="font-medium">{module.name}</div>
                            <div className="text-sm text-gray-500">{module.progress}% complete</div>
                          </div>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Module Details */}
              <div className="lg:col-span-2">
                <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                  <div className="flex items-start justify-between mb-6">
                    <div className="flex items-center">
                      <span className="text-4xl mr-4">{selectedModule.icon}</span>
                      <div>
                        <h2 className="text-2xl font-bold text-gray-900">{selectedModule.name}</h2>
                        <p className="text-gray-600 mt-1">{selectedModule.description}</p>
                      </div>
                    </div>
                    <span className={`px-3 py-1 text-sm font-medium rounded-full border ${getStatusColor(selectedModule.status)}`}>
                      {selectedModule.status}
                    </span>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <h4 className="text-sm font-medium text-gray-900 mb-3">Key Entities</h4>
                      <div className="space-y-2">
                        {selectedModule.entities.map((entity) => (
                          <div key={entity} className="flex items-center p-2 bg-gray-50 rounded">
                            <div className="w-2 h-2 bg-indigo-500 rounded-full mr-3"></div>
                            <span className="text-sm text-gray-700">{entity}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div>
                      <h4 className="text-sm font-medium text-gray-900 mb-3">Key Features</h4>
                      <div className="space-y-2">
                        {selectedModule.features.map((feature) => (
                          <div key={feature} className="flex items-center p-2 bg-gray-50 rounded">
                            <div className="w-2 h-2 bg-green-500 rounded-full mr-3"></div>
                            <span className="text-sm text-gray-700">{feature}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="mt-6">
                    <h4 className="text-sm font-medium text-gray-900 mb-3">Implementation Progress</h4>
                    <div className="bg-gray-50 rounded-lg p-4">
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-sm text-gray-600">Progress</span>
                        <span className="text-sm font-medium text-gray-900">{selectedModule.progress}%</span>
                      </div>
                      <ProgressPrimitive.Root
                        className="relative overflow-hidden bg-gray-200 rounded-full h-3"
                        value={selectedModule.progress}
                      >
                        <ProgressPrimitive.Indicator
                          className="bg-indigo-500 w-full h-full transition-transform duration-[660ms] ease-[cubic-bezier(0.65, 0, 0.35, 1)]"
                          style={{ transform: `translateX(-${100 - selectedModule.progress}%)` }}
                        />
                      </ProgressPrimitive.Root>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </TabsPrimitive.Content>
        </TabsPrimitive.Root>
      </main>
    </div>
  );
}