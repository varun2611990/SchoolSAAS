'use client'

import * as React from "react"
import { cn } from "./utils"

interface StepperProps {
  steps: Array<{
    id: number
    title: string
    description?: string
  }>
  currentStep: number
  className?: string
}

const Stepper = React.forwardRef<HTMLDivElement, StepperProps>(
  ({ steps, currentStep, className, ...props }, ref) => {
    return (
      <div ref={ref} className={cn("", className)} {...props}>
        <nav aria-label="Progress">
          <ol className="flex items-center">
            {steps.map((step, stepIdx) => (
              <li key={step.id} className={cn(
                stepIdx !== steps.length - 1 ? "flex-1" : "",
                "relative"
              )}>
                <div className="flex items-center">
                  <div className="relative flex h-8 w-8 items-center justify-center">
                    {currentStep > step.id ? (
                      <div className="h-8 w-8 rounded-full bg-indigo-600 flex items-center justify-center">
                        <svg className="h-5 w-5 text-white" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                      </div>
                    ) : currentStep === step.id ? (
                      <div className="h-8 w-8 rounded-full border-2 border-indigo-600 bg-white flex items-center justify-center">
                        <div className="h-4 w-4 rounded-full bg-indigo-600" />
                      </div>
                    ) : (
                      <div className="h-8 w-8 rounded-full border-2 border-gray-300 bg-white flex items-center justify-center">
                        <span className="text-gray-500 text-sm font-medium">{step.id}</span>
                      </div>
                    )}
                  </div>
                  
                  {stepIdx !== steps.length - 1 && (
                    <div className="ml-4 min-w-0 flex-1">
                      <div className={cn(
                        "h-0.5 w-full",
                        currentStep > step.id ? "bg-indigo-600" : "bg-gray-200"
                      )} />
                    </div>
                  )}
                </div>
                
                <div className="absolute top-10 left-1/2 transform -translate-x-1/2 w-32 text-center">
                  <p className={cn(
                    "text-sm font-medium",
                    currentStep >= step.id ? "text-indigo-600" : "text-gray-500"
                  )}>
                    {step.title}
                  </p>
                  {step.description && (
                    <p className="text-xs text-gray-500 mt-1">{step.description}</p>
                  )}
                </div>
              </li>
            ))}
          </ol>
        </nav>
      </div>
    )
  }
)
Stepper.displayName = "Stepper"

export { Stepper }