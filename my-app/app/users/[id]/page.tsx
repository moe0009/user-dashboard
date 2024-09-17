// app/users/[id]/page.tsx
'use client'

import { useState, useEffect } from 'react'
import { useParams } from 'next/navigation'
import { Skeleton } from "@/components/ui/skeleton"
import { AlertCircle } from "lucide-react"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import UserProfileComponent from "@/components/UserProfile"
import UserActivitiesComponent from "@/components/UserActivities"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"



const fetchUserProfile = async (id: string): Promise<UserProfile> => {
  const response = await fetch(`https://jsonplaceholder.typicode.com/users/${id}`)
  if (!response.ok) throw new Error('Failed to fetch user profile')
  const data = await response.json()
  return {
    id: data.id.toString(),
    name: data.name,
    username: data.username,
    email: data.email,
    phone: data.phone,
    website: data.website,
    avatar: '/placeholder.svg?height=100&width=100', 
    address: {
      street: data.address.street,
      suite: data.address.suite,
      city: data.address.city,
      zipcode: data.address.zipcode,
    },
    company: {
      name: data.company.name,
      catchPhrase: data.company.catchPhrase,
      bs: data.company.bs,
    }
  }
}


const fetchUserActivities = async (id: string): Promise<UserActivity[]> => {
  const response = await fetch(`https://jsonplaceholder.typicode.com/posts?userId=${id}`);
  if (!response.ok) throw new Error('Failed to fetch user activities');
  const data = await response.json();
  return data.map((post: any) => ({
    id: post.id,
    title: post.title,
    content: post.body,
  }));
};

type UserProfile = {
  id: string
  name: string
  email: string
  phone: string
  avatar: string
}

type UserActivity = {
  id: number
  title: string
  content: string
}

const Page: React.FC = () => {
  const params = useParams()
  const userId = params.id as string

  const [profile, setProfile] = useState<UserProfile | null>(null)
  const [activities, setActivities] = useState<UserActivity[] | null>(null)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    setProfile(null)
    setActivities(null)
    setError(null)

    fetchUserProfile(userId)
      .then((data) => setProfile(data as UserProfile))
      .catch(() => setError('Failed to load user profile'))

    fetchUserActivities(userId)
      .then((data) => setActivities(data as UserActivity[]))
      .catch(() => setError('Failed to load user activities'))
  }, [userId])

  if (error) {
    return (
      <Alert variant="destructive">
        <AlertCircle className="h-4 w-4" />
        <AlertTitle>Error</AlertTitle>
        <AlertDescription>{error}</AlertDescription>
      </Alert>
    )
  }

  return (
    <div className="container mx-auto p-4 space-y-4">
      <h1 className="text-2xl font-bold mb-4">User Dashboard</h1>
      <div className="grid gap-4 md:grid-cols-2">
        {profile ? (
          <UserProfileComponent profile={profile} />
        ) : (
          <Card>
            <CardHeader className="flex flex-row items-center gap-4">
              <Skeleton className="h-16 w-16 rounded-full" />
              <div className="space-y-2">
                <Skeleton className="h-4 w-[200px]" />
                <Skeleton className="h-4 w-[160px]" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <Skeleton className="h-4 w-[250px]" />
                <Skeleton className="h-4 w-[200px]" />
              </div>
            </CardContent>
          </Card>
        )}
        {activities ? (
          <UserActivitiesComponent activities={activities} />
        ) : (
          <Card>
            <CardHeader>
              <Skeleton className="h-6 w-[180px]" />
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-full" />
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  )
}

export default Page
