import { Skeleton } from "../ui/skeleton";


import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
  } from "@/components/ui/card";


export default function PostCardSkeleton() {
    return (
        <Card>
          <CardHeader className="flex">
            <CardTitle><Skeleton className="w-full h-8"/></CardTitle>
            <CardDescription><Skeleton className="w-16 h-4"/></CardDescription>
          </CardHeader>
          <CardContent>
            <p>
                <Skeleton className="w-11/12 h-4 mb-2"/>
                <Skeleton className="w-full h-4 mb-2"/>
                <Skeleton className="w-1/2 h-4 mb-2"/>
            </p>
          </CardContent>
          <CardFooter>
            <Skeleton className="w-20 h-10"/>
          </CardFooter>
        </Card>
      );
};
