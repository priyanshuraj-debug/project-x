'use client'

import React from 'react'
import { useQuery } from '@tanstack/react-query'
import userService from '@/helpers/userSevice'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import { Skeleton } from '@/components/ui/skeleton'
import { useParams } from 'next/navigation'
import { useCurrentUser } from '@/hooks/useCurrentUser'

function ProfileSkeleton() {
  return (
    <div className="container mx-auto max-w-5xl py-10 px-4 space-y-6">
      <Card>
        <CardContent className="p-8">
          <div className="flex items-start justify-between">
            <div className="space-y-3">
              <Skeleton className="h-8 w-56" />
              <Skeleton className="h-4 w-40" />
              <Skeleton className="h-4 w-72" />
            </div>

            <Skeleton className="h-10 w-28" />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="p-6 space-y-4">
          <Skeleton className="h-6 w-20" />
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-[90%]" />
          <Skeleton className="h-4 w-[75%]" />
        </CardContent>
      </Card>

      <Card>
        <CardContent className="p-6">
          <Skeleton className="h-6 w-24 mb-4" />

          <div className="flex flex-wrap gap-2">
            {Array.from({ length: 8 }).map((_, i) => (
              <Skeleton
                key={i}
                className="h-8 w-20 rounded-full"
              />
            ))}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="p-6">
          <Skeleton className="h-6 w-28 mb-6" />

          <div className="space-y-4">
            {Array.from({ length: 3 }).map((_, i) => (
              <Card key={i}>
                <CardContent className="p-5 space-y-3">
                  <Skeleton className="h-6 w-48" />
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-[85%]" />

                  <div className="flex gap-4 pt-2">
                    <Skeleton className="h-4 w-16" />
                    <Skeleton className="h-4 w-20" />
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

function Page() {
  const { id } = useParams<{ id: string }>()

  const {
    data: user,
    isLoading,
    error,
  } = useQuery({
    queryKey: ['user', id],
    queryFn: () => userService.getUserProfile(id as string),
    enabled: !!id,
  })

  const { data: currentUser } = useCurrentUser()

  if (isLoading) {
    return <ProfileSkeleton />
  }

  if (error) {
    return (
      <div className="container mx-auto py-10">
        Something went wrong
      </div>
    )
  }

  if (!user) {
    return (
      <div className="container mx-auto py-10">
        User not found
      </div>
    )
  }

  const isOwner = (currentUser as any)?._id === user?._id

  return (
    <div className="container mx-auto max-w-5xl py-10 px-4">
      <Card>
        <CardContent className="p-8">
          <div className="flex items-start justify-between">
            <div>
              <h1 className="text-3xl font-bold">
                {user.fullname}
              </h1>

              <p className="text-muted-foreground mt-2">
                {user.university}
              </p>

              {user.githubLink && (
                <a
                  href={user.githubLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-blue-500 mt-2 block"
                >
                  {user.githubLink}
                </a>
              )}
            </div>

            {isOwner ? (
              <Button className="hover:cursor-pointer">
                Edit Profile
              </Button>
            ) : (
              <Button className="hover:cursor-pointer">
                Connect
              </Button>
            )}
          </div>
        </CardContent>
      </Card>

      <Separator className="my-6" />

      <Card>
        <CardContent className="p-6">
          <h2 className="text-xl font-semibold mb-4">
            Bio
          </h2>

          <p className="text-muted-foreground">
            {user.bio}
          </p>
        </CardContent>
      </Card>

      <Separator className="my-6" />

      <Card>
        <CardContent className="p-6">
          <h2 className="text-xl font-semibold mb-4">
            Skills
          </h2>

          <div className="flex flex-wrap gap-2">
            {user.skills?.map((skill: string) => (
              <div
                key={skill}
                className="px-3 py-1 rounded-full border text-sm"
              >
                {skill}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Separator className="my-6" />

      <Card>
        <CardContent className="p-6">
          <h2 className="text-xl font-semibold mb-6">
            Projects
          </h2>

          <div className="space-y-4">
            {user.projects?.map((project: any) => (
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
                        rel="noopener noreferrer"
                        className="text-blue-500 text-sm"
                      >
                        GitHub
                      </a>
                    )}

                    {project.liveLink && (
                      <a
                        href={project.liveLink}
                        target="_blank"
                        rel="noopener noreferrer"
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