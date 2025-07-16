import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '@/contexts/AuthContext'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { Separator } from '@/components/ui/separator'
import { School, Mail, Lock, Eye, EyeOff, AlertCircle } from 'lucide-react'

export default function LoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const { login } = useAuth()
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    try {
      const result = await login(email, password)
      if (result.success) {
        navigate('/dashboard')
      } else {
        setError(result.error || 'Login failed')
      }
    } catch (err) {
      setError('An unexpected error occurred')
    } finally {
      setLoading(false)
    }
  }

  const handleDemoLogin = (role) => {
 const demoCredentials = {
  admin: {
    email: 'admin@greenwood.edu',
    password: 'admin123'
  },
  teacher: {
    email: 'teacher@greenwood.edu',
    password: 'teacher123'
  },
  parent: {
    email: 'parent@greenwood.edu',
    password: 'parent123'
  },
  student: {
    email: 'student@greenwood.edu',
    password: 'student123'
  }
};

  const creds = demoCredentials[role];

  if (!creds) {
    console.warn(`Unknown demo role: ${role}`);
    return;
  }

  setEmail(creds.email);
  setPassword(creds.password);

  // Optionally trigger login automatically:
  // handleSubmit({ preventDefault: () => {} });
};

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800 p-4">
      <div className="w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex justify-center mb-4">
            <div className="p-3 bg-primary rounded-full">
              <School className="h-8 w-8 text-primary-foreground" />
            </div>
          </div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">EduControl</h1>
          <p className="text-gray-600 dark:text-gray-400 mt-2">School Management System</p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Sign in to your account</CardTitle>
            <CardDescription>
              Enter your email and password to access your dashboard
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              {error && (
                <Alert variant="destructive">
                  <AlertCircle className="h-4 w-4" />
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}

              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="email"
                    type="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="pl-10"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="password"
                    type={showPassword ? 'text' : 'password'}
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="pl-10 pr-10"
                    required
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="absolute right-0 top-0 h-full px-3"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </Button>
                </div>
              </div>

              <Button type="submit" className="w-full" disabled={loading}>
                {loading ? 'Signing in...' : 'Sign in'}
              </Button>
            </form>

            <Separator className="my-6" />

            {/* Demo accounts */}
            <div className="space-y-3">
              <p className="text-sm text-muted-foreground text-center">Try demo accounts:</p>
              <div className="grid grid-cols-2 gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleDemoLogin('admin')}
                  className="text-xs"
                >
                  Admin Demo
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleDemoLogin('teacher')}
                  className="text-xs"
                >
                  Teacher Demo
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleDemoLogin('parent')}
                  className="text-xs"
                >
                  Parent Demo
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleDemoLogin('student')}
                  className="text-xs"
                >
                  Student Demo
                </Button>
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex flex-col space-y-4">
            <div className="text-center text-sm text-muted-foreground">
              Don't have a school account?{' '}
              <Link to="/onboarding" className="text-primary hover:underline">
                Set up your school
              </Link>
            </div>
            <div className="text-center text-xs text-muted-foreground">
              By signing in, you agree to our Terms of Service and Privacy Policy
            </div>
          </CardFooter>
        </Card>

        {/* Features */}
        <div className="mt-8 text-center">
          <p className="text-sm text-muted-foreground mb-4">Trusted by schools worldwide</p>
          <div className="flex justify-center space-x-6 text-xs text-muted-foreground">
            <span>✓ Student Management</span>
            <span>✓ Grade Tracking</span>
            <span>✓ Parent Portal</span>
          </div>
        </div>
      </div>
    </div>
  )
}

