'use client'

import { Card, CardContent, CardHeader, CardTitle } from './ui/card'
import Link from 'next/link'
import { Button } from './ui/button'
function UserCard({userProfile}:any) {
    
    return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {Array.isArray(userProfile) && userProfile.length > 0 ? (
        userProfile.map((user: any) => (
          <Card
            key={user._id}
            className="
              h-full
              border
              transition-all
              duration-300
              hover:-translate-y-1
              hover:shadow-xl
              hover:border-primary/40
            "
          >
            <CardHeader>
              <CardTitle className="text-xl">
                {user.fullname}
              </CardTitle>

              <p className="text-sm text-muted-foreground">
                {user.university}
              </p>
            </CardHeader>

            <CardContent className="flex h-full flex-col gap-4">
              <p className="text-sm text-muted-foreground line-clamp-3">
                {user.bio}
              </p>

              <div className="flex flex-wrap gap-2">
                {user.skills?.slice(0, 4).map((skill: string) => (
                  <span
                    key={skill}
                    className="
                      rounded-full
                      border
                      px-2
                      py-1
                      text-xs
                      bg-muted
                    "
                  >
                    {skill}
                  </span>
                ))}

                {user.skills?.length > 4 && (
                  <span
                    className="
                      rounded-full
                      border
                      px-2
                      py-1
                      text-xs
                      bg-muted
                    "
                  >
                    +{user.skills.length - 4} more
                  </span>
                )}
              </div>

              <div className="mt-auto flex gap-2">
                <Link
                  href={`/user-profile/${user._id}`}
                  className="flex-1"
                >
                  <Button className="w-full hover:cursor-pointer">
                    View Profile
                  </Button>
                </Link>

                <Button
                  variant="outline"
                  className="flex-1 hover:cursor-pointer"
                >
                  Connect
                </Button>
              </div>
            </CardContent>
          </Card>
        ))
      ) : (
        <div className="col-span-full flex flex-col items-center justify-center py-20 text-center">
          <div className="mb-4 text-5xl">
            🔍
          </div>

          <h2 className="text-2xl font-semibold">
            No Developers Found
          </h2>

          <p className="mt-2 max-w-md text-muted-foreground">
            No profiles match your current filters.
            Try selecting another skill, university,
            or clear the current filters.
          </p>
        </div>
      )}
    </div>
  )
}

export default UserCard