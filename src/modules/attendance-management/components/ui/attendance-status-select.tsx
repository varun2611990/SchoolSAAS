'use client';

import * as React from 'react';
import * as SelectPrimitive from '@radix-ui/react-select';
import { AttendanceStatus } from '../../types';

interface AttendanceStatusSelectProps {
  value: AttendanceStatus;
  onValueChange: (value: AttendanceStatus) => void;
  disabled?: boolean;
  className?: string;
}

export function AttendanceStatusSelect({
  value,
  onValueChange,
  disabled = false,
  className = ''
}: AttendanceStatusSelectProps) {
  const statusOptions = [
    { value: AttendanceStatus.PRESENT, label: 'Present', emoji: '✅' },
    { value: AttendanceStatus.ABSENT, label: 'Absent', emoji: '❌' },
    { value: AttendanceStatus.LATE, label: 'Late', emoji: '⏰' },
    { value: AttendanceStatus.HALF_DAY, label: 'Half Day', emoji: '⌗' },
    { value: AttendanceStatus.EXCUSED, label: 'Excused', emoji: '📝' },
  ];

  const getStatusStyle = (status: AttendanceStatus) => {
    switch (status) {
      case AttendanceStatus.PRESENT:
        return 'bg-green-50 text-green-700 border-green-200';
      case AttendanceStatus.ABSENT:
        return 'bg-red-50 text-red-700 border-red-200';
      case AttendanceStatus.LATE:
        return 'bg-yellow-50 text-yellow-700 border-yellow-200';
      case AttendanceStatus.HALF_DAY:
        return 'bg-blue-50 text-blue-700 border-blue-200';
      case AttendanceStatus.EXCUSED:
        return 'bg-purple-50 text-purple-700 border-purple-200';
      default:
        return 'bg-gray-50 text-gray-700 border-gray-200';
    }
  };

  return (
    <SelectPrimitive.Root value={value} onValueChange={onValueChange} disabled={disabled}>
      <SelectPrimitive.Trigger
        className={`
          flex items-center justify-between px-3 py-2 text-sm border rounded-md
          focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500
          disabled:opacity-50 disabled:cursor-not-allowed
          ${getStatusStyle(value)}
          ${className}
        `}
      >
        <SelectPrimitive.Value />
        <SelectPrimitive.Icon className="ml-2">
          <svg
            width="12"
            height="12"
            viewBox="0 0 15 15"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="m4.93179 5.43179 2.56821 2.56821 2.56821-2.56821"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </SelectPrimitive.Icon>
      </SelectPrimitive.Trigger>
      
      <SelectPrimitive.Portal>
        <SelectPrimitive.Content
          className="
            bg-white border border-gray-200 rounded-md shadow-lg z-50
            max-h-64 overflow-y-auto
          "
          position="popper"
          sideOffset={4}
        >
          <SelectPrimitive.ScrollUpButton className="flex items-center justify-center h-6 text-gray-400">
            <svg width="12" height="12" viewBox="0 0 15 15" fill="none">
              <path
                d="m7.5 4 3.5 3.5-1 1L7.5 6l-2.5 2.5-1-1L7.5 4z"
                fill="currentColor"
              />
            </svg>
          </SelectPrimitive.ScrollUpButton>
          
          <SelectPrimitive.Viewport className="p-1">
            {statusOptions.map((option) => (
              <SelectPrimitive.Item
                key={option.value}
                value={option.value}
                className="
                  flex items-center px-3 py-2 text-sm cursor-pointer rounded
                  hover:bg-gray-50 focus:bg-gray-50 focus:outline-none
                  data-[state=checked]:bg-indigo-50 data-[state=checked]:text-indigo-700
                "
              >
                <span className="mr-2">{option.emoji}</span>
                <SelectPrimitive.ItemText>{option.label}</SelectPrimitive.ItemText>
              </SelectPrimitive.Item>
            ))}
          </SelectPrimitive.Viewport>
          
          <SelectPrimitive.ScrollDownButton className="flex items-center justify-center h-6 text-gray-400">
            <svg width="12" height="12" viewBox="0 0 15 15" fill="none">
              <path
                d="m7.5 11-3.5-3.5 1-1L7.5 9l2.5-2.5 1 1L7.5 11z"
                fill="currentColor"
              />
            </svg>
          </SelectPrimitive.ScrollDownButton>
        </SelectPrimitive.Content>
      </SelectPrimitive.Portal>
    </SelectPrimitive.Root>
  );
}