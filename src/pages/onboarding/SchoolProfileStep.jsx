import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import { useState } from 'react'

const SchoolProfileStep = () => {
  const [form, setForm] = useState({
    schoolName: '',
    country: '',
    language: '',
    yearStart: '',
    yearEnd: ''
  })

  const handleChange = (e) => {
    const { name, value } = e.target
    setForm((prev) => ({ ...prev, [name]: value }))
  }

  const handleNext = () => {
    console.log('Submitting school profile:', form)
    // TODO: Save to backend / navigate to next step
  }

  return (
    <div className="max-w-2xl mx-auto mt-12 p-6 bg-white rounded-lg shadow-md space-y-6">
      <h1 className="text-2xl font-semibold">Step 1: School Profile</h1>

      <div className="space-y-4">
        <div>
          <Label htmlFor="schoolName">School Name</Label>
          <Input
            id="schoolName"
            name="schoolName"
            placeholder="e.g. Rising Stars Academy"
            value={form.schoolName}
            onChange={handleChange}
          />
        </div>

        <div>
          <Label htmlFor="country">Country</Label>
          <Input
            id="country"
            name="country"
            placeholder="e.g. Ghana"
            value={form.country}
            onChange={handleChange}
          />
        </div>

        <div>
          <Label htmlFor="language">Language</Label>
          <Input
            id="language"
            name="language"
            placeholder="e.g. English"
            value={form.language}
            onChange={handleChange}
          />
        </div>

        <div className="flex gap-4">
          <div className="w-1/2">
            <Label htmlFor="yearStart">Academic Year Start</Label>
            <Input
              id="yearStart"
              name="yearStart"
              placeholder="e.g. September"
              value={form.yearStart}
              onChange={handleChange}
            />
          </div>
          <div className="w-1/2">
            <Label htmlFor="yearEnd">Academic Year End</Label>
            <Input
              id="yearEnd"
              name="yearEnd"
              placeholder="e.g. June"
              value={form.yearEnd}
              onChange={handleChange}
            />
          </div>
        </div>
      </div>

      <Button className="mt-6 w-full" onClick={handleNext}>
        Save and Continue
      </Button>
    </div>
  )
}

export default SchoolProfileStep
