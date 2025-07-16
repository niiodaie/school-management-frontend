import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'

export default function AnnouncementsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Announcements</h1>
        <p className="text-muted-foreground">Send school-wide announcements</p>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>Announcements Management</CardTitle>
          <CardDescription>
            This page would contain announcements management functionality
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">
            This is a placeholder page for the announcements management system.
          </p>
        </CardContent>
      </Card>
    </div>
  )
}
