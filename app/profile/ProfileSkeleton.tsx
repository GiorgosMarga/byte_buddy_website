import { Card, Skeleton } from '@nextui-org/react'
import React from 'react'

const ProfileSkeleton = () => {
    return (
        <Card className="min-w-[30%] w-[30%] space-y-5 p-4 " radius="lg">
            <Skeleton className="rounded-full w-[150px] h-[150px] self-center">
                <div className="h-24 w-24 rounded-full bg-default-300"></div>
            </Skeleton>
            <div className="space-y-3 mt-10 flex flex-col items-center">
                <Skeleton className="w-3/5 rounded-lg">
                    <div className="h-5 w-3/5 rounded-lg bg-default-200"></div>
                </Skeleton>
                <Skeleton className="w-4/5 rounded-lg">
                    <div className="h-5 w-4/5 rounded-lg bg-default-200"></div>
                </Skeleton>
                <Skeleton className="w-2/5 rounded-lg">
                    <div className="h-5 w-2/5 rounded-lg bg-default-300"></div>
                </Skeleton>
                <Skeleton className="w-3/5 rounded-lg">
                    <div className="h-5 w-2/5 rounded-lg bg-default-300"></div>
                </Skeleton>
            </div>
        </Card>
    )
}

export default ProfileSkeleton