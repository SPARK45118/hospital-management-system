import LoginForm from "@/components/login-form"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 to-rose-100 flex items-center justify-center p-4">
      <div className="max-w-4xl w-full grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
        {/* Hospital Information Section */}
        <div className="text-center lg:text-left space-y-6">
          <div>
            <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-4">Arogya Hospital</h1>
            <p className="text-xl text-gray-700 mb-6">Advanced Healthcare Management System</p>
          </div>

          <div className="space-y-4 text-gray-600">
            <div className="flex items-start space-x-3">
              <div className="w-2 h-2 bg-red-500 rounded-full mt-2"></div>
              <div>
                <h3 className="font-semibold text-gray-800">Complete Patient Care</h3>
                <p>Comprehensive patient management with digital medical records</p>
              </div>
            </div>

            <div className="flex items-start space-x-3">
              <div className="w-2 h-2 bg-red-500 rounded-full mt-2"></div>
              <div>
                <h3 className="font-semibold text-gray-800">Smart Appointment System</h3>
                <p>Efficient scheduling and appointment management for doctors and patients</p>
              </div>
            </div>

            <div className="flex items-start space-x-3">
              <div className="w-2 h-2 bg-red-500 rounded-full mt-2"></div>
              <div>
                <h3 className="font-semibold text-gray-800">Digital Health Records</h3>
                <p>Secure and accessible medical history and prescription management</p>
              </div>
            </div>

            <div className="flex items-start space-x-3">
              <div className="w-2 h-2 bg-red-500 rounded-full mt-2"></div>
              <div>
                <h3 className="font-semibold text-gray-800">Multi-Role Access</h3>
                <p>Role-based access for administrators, doctors, nurses, and staff</p>
              </div>
            </div>
          </div>

          <div className="bg-white p-4 rounded-lg shadow-sm border border-red-100">
            <h4 className="font-semibold text-gray-800 mb-2">Contact Information</h4>
            <p className="text-sm text-gray-600">📍 123 Medical Street, Mumbai, Maharashtra 400001</p>
            <p className="text-sm text-gray-600">📞 +91 98765 43210</p>
            <p className="text-sm text-gray-600">✉️ info@arogyahospital.com</p>
          </div>
        </div>

        {/* Login Form Section */}
        <div className="max-w-md w-full mx-auto">
          <LoginForm />
        </div>
      </div>
    </div>
  )
}
