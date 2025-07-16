import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'

export default function GradesPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Grades</h1>
        <p className="text-muted-foreground">Manage student grades and assessments</p>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>Grades Management</CardTitle>
          <CardDescription>
            This page would contain grades management functionality
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">
            This is a placeholder page for the grades management system.
          </p>
        </CardContent>
      </Card>
    </div>
  )
}
