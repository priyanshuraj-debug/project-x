'use client'
import React from 'react'
import { useQuery } from '@tanstack/react-query';
import userService from '@/helpers/userSevice';
import { Spinner } from '@/components/ui/spinner';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from '@/components/ui/separator';
import { useParams } from 'next/navigation';
import { useCurrentUser } from '@/hooks/useCurrentUser';

function page() {
   
    const {id}=useParams<{ id: string }>()
    const {
        data:user,
        isLoading,
        error
    }=useQuery({
        queryKey: ["user",id],
        queryFn:()=> userService.getUserProfile(id as string),
    })
    const {data:currentUser}=useCurrentUser()
   const isOwner =(currentUser as any)?._id === user?._id;
  if(isLoading){
     return (
        <div className="flex flex-col items-center gap-4">
         <Button variant="secondary" disabled size="sm">
            <Spinner data-icon="inline-start" />
            Processing
          </Button>
        </div>
      )
    }if (error) {
    return (
      <div className="container mx-auto py-10">
        Something went wrong
      </div>
    );
  }
  
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
  
              <a
                href={user.githubLink}
                target="_blank"
                className="text-sm text-blue-500 mt-2 block"
              >
                {user.githubLink}
              </a>
            </div>
  
           {isOwner ? (
             <>
             <Button className='hover:cursor-pointer'>
              Edit Profile
            </Button>
             </>
             
           ):( <Button className='hover:cursor-pointer'>
              Connect
            </Button>)}
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
            {user.skills.map((skill: string) => (
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
            {user.projects.map((project: any) => (
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
  );
  }

export default page