"use client"

import React, { useEffect,useState } from 'react'
import { useAuth } from '@clerk/nextjs'
import axios from 'axios';
import { Button } from "@/components/ui/button"
import { Spinner } from "@/components/ui/spinner"
import { useRouter } from 'next/navigation';
import userService from '@/helpers/userSevice';

function Page() {
 const { getToken } = useAuth();
 const [isLoading,setIsLoading]=useState(true)
 const router=useRouter()
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
        router.push('/dashboard')
      }else{
        router.push('/complete-profile')
      }

     } catch (error) {
      setIsLoading(false)
     }finally{
      setIsLoading(false)
     }
   
  };

  sync();

}, [getToken,router]);

  if (isLoading) {
    return (
      <div className="flex flex-col items-center gap-4">
       
        <Button variant="secondary" disabled size="sm">
          <Spinner data-icon="inline-start" />
          Processing
        </Button>
      </div>
    )
  }

  return null
}

export default Page