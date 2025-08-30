'use client';

import * as React from 'react';
import * as ProgressPrimitive from '@radix-ui/react-progress';

interface AttendanceProgressProps {
  percentage: number;
  className?: string;
  size?: 'sm' | 'md' | 'lg';
}

export function AttendanceProgress({ 
  percentage, 
  className = '', 
  size = 'md' 
}: AttendanceProgressProps) {
  const sizeClasses = {
    sm: 'h-2',
    md: 'h-3',
    lg: 'h-4'
  };

  const getColorClass = (percentage: number) => {
    if (percentage >= 90) return 'bg-green-500';
    if (percentage >= 75) return 'bg-yellow-500';
    if (percentage >= 60) return 'bg-orange-500';
    return 'bg-red-500';
  };

  return (
    <div className={`space-y-2 ${className}`}>
      <div className="flex justify-between text-sm">
        <span className="text-gray-600">Attendance</span>
        <span className="font-medium">{percentage.toFixed(1)}%</span>
      </div>
      <ProgressPrimitive.Root
        className={`relative overflow-hidden bg-gray-200 rounded-full ${sizeClasses[size]}`}
        style={{
          transform: 'translateZ(0)',
        }}
        value={percentage}
      >
        <ProgressPrimitive.Indicator
          className={`${getColorClass(percentage)} w-full h-full transition-transform duration-[660ms] ease-[cubic-bezier(0.65, 0, 0.35, 1)]`}
          style={{ transform: `translateX(-${100 - percentage}%)` }}
        />
      </ProgressPrimitive.Root>
    </div>
  );
}