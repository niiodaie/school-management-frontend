import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'

export default function DocumentsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Documents</h1>
        <p className="text-muted-foreground">Manage academic documents and certificates</p>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>Documents Management</CardTitle>
          <CardDescription>
            This page would contain documents management functionality
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">
            This is a placeholder page for the documents management system.
          </p>
        </CardContent>
      </Card>
    </div>
  )
}
