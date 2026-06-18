'use client'

import React from 'react'
import { useCurrentUser } from '@/hooks/useCurrentUser'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from "@/components/ui/card"
import { Separator } from '@/components/ui/separator'
import { Skeleton } from "@/components/ui/skeleton"


function ProfileSkeleton() {
  return (
    <div className="container mx-auto max-w-5xl py-10 px-4 space-y-6">

      <Card>
        <CardContent className="p-8 flex justify-between items-start">
          <div className="space-y-3">
            <Skeleton className="h-8 w-64" />
            <Skeleton className="h-4 w-40" />
            <Skeleton className="h-4 w-56" />
          </div>
          <Skeleton className="h-10 w-32" />
        </CardContent>
      </Card>

      <Separator />

      <Card>
        <CardContent className="p-6 space-y-3">
          <Skeleton className="h-6 w-24" />
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-5/6" />
        </CardContent>
      </Card>

      <Separator />

      <Card>
        <CardContent className="p-6 space-y-3">
          <Skeleton className="h-6 w-28" />
          <div className="flex flex-wrap gap-2">
            {Array.from({ length: 6 }).map((_, i) => (
              <Skeleton key={i} className="h-6 w-20 rounded-full" />
            ))}
          </div>
        </CardContent>
      </Card>

      <Separator />

      <Card>
        <CardContent className="p-6 space-y-3">
          <Skeleton className="h-6 w-32" />
          <Skeleton className="h-20 w-full" />
        </CardContent>
      </Card>

    </div>
  )
}


function Page() {

  const {
    data: currentUser,
    isLoading,
    error
  } = useCurrentUser()

  // loading
  if (isLoading) {
    return <ProfileSkeleton />
  }

  // error
  if (error || !currentUser) {
    return (
      <div className="container mx-auto py-10 text-center text-red-500">
        Something went wrong
      </div>
    )
  }

  return (
    <div className="container mx-auto max-w-5xl py-10 px-4 space-y-6">

   
      <Card>
        <CardContent className="p-8 flex justify-between items-start">
          <div>
            <h1 className="text-3xl font-bold">
              {currentUser.fullname}
            </h1>

            <p className="text-muted-foreground mt-2">
              {currentUser.university}
            </p>

            <a
              href={currentUser.githubLink}
              target="_blank"
              className="text-sm text-blue-500 mt-2 block"
            >
              {currentUser.githubLink}
            </a>
          </div>

          <Button>
            Edit Profile
          </Button>
        </CardContent>
      </Card>

      <Separator />

     
      <Card>
        <CardContent className="p-6">
          <h2 className="text-xl font-semibold mb-4">
            Bio
          </h2>

          <p className="text-muted-foreground">
            {currentUser.bio}
          </p>
        </CardContent>
      </Card>

      <Separator />

      
      <Card>
        <CardContent className="p-6">
          <h2 className="text-xl font-semibold mb-4">
            Skills
          </h2>

          <div className="flex flex-wrap gap-2">
            {currentUser.skills?.map((skill: string) => (
              <span
                key={skill}
                className="px-3 py-1 rounded-full border text-sm"
              >
                {skill}
              </span>
            ))}
          </div>
        </CardContent>
      </Card>

      <Separator />

    
      <Card>
        <CardContent className="p-6">
          <h2 className="text-xl font-semibold mb-6">
            Projects
          </h2>

          <div className="space-y-4">
            {currentUser.projects?.map((project: any) => (
              <Card key={project._id}>
                <CardContent className="p-5">
                  <h3 className="font-semibold text-lg">
                    {project.title}
                  </h3>

                  <p className="text-muted-foreground mt-2">
                    {project.description}
                  </p>

                  <div className="flex gap-4 mt-4">
                    {project.githubLink && (
                      <a
                        href={project.githubLink}
                        target="_blank"
                        className="text-blue-500 text-sm"
                      >
                        GitHub
                      </a>
                    )}

                    {project.liveLink && (
                      <a
                        href={project.liveLink}
                        target="_blank"
                        className="text-blue-500 text-sm"
                      >
                        Live Demo
                      </a>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>

    </div>
  )
}

export default Page