'use client'

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

type UserActivity = {
  id: number
  title: string
  content: string
}

interface UserActivitiesProps {
  activities: UserActivity[]
}

const UserActivitiesComponent: React.FC<UserActivitiesProps> = ({ activities }) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>User Activities</CardTitle>
      </CardHeader>
      <CardContent>
        <ul className="space-y-4">
          {activities.map((activity) => (
            <li key={activity.id}>
              <h3 className="font-semibold">{activity.title}</h3>
              <p className="text-sm text-muted-foreground">{activity.content}</p>
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  )
}

export default UserActivitiesComponent
