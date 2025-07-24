import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { Toaster } from '@/components/ui/sonner'
import { AuthProvider, useAuth } from '@/contexts/AuthContext'
import { SchoolProvider } from '@/contexts/SchoolContext'
import Sidebar from '@/components/layout/Sidebar'
import Header from '@/components/layout/Header'
import LoginPage from '@/pages/auth/LoginPage'
import DashboardPage from '@/pages/DashboardPage'
import SchoolOnboardingPage from '@/pages/onboarding/SchoolOnboardingPage'
import StudentsPage from '@/pages/students/StudentsPage'
import TeachersPage from '@/pages/teachers/TeachersPage'
import ClassesPage from '@/pages/classes/ClassesPage'
import SubjectsPage from '@/pages/subjects/SubjectsPage'
import TimetablePage from '@/pages/timetable/TimetablePage'
import AttendancePage from '@/pages/attendance/AttendancePage'
import GradesPage from '@/pages/grades/GradesPage'
import InvoicesPage from '@/pages/invoices/InvoicesPage'
import DocumentsPage from '@/pages/documents/DocumentsPage'
import AnnouncementsPage from '@/pages/announcements/AnnouncementsPage'
import MessagesPage from '@/pages/messages/MessagesPage'
import SettingsPage from '@/pages/settings/SettingsPage'
import './App.css'

function AppContent() {
  const { user, loading } = useAuth()
  const [sidebarOpen, setSidebarOpen] = useState(false)

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary"></div>
      </div>
    )
  }

  if (!user) {
    return (
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/onboarding" element={<SchoolOnboardingPage />} />
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      <Sidebar open={sidebarOpen} setOpen={setSidebarOpen} />
      <div className={`transition-all duration-300 ${sidebarOpen ? 'lg:ml-64' : 'lg:ml-16'}`}>
        <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
        <main className="p-6">
          <Routes>
            <Route path="/" element={<DashboardPage />} />
            <Route path="/dashboard" element={<DashboardPage />} />
            <Route path="/students" element={<StudentsPage />} />
            <Route path="/teachers" element={<TeachersPage />} />
            <Route path="/classes" element={<ClassesPage />} />
            <Route path="/subjects" element={<SubjectsPage />} />
            <Route path="/timetable" element={<TimetablePage />} />
            <Route path="/attendance" element={<AttendancePage />} />
            <Route path="/grades" element={<GradesPage />} />
            <Route path="/invoices" element={<InvoicesPage />} />
            <Route path="/documents" element={<DocumentsPage />} />
            <Route path="/announcements" element={<AnnouncementsPage />} />
            <Route path="/messages" element={<MessagesPage />} />
            <Route path="/settings" element={<SettingsPage />} />
            <Route path="*" element={<Navigate to="/dashboard" replace />} />
          </Routes>
        </main>
      </div>
      <Toaster />
    </div>
  )
}

function App() {
  return (
    <Router>
      <AuthProvider>
        <SchoolProvider>
          <AppContent />
        </SchoolProvider>
      </AuthProvider>
    </Router>
  )
}

export default App

