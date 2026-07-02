'use client'
import React from 'react'
import { Button } from '../ui/button'
import connectUser from '@/helpers/connect-userService'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from "sonner"
import { useAuth } from '@clerk/nextjs'

function RejectRequest({ requestId }: {
    requestId: string;
}) {const { getToken } = useAuth()
    const queryClient = useQueryClient();

    const rejectRequestMutation = useMutation({
        mutationFn: async (requestId: string) => {
            const token = await getToken() as string;
            if (!token) {
                return
            }
            return connectUser.rejectRequest({
                token,
                requestId: requestId,
            });
        },

        onSuccess: () => {
            toast.success("Request Rejected successfully"),
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
                variant="destructive"
                className='cursor-pointer'
                onClick={() => (

                    rejectRequestMutation.mutate(requestId))}
            >
               Reject
            </Button>
        </div>
    )
}

export default RejectRequest