'use client'
import React from 'react'
import { Button } from '../ui/button'
import connectUser from '@/helpers/connect-userService'
import { useMutation,useQueryClient } from '@tanstack/react-query'
import { toast } from "sonner"
import { useAuth } from '@clerk/nextjs'

function SendRequest({recieverId}: {
  recieverId: string;
}) {
  const {getToken}=useAuth()
  const queryClient = useQueryClient();
  const sendRequestMutation = useMutation({
  mutationFn: async (recieverId: string) => {
    const token  = await getToken() as string;
    if(!token){
      return
    }
    return connectUser.sendRequest({
      token,
      recieverId:recieverId,
    });
  },

  onSuccess: () => {
    toast.success("Request sent successfully"),
    queryClient.invalidateQueries({
      queryKey: ["developer"],
    });
    queryClient.invalidateQueries({
                    queryKey: ["request"],
                });
  },

  onError: (error) => {
    console.log(error);
  },
});
  return (
    <div>
      <Button
      onClick={()=>(
       
        sendRequestMutation.mutate(recieverId))}
      >
        Connect
      </Button>
    </div>
  )
}

export default SendRequest
