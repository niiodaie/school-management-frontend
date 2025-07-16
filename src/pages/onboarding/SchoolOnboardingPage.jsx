import { useNavigate } from 'react-router-dom'
import { useAuth } from '@/contexts/AuthContext'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { School, ArrowRight } from 'lucide-react'

export default function SchoolOnboardingPage() {
  const navigate = useNavigate()
  const { user } = useAuth()

  const handleStart = () => {
    if (user) {
      navigate('/onboarding/school-profile') // authenticated = step 1
    } else {
      navigate('/signup') // unauthenticated = setup flow
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800 p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <div className="flex justify-center mb-4">
            <div className="p-3 bg-primary rounded-full">
              <School className="h-8 w-8 text-primary-foreground" />
            </div>
          </div>
          <CardTitle>Welcome to EduControl</CardTitle>
          <CardDescription>
            Set up your school management system in minutes
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-sm text-muted-foreground text-center">
            This onboarding flow will guide you through setting up your school profile, 
            adding users, and configuring your system preferences.
          </p>
          <Button onClick={handleStart} className="w-full">
            Get Started
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}
