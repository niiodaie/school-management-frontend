import { useAuth } from '@/contexts/AuthContext'
import { useSchool } from '@/contexts/SchoolContext'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Progress } from '@/components/ui/progress'
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line
} from 'recharts'
import {
  Users,
  GraduationCap,
  BookOpen,
  TrendingUp,
  Calendar,
  Bell,
  Award,
  DollarSign,
  Clock,
  CheckCircle
} from 'lucide-react'

const attendanceData = [
  { name: 'Mon', present: 85, absent: 15 },
  { name: 'Tue', present: 88, absent: 12 },
  { name: 'Wed', present: 82, absent: 18 },
  { name: 'Thu', present: 90, absent: 10 },
  { name: 'Fri', present: 87, absent: 13 },
]

const gradeDistribution = [
  { name: 'A', value: 25, color: '#10B981' },
  { name: 'B', value: 35, color: '#3B82F6' },
  { name: 'C', value: 25, color: '#F59E0B' },
  { name: 'D', value: 10, color: '#EF4444' },
  { name: 'F', value: 5, color: '#6B7280' },
]

const monthlyEnrollment = [
  { month: 'Jan', students: 120 },
  { month: 'Feb', students: 125 },
  { month: 'Mar', students: 130 },
  { month: 'Apr', students: 128 },
  { month: 'May', students: 135 },
  { month: 'Jun', students: 140 },
]

export default function DashboardPage() {
  const { user } = useAuth()
  const { school, students, teachers, classes, subjects } = useSchool()

  const stats = [
    {
      title: 'Total Students',
      value: students.length,
      change: '+12%',
      changeType: 'positive',
      icon: Users,
      color: 'text-blue-600'
    },
    {
      title: 'Total Teachers',
      value: teachers.length,
      change: '+5%',
      changeType: 'positive',
      icon: GraduationCap,
      color: 'text-green-600'
    },
    {
      title: 'Active Classes',
      value: classes.length,
      change: '0%',
      changeType: 'neutral',
      icon: BookOpen,
      color: 'text-purple-600'
    },
    {
      title: 'Subjects',
      value: subjects.length,
      change: '+2%',
      changeType: 'positive',
      icon: Award,
      color: 'text-orange-600'
    }
  ]

  const recentActivities = [
    {
      id: 1,
      type: 'enrollment',
      message: 'New student Alice Johnson enrolled in Grade 1A',
      time: '2 hours ago',
      icon: Users
    },
    {
      id: 2,
      type: 'grade',
      message: 'Mathematics test results published for Grade 2A',
      time: '4 hours ago',
      icon: Award
    },
    {
      id: 3,
      type: 'announcement',
      message: 'Parent-teacher meeting scheduled for next week',
      time: '6 hours ago',
      icon: Bell
    },
    {
      id: 4,
      type: 'payment',
      message: 'Tuition payment received from Bob Smith',
      time: '1 day ago',
      icon: DollarSign
    }
  ]

  const upcomingEvents = [
    {
      id: 1,
      title: 'Parent-Teacher Meeting',
      date: '2024-01-25',
      time: '3:00 PM',
      type: 'meeting'
    },
    {
      id: 2,
      title: 'Mathematics Exam - Grade 3A',
      date: '2024-01-26',
      time: '10:00 AM',
      type: 'exam'
    },
    {
      id: 3,
      title: 'Science Fair',
      date: '2024-01-28',
      time: '9:00 AM',
      type: 'event'
    }
  ]

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold">
          Welcome back, {user?.first_name}!
        </h1>
        <p className="text-muted-foreground mt-2">
          Here's what's happening at {school?.name} today.
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <Card key={index}>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">
                    {stat.title}
                  </p>
                  <p className="text-2xl font-bold">{stat.value}</p>
                  <p className={`text-xs ${
                    stat.changeType === 'positive' ? 'text-green-600' : 
                    stat.changeType === 'negative' ? 'text-red-600' : 
                    'text-gray-600'
                  }`}>
                    {stat.change} from last month
                  </p>
                </div>
                <div className={`p-3 rounded-full bg-gray-100 dark:bg-gray-800`}>
                  <stat.icon className={`h-6 w-6 ${stat.color}`} />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Attendance Chart */}
        <Card>
          <CardHeader>
            <CardTitle>Weekly Attendance</CardTitle>
            <CardDescription>
              Student attendance for this week
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={attendanceData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="present" fill="#10B981" name="Present" />
                <Bar dataKey="absent" fill="#EF4444" name="Absent" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Grade Distribution */}
        <Card>
          <CardHeader>
            <CardTitle>Grade Distribution</CardTitle>
            <CardDescription>
              Overall grade distribution across all classes
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={gradeDistribution}
                  cx="50%"
                  cy="50%"
                  outerRadius={80}
                  dataKey="value"
                  label={({ name, value }) => `${name}: ${value}%`}
                >
                  {gradeDistribution.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Activities */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Recent Activities</CardTitle>
            <CardDescription>
              Latest updates and activities in your school
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentActivities.map((activity) => (
                <div key={activity.id} className="flex items-start space-x-3">
                  <div className="p-2 rounded-full bg-accent">
                    <activity.icon className="h-4 w-4" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium">{activity.message}</p>
                    <p className="text-xs text-muted-foreground">{activity.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Upcoming Events */}
        <Card>
          <CardHeader>
            <CardTitle>Upcoming Events</CardTitle>
            <CardDescription>
              Important dates and deadlines
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {upcomingEvents.map((event) => (
                <div key={event.id} className="flex items-start space-x-3">
                  <div className="p-2 rounded-full bg-primary/10">
                    <Calendar className="h-4 w-4 text-primary" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium">{event.title}</p>
                    <p className="text-xs text-muted-foreground">
                      {event.date} at {event.time}
                    </p>
                    <Badge variant="outline" className="mt-1">
                      {event.type}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Monthly Enrollment Trend */}
      <Card>
        <CardHeader>
          <CardTitle>Enrollment Trend</CardTitle>
          <CardDescription>
            Student enrollment over the past 6 months
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={monthlyEnrollment}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Line 
                type="monotone" 
                dataKey="students" 
                stroke="#3B82F6" 
                strokeWidth={2}
                dot={{ fill: '#3B82F6' }}
              />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle>Quick Actions</CardTitle>
          <CardDescription>
            Common tasks and shortcuts
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Button variant="outline" className="h-20 flex flex-col space-y-2">
              <Users className="h-6 w-6" />
              <span className="text-sm">Add Student</span>
            </Button>
            <Button variant="outline" className="h-20 flex flex-col space-y-2">
              <GraduationCap className="h-6 w-6" />
              <span className="text-sm">Add Teacher</span>
            </Button>
            <Button variant="outline" className="h-20 flex flex-col space-y-2">
              <Bell className="h-6 w-6" />
              <span className="text-sm">Send Announcement</span>
            </Button>
            <Button variant="outline" className="h-20 flex flex-col space-y-2">
              <CheckCircle className="h-6 w-6" />
              <span className="text-sm">Mark Attendance</span>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

