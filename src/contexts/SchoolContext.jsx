import { createContext, useContext, useState, useEffect } from 'react'
import { useAuth } from './AuthContext'

const SchoolContext = createContext({})

export const useSchool = () => {
  const context = useContext(SchoolContext)
  if (!context) {
    throw new Error('useSchool must be used within a SchoolProvider')
  }
  return context
}

export const SchoolProvider = ({ children }) => {
  const { user } = useAuth()
  const [school, setSchool] = useState(null)
  const [students, setStudents] = useState([])
  const [teachers, setTeachers] = useState([])
  const [classes, setClasses] = useState([])
  const [subjects, setSubjects] = useState([])
  const [academicYears, setAcademicYears] = useState([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (user?.school_id) {
      fetchSchoolData()
    }
  }, [user])

  const fetchSchoolData = async () => {
    setLoading(true)
    try {
      // Mock data - in real app, this would fetch from your API
      const mockSchool = {
        id: user.school_id,
        name: 'Greenwood Elementary School',
        address: '123 Main Street, Springfield, IL 62701',
        phone: '+1-555-123-4567',
        email: 'info@greenwood.edu',
        website: 'https://greenwood.edu',
        timezone: 'America/Chicago',
        currency: 'USD',
        locale: 'en'
      }

      const mockAcademicYear = {
        id: 'ay_2024_2025',
        name: '2024-2025',
        start_date: '2024-08-15',
        end_date: '2025-06-15',
        is_current: true
      }

      const mockClasses = [
        { id: 'class_1', name: 'Grade 1A', capacity: 25, academic_year_id: 'ay_2024_2025' },
        { id: 'class_2', name: 'Grade 2A', capacity: 28, academic_year_id: 'ay_2024_2025' },
        { id: 'class_3', name: 'Grade 3A', capacity: 30, academic_year_id: 'ay_2024_2025' }
      ]

      const mockSubjects = [
        { id: 'subject_1', name: 'Mathematics', code: 'MATH', color: '#3B82F6' },
        { id: 'subject_2', name: 'English', code: 'ENG', color: '#10B981' },
        { id: 'subject_3', name: 'Science', code: 'SCI', color: '#F59E0B' },
        { id: 'subject_4', name: 'Social Studies', code: 'SS', color: '#EF4444' }
      ]

      const mockStudents = [
        {
          id: 'student_1',
          student_id: 'STU001',
          first_name: 'Alice',
          last_name: 'Johnson',
          email: 'alice.johnson@email.com',
          class_id: 'class_1',
          status: 'active',
          enrollment_date: '2024-08-15'
        },
        {
          id: 'student_2',
          student_id: 'STU002',
          first_name: 'Bob',
          last_name: 'Smith',
          email: 'bob.smith@email.com',
          class_id: 'class_1',
          status: 'active',
          enrollment_date: '2024-08-15'
        }
      ]

      const mockTeachers = [
        {
          id: 'teacher_1',
          employee_id: 'TCH001',
          first_name: 'Sarah',
          last_name: 'Wilson',
          email: 'sarah.wilson@greenwood.edu',
          specialization: 'Elementary Education',
          status: 'active'
        },
        {
          id: 'teacher_2',
          employee_id: 'TCH002',
          first_name: 'Michael',
          last_name: 'Brown',
          email: 'michael.brown@greenwood.edu',
          specialization: 'Mathematics',
          status: 'active'
        }
      ]

      setSchool(mockSchool)
      setAcademicYears([mockAcademicYear])
      setClasses(mockClasses)
      setSubjects(mockSubjects)
      setStudents(mockStudents)
      setTeachers(mockTeachers)
    } catch (error) {
      console.error('Error fetching school data:', error)
    } finally {
      setLoading(false)
    }
  }

  const addStudent = (student) => {
    setStudents(prev => [...prev, { ...student, id: `student_${Date.now()}` }])
  }

  const updateStudent = (id, updates) => {
    setStudents(prev => prev.map(student => 
      student.id === id ? { ...student, ...updates } : student
    ))
  }

  const deleteStudent = (id) => {
    setStudents(prev => prev.filter(student => student.id !== id))
  }

  const addTeacher = (teacher) => {
    setTeachers(prev => [...prev, { ...teacher, id: `teacher_${Date.now()}` }])
  }

  const updateTeacher = (id, updates) => {
    setTeachers(prev => prev.map(teacher => 
      teacher.id === id ? { ...teacher, ...updates } : teacher
    ))
  }

  const deleteTeacher = (id) => {
    setTeachers(prev => prev.filter(teacher => teacher.id !== id))
  }

  const addClass = (classData) => {
    setClasses(prev => [...prev, { ...classData, id: `class_${Date.now()}` }])
  }

  const updateClass = (id, updates) => {
    setClasses(prev => prev.map(cls => 
      cls.id === id ? { ...cls, ...updates } : cls
    ))
  }

  const deleteClass = (id) => {
    setClasses(prev => prev.filter(cls => cls.id !== id))
  }

  const addSubject = (subject) => {
    setSubjects(prev => [...prev, { ...subject, id: `subject_${Date.now()}` }])
  }

  const updateSubject = (id, updates) => {
    setSubjects(prev => prev.map(subject => 
      subject.id === id ? { ...subject, ...updates } : subject
    ))
  }

  const deleteSubject = (id) => {
    setSubjects(prev => prev.filter(subject => subject.id !== id))
  }

  const value = {
    school,
    students,
    teachers,
    classes,
    subjects,
    academicYears,
    loading,
    addStudent,
    updateStudent,
    deleteStudent,
    addTeacher,
    updateTeacher,
    deleteTeacher,
    addClass,
    updateClass,
    deleteClass,
    addSubject,
    updateSubject,
    deleteSubject,
    refreshData: fetchSchoolData
  }

  return (
    <SchoolContext.Provider value={value}>
      {children}
    </SchoolContext.Provider>
  )
}

