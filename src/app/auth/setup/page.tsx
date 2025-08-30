'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Stepper } from '@/components/ui/stepper'

const steps = [
  { id: 1, title: "School Info", description: "Basic details" },
  { id: 2, title: "Admin Account", description: "Your account" },
  { id: 3, title: "Preferences", description: "Setup complete" }
]

export default function SchoolSetupPage() {
  const [currentStep, setCurrentStep] = useState(1)
  const [isLoading, setIsLoading] = useState(false)
  const [formData, setFormData] = useState({
    // Step 1: School Information
    schoolName: '',
    schoolType: '',
    address: '',
    city: '',
    state: '',
    zipCode: '',
    phone: '',
    website: '',
    
    // Step 2: Admin Account
    adminFirstName: '',
    adminLastName: '',
    adminEmail: '',
    adminPhone: '',
    password: '',
    confirmPassword: '',
    
    // Step 3: Preferences
    academicYear: '',
    timezone: '',
    currency: '',
    language: ''
  })

  const handleInputChange = (name: string, value: string) => {
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleNext = () => {
    if (currentStep < 3) {
      setCurrentStep(currentStep + 1)
    } else {
      handleSubmit()
    }
  }

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1)
    }
  }

  const handleSubmit = async () => {
    setIsLoading(true)
    // Add setup submission logic here
    setTimeout(() => {
      setIsLoading(false)
      // Redirect to dashboard
    }, 2000)
  }

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="md:col-span-2">
                <Label htmlFor="schoolName">School Name *</Label>
                <Input
                  id="schoolName"
                  value={formData.schoolName}
                  onChange={(e) => handleInputChange('schoolName', e.target.value)}
                  placeholder="Enter your school name"
                  required
                />
              </div>
              
              <div>
                <Label htmlFor="schoolType">School Type *</Label>
                <Select value={formData.schoolType} onValueChange={(value) => handleInputChange('schoolType', value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select school type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="elementary">Elementary School</SelectItem>
                    <SelectItem value="middle">Middle School</SelectItem>
                    <SelectItem value="high">High School</SelectItem>
                    <SelectItem value="k12">K-12 School</SelectItem>
                    <SelectItem value="college">College</SelectItem>
                    <SelectItem value="university">University</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div>
                <Label htmlFor="phone">Phone Number *</Label>
                <Input
                  id="phone"
                  value={formData.phone}
                  onChange={(e) => handleInputChange('phone', e.target.value)}
                  placeholder="School phone number"
                  required
                />
              </div>
            </div>
            
            <div>
              <Label htmlFor="address">Address *</Label>
              <Input
                id="address"
                value={formData.address}
                onChange={(e) => handleInputChange('address', e.target.value)}
                placeholder="Street address"
                required
              />
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <Label htmlFor="city">City *</Label>
                <Input
                  id="city"
                  value={formData.city}
                  onChange={(e) => handleInputChange('city', e.target.value)}
                  placeholder="City"
                  required
                />
              </div>
              
              <div>
                <Label htmlFor="state">State *</Label>
                <Input
                  id="state"
                  value={formData.state}
                  onChange={(e) => handleInputChange('state', e.target.value)}
                  placeholder="State"
                  required
                />
              </div>
              
              <div>
                <Label htmlFor="zipCode">ZIP Code *</Label>
                <Input
                  id="zipCode"
                  value={formData.zipCode}
                  onChange={(e) => handleInputChange('zipCode', e.target.value)}
                  placeholder="ZIP code"
                  required
                />
              </div>
            </div>
            
            <div>
              <Label htmlFor="website">Website (optional)</Label>
              <Input
                id="website"
                value={formData.website}
                onChange={(e) => handleInputChange('website', e.target.value)}
                placeholder="https://yourschool.edu"
              />
            </div>
          </div>
        )
        
      case 2:
        return (
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="adminFirstName">First Name *</Label>
                <Input
                  id="adminFirstName"
                  value={formData.adminFirstName}
                  onChange={(e) => handleInputChange('adminFirstName', e.target.value)}
                  placeholder="Your first name"
                  required
                />
              </div>
              
              <div>
                <Label htmlFor="adminLastName">Last Name *</Label>
                <Input
                  id="adminLastName"
                  value={formData.adminLastName}
                  onChange={(e) => handleInputChange('adminLastName', e.target.value)}
                  placeholder="Your last name"
                  required
                />
              </div>
            </div>
            
            <div>
              <Label htmlFor="adminEmail">Email Address *</Label>
              <Input
                id="adminEmail"
                type="email"
                value={formData.adminEmail}
                onChange={(e) => handleInputChange('adminEmail', e.target.value)}
                placeholder="your.email@school.edu"
                required
              />
            </div>
            
            <div>
              <Label htmlFor="adminPhone">Phone Number</Label>
              <Input
                id="adminPhone"
                value={formData.adminPhone}
                onChange={(e) => handleInputChange('adminPhone', e.target.value)}
                placeholder="Your phone number"
              />
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="password">Password *</Label>
                <Input
                  id="password"
                  type="password"
                  value={formData.password}
                  onChange={(e) => handleInputChange('password', e.target.value)}
                  placeholder="Create a strong password"
                  required
                />
              </div>
              
              <div>
                <Label htmlFor="confirmPassword">Confirm Password *</Label>
                <Input
                  id="confirmPassword"
                  type="password"
                  value={formData.confirmPassword}
                  onChange={(e) => handleInputChange('confirmPassword', e.target.value)}
                  placeholder="Confirm your password"
                  required
                />
              </div>
            </div>
            
            <div className="bg-blue-50 p-4 rounded-lg">
              <p className="text-sm text-blue-800">
                <strong>Note:</strong> This account will have full administrative access to your school&apos;s data. 
                You can create additional admin accounts later from the dashboard.
              </p>
            </div>
          </div>
        )
        
      case 3:
        return (
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="academicYear">Academic Year *</Label>
                <Select value={formData.academicYear} onValueChange={(value) => handleInputChange('academicYear', value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select academic year" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="2024-2025">2024-2025</SelectItem>
                    <SelectItem value="2025-2026">2025-2026</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div>
                <Label htmlFor="timezone">Timezone *</Label>
                <Select value={formData.timezone} onValueChange={(value) => handleInputChange('timezone', value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select timezone" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="EST">Eastern Time (EST)</SelectItem>
                    <SelectItem value="CST">Central Time (CST)</SelectItem>
                    <SelectItem value="MST">Mountain Time (MST)</SelectItem>
                    <SelectItem value="PST">Pacific Time (PST)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="currency">Currency *</Label>
                <Select value={formData.currency} onValueChange={(value) => handleInputChange('currency', value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select currency" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="USD">US Dollar (USD)</SelectItem>
                    <SelectItem value="EUR">Euro (EUR)</SelectItem>
                    <SelectItem value="GBP">British Pound (GBP)</SelectItem>
                    <SelectItem value="CAD">Canadian Dollar (CAD)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div>
                <Label htmlFor="language">Language *</Label>
                <Select value={formData.language} onValueChange={(value) => handleInputChange('language', value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select language" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="en">English</SelectItem>
                    <SelectItem value="es">Spanish</SelectItem>
                    <SelectItem value="fr">French</SelectItem>
                    <SelectItem value="de">German</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            
            <div className="bg-green-50 p-6 rounded-lg text-center">
              <div className="text-green-600 text-4xl mb-4">🎉</div>
              <h3 className="text-lg font-semibold text-green-800 mb-2">Almost Ready!</h3>
              <p className="text-green-700">
                Click &quot;Complete Setup&quot; to finish creating your school account. 
                You&apos;ll be redirected to your dashboard where you can start managing your school.
              </p>
            </div>
          </div>
        )
        
      default:
        return null
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <Link href="/" className="inline-flex items-center text-2xl font-bold text-indigo-600 mb-4">
            🏫 SchoolSaaS
          </Link>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">School Setup</h1>
          <p className="text-gray-600">Let&apos;s get your school set up in just a few steps</p>
        </div>

        {/* Progress Stepper */}
        <div className="mb-12">
          <Stepper steps={steps} currentStep={currentStep} />
        </div>

        {/* Setup Card */}
        <Card className="shadow-lg border-0">
          <CardHeader>
            <CardTitle>{steps[currentStep - 1]?.title}</CardTitle>
            <CardDescription>
              {currentStep === 1 && "Tell us about your school and its location"}
              {currentStep === 2 && "Create your administrator account"}
              {currentStep === 3 && "Set your preferences and complete setup"}
            </CardDescription>
          </CardHeader>
          
          <CardContent>
            {renderStepContent()}
            
            {/* Navigation Buttons */}
            <div className="flex justify-between pt-6 mt-6 border-t">
              <Button
                variant="outline"
                onClick={handleBack}
                disabled={currentStep === 1}
              >
                Back
              </Button>
              
              <Button
                onClick={handleNext}
                disabled={isLoading}
              >
                {isLoading 
                  ? 'Setting up...' 
                  : currentStep === 3 
                    ? 'Complete Setup' 
                    : 'Next Step'
                }
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Footer */}
        <p className="text-center text-xs text-gray-500 mt-8">
          Need help? Contact our{' '}
          <Link href="/support" className="underline hover:text-gray-700">
            support team
          </Link>
        </p>
      </div>
    </div>
  )
}