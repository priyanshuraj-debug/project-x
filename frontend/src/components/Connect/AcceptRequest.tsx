'use client'
import React from 'react'
import { Button } from '../ui/button'
import connectUser from '@/helpers/connect-userService'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from "sonner"
import { useAuth } from '@clerk/nextjs'

function AcceptRequest({ requestId }: {
    requestId: string;
}) {
    const { getToken } = useAuth()
    const queryClient = useQueryClient();

    const acceptRequestMutation = useMutation({
        mutationFn: async (requestId: string) => {
            const token = await getToken() as string;
            if (!token) {
                return
            }
            return connectUser.acceptRequest({
                token,
                requestId: requestId,
            });
        },

        onSuccess: () => {
            toast.success("Request Accepted successfully"),
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
            className='cursor-pointer'
            variant='outline'
                onClick={() => (

                    acceptRequestMutation.mutate(requestId))}
            >
                Accept 
            </Button>
        </div>
    )
}

export default AcceptRequest