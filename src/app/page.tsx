import Link from 'next/link'

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div className="flex items-center">
              <div className="text-2xl font-bold text-indigo-600">🏫 SchoolSaaS</div>
            </div>
            <div className="flex items-center space-x-4">
              <Link 
                href="/auth/signin" 
                className="text-gray-600 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium"
              >
                Login
              </Link>
              <Link 
                href="/auth/signup" 
                className="bg-indigo-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-indigo-700"
              >
                Try Free
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
            Modern School Management
            <span className="block text-indigo-600">Made Simple</span>
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
            Streamline your school operations with our comprehensive SaaS platform. 
            Manage students, teachers, finances, and communication all in one place.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              href="/auth/signup" 
              className="bg-indigo-600 text-white px-8 py-3 rounded-lg text-lg font-semibold hover:bg-indigo-700 transition duration-200"
            >
              Start Free Trial
            </Link>
            <Link 
              href="/modules" 
              className="border border-indigo-600 text-indigo-600 px-8 py-3 rounded-lg text-lg font-semibold hover:bg-indigo-50 transition duration-200"
            >
              View Modules
            </Link>
            <Link 
              href="/demo" 
              className="border border-gray-300 text-gray-700 px-8 py-3 rounded-lg text-lg font-semibold hover:bg-gray-50 transition duration-200"
            >
              Watch Demo
            </Link>
          </div>
        </div>

        {/* Modules Overview */}
        <div className="mt-20">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Comprehensive Module Suite
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Our platform includes 8 specialized modules designed to handle every aspect of school management
            </p>
            <Link 
              href="/modules" 
              className="inline-flex items-center mt-4 text-indigo-600 hover:text-indigo-800 font-medium"
            >
              View All Modules
              <svg className="ml-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100">
              <div className="text-2xl mb-2">✅</div>
              <h3 className="text-sm font-semibold text-gray-900 mb-1">Attendance Management</h3>
              <p className="text-xs text-gray-600">Digital tracking & notifications</p>
            </div>
            
            <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100">
              <div className="text-2xl mb-2">📊</div>
              <h3 className="text-sm font-semibold text-gray-900 mb-1">Financial Accounting</h3>
              <p className="text-xs text-gray-600">Complete accounting system</p>
            </div>
            
            <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100">
              <div className="text-2xl mb-2">💰</div>
              <h3 className="text-sm font-semibold text-gray-900 mb-1">Fee Management</h3>
              <p className="text-xs text-gray-600">Online payments & tracking</p>
            </div>
            
            <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100">
              <div className="text-2xl mb-2">📚</div>
              <h3 className="text-sm font-semibold text-gray-900 mb-1">Library Management</h3>
              <p className="text-xs text-gray-600">Digital catalog & tracking</p>
            </div>
            
            <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100">
              <div className="text-2xl mb-2">📝</div>
              <h3 className="text-sm font-semibold text-gray-900 mb-1">Exam & Results</h3>
              <p className="text-xs text-gray-600">Scheduling & grade management</p>
            </div>
            
            <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100">
              <div className="text-2xl mb-2">👥</div>
              <h3 className="text-sm font-semibold text-gray-900 mb-1">Student Information</h3>
              <p className="text-xs text-gray-600">Centralized student profiles</p>
            </div>
            
            <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100">
              <div className="text-2xl mb-2">🚌</div>
              <h3 className="text-sm font-semibold text-gray-900 mb-1">Bus Transport & GPS</h3>
              <p className="text-xs text-gray-600">Fleet & route management</p>
            </div>
            
            <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100">
              <div className="text-2xl mb-2">📋</div>
              <h3 className="text-sm font-semibold text-gray-900 mb-1">Online Registration</h3>
              <p className="text-xs text-gray-600">Digital admission process</p>
            </div>
          </div>
        </div>

        {/* Features Grid */}
        <div className="mt-24 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div className="bg-white p-6 rounded-xl shadow-sm">
            <div className="text-3xl mb-4">👥</div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Student Management</h3>
            <p className="text-gray-600">Complete student lifecycle management from admission to graduation.</p>
          </div>
          
          <div className="bg-white p-6 rounded-xl shadow-sm">
            <div className="text-3xl mb-4">👨‍🏫</div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Teacher Portal</h3>
            <p className="text-gray-600">Empower teachers with tools for attendance, grading, and communication.</p>
          </div>
          
          <div className="bg-white p-6 rounded-xl shadow-sm">
            <div className="text-3xl mb-4">💰</div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Finance & Billing</h3>
            <p className="text-gray-600">Automated fee collection, invoicing, and financial reporting.</p>
          </div>
          
          <div className="bg-white p-6 rounded-xl shadow-sm">
            <div className="text-3xl mb-4">👨‍👩‍👧‍👦</div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Parent Communication</h3>
            <p className="text-gray-600">Keep parents informed with real-time updates and messaging.</p>
          </div>
          
          <div className="bg-white p-6 rounded-xl shadow-sm">
            <div className="text-3xl mb-4">🚌</div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Transport System</h3>
            <p className="text-gray-600">Manage bus routes, schedules, and student transportation.</p>
          </div>
          
          <div className="bg-white p-6 rounded-xl shadow-sm">
            <div className="text-3xl mb-4">📚</div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Library Management</h3>
            <p className="text-gray-600">Digital catalog, issue tracking, and inventory management.</p>
          </div>
        </div>

        {/* CTA Section */}
        <div className="mt-24 bg-white rounded-xl shadow-sm p-8 text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Ready to Transform Your School?
          </h2>
          <p className="text-xl text-gray-600 mb-8">
            Join hundreds of schools already using SchoolSaaS to streamline their operations.
          </p>
          <Link 
            href="/auth/signup" 
            className="bg-indigo-600 text-white px-8 py-3 rounded-lg text-lg font-semibold hover:bg-indigo-700 transition duration-200"
          >
            Get Started Today
          </Link>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-gray-900 text-white mt-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="text-2xl font-bold mb-4">🏫 SchoolSaaS</div>
              <p className="text-gray-400">
                The complete school management solution for modern educational institutions.
              </p>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">Features</h4>
              <ul className="space-y-2 text-gray-400">
                <li>Student Management</li>
                <li>Teacher Portal</li>
                <li>Finance & Billing</li>
                <li>Parent Communication</li>
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">Support</h4>
              <ul className="space-y-2 text-gray-400">
                <li>Documentation</li>
                <li>Help Center</li>
                <li>Contact Support</li>
                <li>Training</li>
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">Company</h4>
              <ul className="space-y-2 text-gray-400">
                <li>About Us</li>
                <li>Privacy Policy</li>
                <li>Terms of Service</li>
                <li>Contact</li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2024 SchoolSaaS. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
