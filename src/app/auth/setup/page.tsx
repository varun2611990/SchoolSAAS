"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useState } from "react"

export default function SchoolSetupPage() {
  const [currentStep, setCurrentStep] = useState(1)
  const totalSteps = 3

  const [schoolData, setSchoolData] = useState({
    name: "",
    code: "",
    address: "",
    phone: "",
    email: "",
    website: "",
    logo: null as File | null
  })

  const handleInputChange = (field: string, value: string) => {
    setSchoolData(prev => ({ ...prev, [field]: value }))
  }

  const handleNextStep = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1)
    }
  }

  const handlePrevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1)
    }
  }

  const handleSubmit = () => {
    // Handle form submission
    console.log("School setup data:", schoolData)
  }

  const renderStep1 = () => (
    <div className="space-y-4">
      <div>
        <Label htmlFor="schoolName">School Name</Label>
        <Input
          id="schoolName"
          placeholder="Enter school name"
          value={schoolData.name}
          onChange={(e) => handleInputChange("name", e.target.value)}
          required
        />
      </div>

      <div>
        <Label htmlFor="schoolCode">School Code</Label>
        <Input
          id="schoolCode"
          placeholder="Enter unique school code"
          value={schoolData.code}
          onChange={(e) => handleInputChange("code", e.target.value)}
          required
        />
      </div>

      <div>
        <Label htmlFor="address">Address</Label>
        <Input
          id="address"
          placeholder="Enter complete address"
          value={schoolData.address}
          onChange={(e) => handleInputChange("address", e.target.value)}
          required
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label htmlFor="phone">Phone</Label>
          <Input
            id="phone"
            type="tel"
            placeholder="Phone number"
            value={schoolData.phone}
            onChange={(e) => handleInputChange("phone", e.target.value)}
            required
          />
        </div>
        <div>
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            type="email"
            placeholder="Official email"
            value={schoolData.email}
            onChange={(e) => handleInputChange("email", e.target.value)}
            required
          />
        </div>
      </div>

      <div>
        <Label htmlFor="website">Website (Optional)</Label>
        <Input
          id="website"
          placeholder="School website URL"
          value={schoolData.website}
          onChange={(e) => handleInputChange("website", e.target.value)}
        />
      </div>

      <div>
        <Label htmlFor="logo">School Logo</Label>
        <Input
          id="logo"
          type="file"
          accept="image/*"
          onChange={(e) => {
            const file = e.target.files?.[0]
            setSchoolData(prev => ({ ...prev, logo: file || null }))
          }}
        />
      </div>
    </div>
  )

  const renderStep2 = () => (
    <div className="space-y-4">
      <div className="text-center">
        <h3 className="text-lg font-semibold mb-4">Academic Structure</h3>
        <p className="text-gray-600 mb-6">Configure your school&apos;s academic structure</p>
      </div>
      
      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label>Academic Year Start</Label>
          <Input type="date" />
        </div>
        <div>
          <Label>Academic Year End</Label>
          <Input type="date" />
        </div>
      </div>

      <div>
        <Label>Number of Classes</Label>
        <Input type="number" placeholder="e.g., 12" min="1" max="15" />
      </div>

      <div>
        <Label>Sections per Class</Label>
        <Input type="number" placeholder="e.g., 4" min="1" max="10" />
      </div>

      <div>
        <Label>Maximum Students per Section</Label>
        <Input type="number" placeholder="e.g., 40" min="10" max="100" />
      </div>
    </div>
  )

  const renderStep3 = () => (
    <div className="space-y-4">
      <div className="text-center">
        <h3 className="text-lg font-semibold mb-4">User Roles Setup</h3>
        <p className="text-gray-600 mb-6">Configure user roles and permissions</p>
      </div>

      <div className="space-y-4">
        <div className="border rounded-lg p-4">
          <h4 className="font-medium mb-2">Principal (1)</h4>
          <div className="text-sm text-gray-600 space-y-1">
            <div>☑ All permissions</div>
          </div>
        </div>

        <div className="border rounded-lg p-4">
          <h4 className="font-medium mb-2">Teachers (estimated: 15-20)</h4>
          <div className="text-sm text-gray-600 space-y-1">
            <div>☑ Student management</div>
            <div>☑ Attendance</div>
            <div>☑ Grades & Reports</div>
            <div>☐ Financial data</div>
          </div>
        </div>

        <div className="border rounded-lg p-4">
          <h4 className="font-medium mb-2">Students (estimated: 300-500)</h4>
          <div className="text-sm text-gray-600 space-y-1">
            <div>☑ View own records</div>
            <div>☑ Access timetable</div>
            <div>☐ Modify data</div>
          </div>
        </div>

        <div className="border rounded-lg p-4">
          <h4 className="font-medium mb-2">Parents (estimated: 300-500)</h4>
          <div className="text-sm text-gray-600 space-y-1">
            <div>☑ View child&apos;s records</div>
            <div>☑ Fee payments</div>
            <div>☑ Communication</div>
          </div>
        </div>
      </div>
    </div>
  )

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <div className="w-full max-w-2xl">
        <div className="text-center mb-8">
          <div className="text-3xl font-bold text-indigo-600 mb-2">🏫 SchoolSaaS</div>
          <h1 className="text-2xl font-bold text-gray-900">Setup Your School</h1>
          <p className="text-gray-600 mt-2">Step {currentStep} of {totalSteps}</p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="text-center">
              {currentStep === 1 && "School Information"}
              {currentStep === 2 && "Academic Structure"}
              {currentStep === 3 && "User Roles"}
            </CardTitle>
          </CardHeader>
          <CardContent>
            {currentStep === 1 && renderStep1()}
            {currentStep === 2 && renderStep2()}
            {currentStep === 3 && renderStep3()}

            <div className="flex justify-between mt-8">
              <Button 
                variant="outline" 
                onClick={handlePrevStep}
                disabled={currentStep === 1}
              >
                Previous
              </Button>
              
              {currentStep < totalSteps ? (
                <Button onClick={handleNextStep}>
                  Next
                </Button>
              ) : (
                <Button onClick={handleSubmit}>
                  Complete Setup
                </Button>
              )}
            </div>

            {/* Progress indicator */}
            <div className="mt-6">
              <div className="flex items-center justify-center space-x-2">
                {Array.from({ length: totalSteps }, (_, i) => (
                  <div
                    key={i}
                    className={`h-2 w-2 rounded-full ${
                      i + 1 <= currentStep ? "bg-indigo-600" : "bg-gray-300"
                    }`}
                  />
                ))}
              </div>
              <p className="text-center text-sm text-gray-500 mt-2">
                Progress: {Math.round((currentStep / totalSteps) * 100)}%
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}