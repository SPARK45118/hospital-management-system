"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Eye, EyeOff, Stethoscope } from "lucide-react"

export default function LoginForm() {
  const [showPassword, setShowPassword] = useState(false)
  const [userType, setUserType] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const router = useRouter()

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()
    // Simulate authentication
    if (email && password && userType) {
      localStorage.setItem("userType", userType)
      localStorage.setItem("userEmail", email)
      router.push("/dashboard")
    }
  }

  return (
    <Card className="w-full">
      <CardHeader className="space-y-1 text-center">
        <div className="flex justify-center mb-4">
          <div className="p-3 bg-red-100 rounded-full">
            <Stethoscope className="h-8 w-8 text-red-600" />
          </div>
        </div>
        <CardTitle className="text-2xl font-bold">Sign In</CardTitle>
        <CardDescription>Enter your credentials to access the Arogya Hospital management system</CardDescription>
      </CardHeader>
      <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-4">
        <h4 className="font-semibold text-red-800 mb-2">Demo Login Credentials</h4>
        <div className="space-y-2 text-sm">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="font-medium text-red-700">Administrator:</p>
              <p className="text-red-600">admin@arogyahospital.com</p>
              <p className="text-red-600">admin123</p>
            </div>
            <div>
              <p className="font-medium text-red-700">Doctor:</p>
              <p className="text-red-600">doctor@arogyahospital.com</p>
              <p className="text-red-600">doctor123</p>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4 mt-2">
            <div>
              <p className="font-medium text-red-700">Nurse:</p>
              <p className="text-red-600">nurse@arogyahospital.com</p>
              <p className="text-red-600">nurse123</p>
            </div>
            <div>
              <p className="font-medium text-red-700">Receptionist:</p>
              <p className="text-red-600">reception@arogyahospital.com</p>
              <p className="text-red-600">reception123</p>
            </div>
          </div>
        </div>
      </div>
      <CardContent>
        <form onSubmit={handleLogin} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="userType">User Type</Label>
            <Select value={userType} onValueChange={setUserType} required>
              <SelectTrigger>
                <SelectValue placeholder="Select user type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="admin">Administrator</SelectItem>
                <SelectItem value="doctor">Doctor</SelectItem>
                <SelectItem value="nurse">Nurse</SelectItem>
                <SelectItem value="receptionist">Receptionist</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="doctor@hospital.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="relative space-y-2">
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <Button
              type="button"
              variant="ghost"
              size="icon"
              className="absolute bottom-1 right-1 h-7 w-7"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
            </Button>
          </div>
          <Button type="submit" className="w-full bg-red-600 hover:bg-red-700">
            Sign In
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}
