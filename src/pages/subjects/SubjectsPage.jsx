import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'

export default function SubjectsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Subjects</h1>
        <p className="text-muted-foreground">Manage academic subjects and curriculum</p>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>Subjects Management</CardTitle>
          <CardDescription>
            This page would contain subjects management functionality
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">
            This is a placeholder page for the subjects management system.
          </p>
        </CardContent>
      </Card>
    </div>
  )
}
