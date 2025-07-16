import { Link, useLocation } from 'react-router-dom'
import { cn } from '@/lib/utils'
import { useAuth } from '@/contexts/AuthContext'
import { Button } from '@/components/ui/button'
import { ScrollArea } from '@/components/ui/scroll-area'
import {
  LayoutDashboard,
  Users,
  GraduationCap,
  BookOpen,
  Calendar,
  ClipboardCheck,
  Trophy,
  Receipt,
  FileText,
  Megaphone,
  MessageSquare,
  Settings,
  ChevronLeft,
  ChevronRight,
  School
} from 'lucide-react'

const navigation = [
  { name: 'Dashboard', href: '/dashboard', icon: LayoutDashboard, roles: ['admin', 'teacher', 'parent', 'student'] },
  { name: 'Students', href: '/students', icon: Users, roles: ['admin', 'teacher'] },
  { name: 'Teachers', href: '/teachers', icon: GraduationCap, roles: ['admin'] },
  { name: 'Classes', href: '/classes', icon: BookOpen, roles: ['admin', 'teacher'] },
  { name: 'Subjects', href: '/subjects', icon: BookOpen, roles: ['admin', 'teacher'] },
  { name: 'Timetable', href: '/timetable', icon: Calendar, roles: ['admin', 'teacher', 'student'] },
  { name: 'Attendance', href: '/attendance', icon: ClipboardCheck, roles: ['admin', 'teacher', 'parent', 'student'] },
  { name: 'Grades', href: '/grades', icon: Trophy, roles: ['admin', 'teacher', 'parent', 'student'] },
  { name: 'Invoices', href: '/invoices', icon: Receipt, roles: ['admin', 'parent'] },
  { name: 'Documents', href: '/documents', icon: FileText, roles: ['admin', 'teacher', 'parent', 'student'] },
  { name: 'Announcements', href: '/announcements', icon: Megaphone, roles: ['admin', 'teacher', 'parent', 'student'] },
  { name: 'Messages', href: '/messages', icon: MessageSquare, roles: ['admin', 'teacher', 'parent'] },
  { name: 'Settings', href: '/settings', icon: Settings, roles: ['admin'] }
]

export default function Sidebar({ open, setOpen }) {
  const location = useLocation()
  const { user } = useAuth()

  const filteredNavigation = navigation.filter(item => 
    item.roles.includes(user?.role)
  )

  return (
    <>
      {/* Mobile backdrop */}
      {open && (
        <div 
          className="fixed inset-0 z-40 bg-black bg-opacity-50 lg:hidden"
          onClick={() => setOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div className={cn(
        "fixed inset-y-0 left-0 z-50 flex flex-col bg-card border-r border-border transition-all duration-300",
        open ? "w-64" : "w-16",
        "lg:translate-x-0",
        open ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
      )}>
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-border">
          <div className={cn("flex items-center space-x-2", !open && "lg:justify-center")}>
            <School className="h-8 w-8 text-primary" />
            {open && (
              <div>
                <h1 className="text-lg font-semibold">EduControl</h1>
                <p className="text-xs text-muted-foreground">School Management</p>
              </div>
            )}
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setOpen(!open)}
            className="hidden lg:flex"
          >
            {open ? <ChevronLeft className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />}
          </Button>
        </div>

        {/* Navigation */}
        <ScrollArea className="flex-1 px-3 py-4">
          <nav className="space-y-1">
            {filteredNavigation.map((item) => {
              const isActive = location.pathname === item.href
              return (
                <Link
                  key={item.name}
                  to={item.href}
                  className={cn(
                    "flex items-center px-3 py-2 text-sm font-medium rounded-md transition-colors",
                    isActive
                      ? "bg-primary text-primary-foreground"
                      : "text-muted-foreground hover:text-foreground hover:bg-accent",
                    !open && "lg:justify-center lg:px-2"
                  )}
                  title={!open ? item.name : undefined}
                >
                  <item.icon className={cn("h-5 w-5", open && "mr-3")} />
                  {open && <span>{item.name}</span>}
                </Link>
              )
            })}
          </nav>
        </ScrollArea>

        {/* User info */}
        {open && user && (
          <div className="p-4 border-t border-border">
            <div className="flex items-center space-x-3">
              <div className="h-8 w-8 rounded-full bg-primary flex items-center justify-center">
                <span className="text-sm font-medium text-primary-foreground">
                  {user.first_name?.[0]}{user.last_name?.[0]}
                </span>
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium truncate">
                  {user.first_name} {user.last_name}
                </p>
                <p className="text-xs text-muted-foreground capitalize">
                  {user.role}
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  )
}

