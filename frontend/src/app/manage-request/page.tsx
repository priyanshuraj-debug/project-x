'use client'

import React, { useEffect, useState } from 'react'
import { Button } from '@/components/ui/button'
import { Spinner } from '@/components/ui/spinner'
import { useAuth } from '@clerk/nextjs'
import connectUser from '@/helpers/connect-userService'
import AcceptRequest from '@/components/Connect/AcceptRequest'
import RejectRequest from '@/components/Connect/RejectRequest'
import { Card, CardContent } from "@/components/ui/card"
import { useQuery } from '@tanstack/react-query'
function RequestHandler() {
  const { getToken } = useAuth()

const {
    data: request,
    isLoading,
    error,
  } = useQuery({
    queryKey: ['request'],
    queryFn:async () => {
     const token=await getToken()
     return connectUser.getAllRequest(token as string)
    },
   
  })


  if (isLoading) {
    return (
      <div className="flex justify-center py-10">
        <Button variant="secondary" disabled>
          <Spinner data-icon="inline-start" />
          Loading...
        </Button>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      {request.data.length === 0 ? (
        <p className="text-center text-muted-foreground">
          No pending requests
        </p>
      ) : (
        request.data.map((request: any) => (
          <Card key={request._id}>
            <CardContent className="flex items-center justify-between py-4">
              <div>
                <h3 className="font-semibold">
                  {request.senderId.fullname}
                </h3>

                <p className="text-sm text-muted-foreground">
                  {request.senderId.university}
                </p>

                <p className="text-sm">
                  {request.senderId.bio}
                </p>
              </div>

              <div className="flex gap-2">
                <AcceptRequest requestId={request._id} />
                <RejectRequest requestId={request._id} />
              </div>
            </CardContent>
          </Card>
        ))
      )}
    </div>
  )
}

export default RequestHandler