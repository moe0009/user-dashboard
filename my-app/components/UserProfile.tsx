// src/components/UserProfile.tsx
'use client'

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Mail, Phone } from "lucide-react"

type UserProfile = {
  id: string
  name: string
  username: string
  email: string
  phone: string
  website: string
  avatar: string
  address: {
    street: string
    suite: string
    city: string
    zipcode: string
  }
  company: {
    name: string
    catchPhrase: string
    bs: string
  }
}

interface UserProfileProps {
  profile: UserProfile
}

const UserProfileComponent: React.FC<UserProfileProps> = ({ profile }) => {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center gap-4">
        <Avatar className="h-16 w-16">
          <AvatarImage src={profile.avatar} alt={profile.name} />
          <AvatarFallback>{profile.name[0]}</AvatarFallback>
        </Avatar>
        <div>
          <CardTitle>{profile.name}</CardTitle>
          <p className="text-sm text-muted-foreground">User Profile</p>
        </div>
      </CardHeader>
      <CardContent>
        <div className="grid gap-2">
          <div className="flex items-center gap-2">
            <Mail className="h-4 w-4 text-muted-foreground" />
            <span>{profile.email}</span>
          </div>
          <div className="flex items-center gap-2">
            <Phone className="h-4 w-4 text-muted-foreground" />
            <span>{profile.phone}</span>
          </div>
          <div className="mt-4">
            <p className="text-sm font-semibold">Username:</p>
            <span>{profile.username}</span>
          </div>
          <div className="mt-4">
            <p className="text-sm font-semibold">Address:</p>
            <span>{`${profile.address.street}, ${profile.address.suite}, ${profile.address.city}, ${profile.address.zipcode}`}</span>
          </div>
          <div className="mt-4">
            <p className="text-sm font-semibold">Website:</p>
            <span>{profile.website}</span>
          </div>
          <div className="mt-4">
            <p className="text-sm font-semibold">Company:</p>
            <div>
              <span className="block">{profile.company.name}</span>
              <span className="block text-sm italic">{profile.company.catchPhrase}</span>
              <span className="block text-sm text-muted-foreground">{profile.company.bs}</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

export default UserProfileComponent
