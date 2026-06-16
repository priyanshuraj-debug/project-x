
'use client'
import React, { useEffect } from 'react'
import { useState } from 'react'
import { CompleteProfileData } from '@/helpers/userSevice'
import SkillsInput from '@/components/SkillsInput'
import BasicInput from '@/components/BasicInput'
import { Separator } from '@/components/ui/separator'
import { useForm,FormProvider } from 'react-hook-form'
import { Button } from '@/components/ui/button'
import ProjectSection from '@/components/Projects/ProjectSection'
import { zodResolver } from '@hookform/resolvers/zod';
import {z} from 'zod'
import { userSchema } from '@/schema/userSchema'
import { useAuth } from '@clerk/nextjs'
import userService from '@/helpers/userSevice'
import { useRouter } from 'next/navigation'
import { Spinner } from '@/components/ui/spinner'


function page() {
  const form = useForm<z.infer<typeof userSchema>>({
    resolver: zodResolver(userSchema)
  })
  const [isLoading,setIsLoading]=useState(false)
   const router=useRouter()
  const { getToken } = useAuth()
  useEffect(() => {
   
   const sync = async () => {
     
     try {
      const token = await getToken()
      if (!token) { 
        return
      }

      const response = await userService.syncUser(token)
      console.log(response);
      
      if(response.data.data.user.isOnBoarded){
        router.replace('/dashboard')
      }

     } catch (error) {
      setIsLoading(false)
     }finally{
      setIsLoading(false)
     }
   
  };

  sync();

}, [getToken,router]);
  const onSubmit = async (data: z.infer<typeof userSchema>) => {
    try {
      setIsLoading(true)
      const token = await getToken()
      console.log(token);
      
      if (!token) {
        return
      }
      const payload: CompleteProfileData = {
        ...data,
        projects: data.projects ?? []
      }
      const response = await userService.completeProfile(token, payload)
      if (response.data.data.isOnBoarded) {
        router.push('/dashboard')
      }
    } catch (error) {
      console.error(error)
    }finally{
      setIsLoading(false)
    }
  }
   if (isLoading) {
    return (
      <div className="flex flex-col items-center gap-4">
       
        <Button variant="secondary" disabled size="sm">
          <Spinner data-icon="inline-start" />
          Processing
        </Button>
      </div>
    )
  }else{
  return (
    
  <div className="container max-w-5xl mx-auto py-10">
    <FormProvider {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-8"
      >
        <div>
          <h1 className="text-3xl font-bold">
            Complete Your Profile
          </h1>

          <p className="text-muted-foreground mt-2">
            Tell others about yourself and showcase your skills & projects.
          </p>
        </div>

        <BasicInput />

        <Separator />

        <SkillsInput />

        <Separator />

        <ProjectSection />

        <Button
          type="submit"
          className="w-full"
          disabled={isLoading}
        >
          Complete Profile
        </Button>
      </form>
    </FormProvider>
  </div>
)}
}

export default page